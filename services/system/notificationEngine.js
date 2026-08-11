const Notification = require("../notification/notification.model");

const notificationEngine = {

  async send(userId, title, message, type = "SYSTEM") {

    return await Notification.create({
      recipient: userId,
      title,
      message,
      type,
      read: false
    });

  },

  async broadcast(title, message, type = "ANNOUNCEMENT") {

    return await Notification.create({
      title,
      message,
      type,
      isBroadcast: true,
      recipient: null
    });

  },

  async markRead(id) {

    return await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

  }

};

module.exports = notificationEngine;