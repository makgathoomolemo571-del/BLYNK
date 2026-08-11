const Story = require("../modules/story/story.model");

async function runStoryExpiryJob() {

  try {

    const now = new Date();

    const result =
      await Story.updateMany(
        {
          expiresAt: { $lte: now },
          isDeleted: false
        },
        {
          isDeleted: true,
          deletedAt: now
        }
      );

    console.log("STORY_EXPIRY_JOB_DONE", {
      expired: result.modifiedCount
    });

  } catch (err) {
    console.error("STORY_EXPIRY_JOB_ERROR:", err);
  }
}

module.exports = runStoryExpiryJob;