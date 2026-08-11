const Story = require("./story.model");
const mapper = require("./story.mapper");
const eventBus = require("../../shared/eventBus");
const EVENTS = require("./story.events");
const Post = require("../post/post.model");
const mediaService = require("../media/media.service");

exports.create = async (userId, payload, file) => {

    let media = [];

    if (file) {

        const uploaded = await mediaService.upload(
            userId,
            file,
            "story",
            payload.type
        );

        media.push({
            url: uploaded.url,
            type: payload.type,
            thumbnail: uploaded.thumbnail || uploaded.url
        });

    }


    const story = await Story.create({

        creator: userId,

        caption: payload.caption,

        type: payload.type,

        media,

        visibility: payload.visibility || "public",

        expiresAt: new Date(Date.now() + 86400000)

    });
console.log("STORY SAVED:");
console.log(JSON.stringify(story, null, 2));

    return mapper.toDTO(story);
};

exports.feed = async () => {

  const stories = await Story.find({
    isDeleted: false
  })
  .populate("creator", "username profilePicture")
  
  .sort({
    createdAt: -1
  });

  

  return mapper.toDTOList(stories);
};

exports.reply = async (storyId, userId, text) => {
    const story = await Story.findById(storyId);

    story.replies.push({
        user: userId,
        text
    });

    await story.save();

    await story.populate([
        {
            path: "creator",
            select: "username profilePicture"
        },
        {
            path: "replies.user",
            select: "username displayName profilePicture"
        },
        {
            path: "reactions.user",
            select: "username displayName profilePicture"
        }
    ]);

    return story;
};



exports.react = async (storyId, userId, type = "like") => {

    const story = await Story.findById(storyId);

    if (!story) {
        throw new Error("Story not found");
    }

    const already = story.reactions.find(
        r => r.user.toString() === userId.toString()
    );

    if (already) {

        already.type = type;

    } else {

        story.reactions.push({
            user: userId,
            type
        });

    }

    await story.save();

    return story;
};

exports.comment = async(storyId,userId,text)=>{

    await Story.updateOne(
        {
            _id:storyId
        },
        {
            $push:{
                comments:{
                    user:userId,
                    text
                }
            }
        }
    );

    return true;
};

exports.view = async (storyId, userId) => {

  await Story.updateOne(
    {
      _id: storyId,
      viewers: { $ne: userId }
    },
    {
      $inc: { views: 1 },
      $push: { viewers: userId }
    }
  );

  eventBus.emit(EVENTS.STORY_VIEWED, {
    storyId,
    userId
  });

  return true;
};

exports.remove = async (storyId, userId) => {

  const story = await Story.findById(storyId);

  if (!story) throw new Error("Story not found");

  story.isDeleted = true;
  story.deletedAt = new Date();
  story.deletedBy = userId;

  await story.save();

  eventBus.emit(EVENTS.STORY_DELETED, {
    storyId,
    userId
  });

  return true;
};

/**
 * AUTO EXPIRY (CRON JOB)
 */
exports.expireStories = async () => {

  const now = new Date();

  const expired = await Story.find({
    expiresAt: { $lte: now },
    isDeleted: false
  });

  for (const story of expired) {
    story.isDeleted = true;
    story.deletedAt = now;
    await story.save();

    eventBus.emit(EVENTS.STORY_EXPIRED, {
      storyId: story._id
    });
  }

  return expired.length;
};