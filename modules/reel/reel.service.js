const Reel = require("./reel.model");
const mapper = require("./reel.mapper");
const eventBus = require("../../shared/eventBus");
const EVENTS = require("./reel.events");
const Post = require("../post/post.model");
const mediaService = require("../media/media.service");
const {
sendNotification
}
=
require("../notification/notification.helper");

exports.create = async (userId, payload, file) => {

    let media = [];

    if (file) {

        const uploaded = await mediaService.upload(
            userId,
            file,
            "reel",
            "video"
        );

        media.push({
            url: uploaded.url,
            type: "video",
            thumbnail: uploaded.thumbnail || uploaded.url
        });
    }

    const reel = await Reel.create({
        creator: userId,
        caption: payload.caption,
        media,
        visibility: payload.visibility || "public"
    });

    await sendNotification({
        recipient: reel.creator,
        actor: reel.creator,
        type: "REEL_CREATED",
        title: "New Reel Published",
        message: "Your reel has been uploaded",
        entityType: "REEL",
        entityId: reel._id
    });

    eventBus.emit(EVENTS.REEL_CREATED, {
        reelId: reel._id,
        creatorId: userId
    });

    return mapper.toDTO(reel);
};

exports.feed = async () => {

  const reels = await Reel.find({
    isDeleted: false,
    status: "active"
  })
  .populate("creator", "username profilePicture")
  
  .sort({
    createdAt: -1
  });

  return mapper.toDTOList(reels);
};

exports.getById = async (id) => {

  const reel =
  await Reel.findOne({
    _id: id,
    isDeleted: false
  })
  .populate(
    "creator",
    "username profilePicture"
  )

  .populate(
    "comments.user",
    "username profilePicture"
);
  if (!reel)
    throw new Error("Reel not found");

  return mapper.toDTO(reel);
};

exports.update = async (
  reelId,
  userId,
  payload
) => {

  const reel =
  await Reel.findOne({
    _id: reelId,
    creator: userId,
    isDeleted: false
  });

  if (!reel)
    throw new Error("Reel not found");

  reel.caption =
    payload.caption ??
    reel.caption;

  reel.visibility =
    payload.visibility ??
    reel.visibility;

  await reel.save();

  eventBus.emit(
    EVENTS.REEL_UPDATED,
    {
      reelId
    }
  );

  return mapper.toDTO(reel);
};

exports.remove = async (
  reelId,
  userId
) => {

  const reel =
  await Reel.findOne({
    _id: reelId,
    creator: userId,
    isDeleted: false
  });

  if (!reel)
    throw new Error("Reel not found");

  reel.isDeleted = true;
  reel.deletedAt = new Date();
  reel.deletedBy = userId;

  await reel.save();

  eventBus.emit(
    EVENTS.REEL_DELETED,
    {
      reelId
    }
  );

  return true;
};

exports.like = async (
  reelId,
  userId
) => {

  await Reel.updateOne(
    {
      _id: reelId,
      "reactions.user": {
        $ne: userId
      }
    },
    {
      $push: {
        reactions: {
          user: userId,
          type: "like"
        }
      }
    }
  );

  const updated = await Reel.findById(reelId);

console.log(updated.reactions);

  eventBus.emit(
    EVENTS.REEL_LIKED,
    {
      reelId,
      userId
    }
  );

  return true;
};

exports.unlike = async (
  reelId,
  userId
) => {

  await Reel.updateOne(
    {
      _id: reelId
    },
    {
      $pull: {
        reactions: {
          user: userId
        }
      }
    }
  );

  eventBus.emit(
    EVENTS.REEL_UNLIKED,
    {
      reelId,
      userId
    }
  );

  return true;
};

exports.comment = async (
  reelId,
  userId,
  text
) => {

  await Reel.updateOne(
    {
      _id: reelId
    },
    {
      $push: {
        comments: {
          user: userId,
          text
        }
      }
    }
  );

  eventBus.emit(
    EVENTS.REEL_COMMENTED,
    {
      reelId,
      userId
    }
  );

  return true;
};

exports.share = async (reelId, userId) => {

    await Reel.findByIdAndUpdate(
        reelId,
        { $inc: { shares: 1 } }
    );

    await ReelShare.create({
        reel: reelId,
        user: userId
    });


  eventBus.emit(
    EVENTS.REEL_SHARED,
    {
      reelId
    }
  );

  return true;
};

exports.save = async (
  reelId,
  userId
) => {

  await Reel.updateOne(
    {
      _id: reelId
    },
    {
      $addToSet: {
        saves: userId
      }
    }
  );

  eventBus.emit(
    EVENTS.REEL_SAVED,
    {
      reelId,
      userId
    }
  );

  return true;
};

exports.unsave = async (
  reelId,
  userId
) => {

  await Reel.updateOne(
    {
      _id: reelId
    },
    {
      $pull: {
        saves: userId
      }
    }
  );

  eventBus.emit(
    EVENTS.REEL_UNSAVED,
    {
      reelId,
      userId
    }
  );

  return true;
};

exports.view = async (
  reelId
) => {

  await Reel.updateOne(
    {
      _id: reelId
    },
    {
      $inc: {
        views: 1
      }
    }
  );

  eventBus.emit(
    EVENTS.REEL_VIEWED,
    {
      reelId
    }
  );

  return true;
};