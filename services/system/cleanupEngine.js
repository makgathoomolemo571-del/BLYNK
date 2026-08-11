const Story = require("../story/story.model");
const Notification = require("../notification/notification.model");
const User = require("../user/user.model");

const cleanupEngine = {

  async expiredStories() {

    const now = new Date();

    const result = await Story.updateMany(
      {
        expiresAt: { $lt: now },
        isDeleted: false
      },
      {
        isDeleted: true,
        deletedAt: now
      }
    );

    return result;

  },

  async oldNotifications() {

    const date = new Date();
    date.setDate(date.getDate() - 30);

    await Notification.deleteMany({
      createdAt: { $lt: date }
    });

  },

  async inactiveUsers() {

    const date = new Date();
    date.setMonth(date.getMonth() - 6);

    return await User.updateMany(
      {
        lastLogin: { $lt: date }
      },
      {
        isInactive: true
      }
    );

  }

};

module.exports = cleanupEngine;