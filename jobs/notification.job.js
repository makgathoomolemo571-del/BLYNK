const Notification =
require("../modules/notification/notification.model");

const notificationEngine =
require("../services/system/notificationEngine");

async function runNotificationJob() {

  try {

    const queue =
      await Notification.find({
        processed: false
      }).limit(100);

    for (const item of queue) {

      await notificationEngine.dispatch(item);

      item.processed = true;
      await item.save();

    }

    console.log("NOTIFICATION_JOB_DONE");

  } catch (err) {

    console.error("NOTIFICATION_JOB_ERROR:", err);

  }

}

module.exports = runNotificationJob;