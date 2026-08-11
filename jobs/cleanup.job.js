const Story = require("../modules/story/story.model");
const Notification = require("../modules/notification/notification.model");
const Session = require("../modules/auth/session.model");

async function runCleanupJob() {

  try {

    const now = new Date();

    // ======================
    // EXPIRE STORIES
    // ======================
    const expiredStories =
      await Story.updateMany(
        {
          expiresAt: { $lt: now },
          isDeleted: false
        },
        {
          isDeleted: true,
          deletedAt: now
        }
      );

    // ======================
    // DELETE OLD NOTIFICATIONS
    // ======================
    await Notification.deleteMany({
      createdAt: {
        $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    });

    // ======================
    // CLEAN OLD SESSIONS
    // ======================
    await Session.deleteMany({
      expiresAt: { $lt: now }
    });

    console.log("CLEANUP_JOB_DONE", {
      expiredStories: expiredStories.modifiedCount
    });

  } catch (err) {
    console.error("CLEANUP_JOB_ERROR:", err);
  }
}

module.exports = runCleanupJob;