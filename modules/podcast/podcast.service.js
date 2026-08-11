const Podcast = require("./podcast.model");
const mapper = require("./podcast.mapper");
const eventBus = require("../../shared/eventBus");
const EVENTS = require("./podcast.events");

exports.create = async (userId, data) => {

  const podcast = await Podcast.create({
    creator: userId,
    name: data.name,
    description: data.description,
    category: data.category,
    coverImage: data.coverImage,
    visibility: data.visibility
  });
console.log("Podcast model:", Podcast.modelName);
console.log(Object.keys(podcast.toObject()));
  eventBus.emit(
    EVENTS.PODCAST_CREATED,
    {
      podcastId: podcast._id,
      creatorId: userId
    }
  );

  return mapper.toDTO(podcast);
};

exports.getAll = async () => {

    const podcasts =
      await Podcast.find()
      .populate("creator", "username profilePicture")
      .sort({ createdAt: -1 });

    return podcasts.map(mapper.toDTO);

};

exports.getByName = async (name) => {

  const podcast = await Podcast.findOne({
    name
  });

  if (!podcast) {
    throw new Error("Podcast not found");
  }

  return mapper.toDTO(podcast);
};

exports.getById = async (id) => {
  const podcast = await Podcast.findOne({
    _id: id,
    isDeleted: false
  });

  if (!podcast) {
    throw new Error("Podcast not found");
  }

  return mapper.toDTO(podcast);
};
exports.getMine = async (userId) => {

  const podcasts =
    await Podcast.find({
      creator: userId,
      isDeleted: false
    });

  return podcasts.map(mapper.toDTO);
};



exports.update = async (
  podcastId,
  userId,
  data
) => {

  const podcast =
    await Podcast.findOne({
      _id: podcastId,
      creator: userId,
      isDeleted: false
    });

  if (!podcast)
    throw new Error("Podcast not found");

  Object.assign(
    podcast,
    data
  );

  await podcast.save();

  eventBus.emit(
    EVENTS.PODCAST_UPDATED,
    {
      podcastId
    }
  );

  return mapper.toDTO(podcast);
};

exports.delete = async (
  podcastId,
  userId
) => {

  const podcast =
    await Podcast.findOne({
      _id: podcastId,
      creator: userId
    });

  if (!podcast)
    throw new Error("Podcast not found");

  podcast.isDeleted = true;
  podcast.deletedAt = new Date();

  await podcast.save();

  return {
    success: true
  };
};

exports.subscribe = async (
  podcastId,
  userId
) => {

  await Podcast.updateOne(
    {
      _id: podcastId
    },
    {
      $addToSet: {
        subscribers: userId
      }
    }
  );

  eventBus.emit(
    EVENTS.PODCAST_SUBSCRIBED,
    {
      podcastId,
      userId
    }
  );

  return {
    success: true
  };
};

exports.unsubscribe = async (
  podcastId,
  userId
) => {

  await Podcast.updateOne(
    {
      _id: podcastId
    },
    {
      $pull: {
        subscribers: userId
      }
    }
  );

  eventBus.emit(
    EVENTS.PODCAST_UNSUBSCRIBED,
    {
      podcastId,
      userId
    }
  );

  return {
    success: true
  };
};

exports.stats = async () => {

  const totalPodcasts =
    await Podcast.countDocuments({ isDeleted: false });

  const totalEpisodes =
    await Podcast.aggregate([
      { $match: { isDeleted: false } },
      { $project: { episodes: 1 } }
    ]);

  const episodes =
    totalEpisodes.reduce(
      (sum, p) => sum + (p.episodes?.length || 0),
      0
    );

  return {
    totalPodcasts,
    totalEpisodes: episodes
  };

};