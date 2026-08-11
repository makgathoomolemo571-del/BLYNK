const Notification =
require("../notification/notification.model");

const mapper =
require("../notification/notification.mapper");

class NotificationService {

  async create(data) {

    const notification =
      await Notification.create({

        recipient:data.recipient,

        actor:data.actor || null,

        type:data.type,

        title:data.title,

        message:data.message,

        entityType:data.entityType || null,

        entityId:data.entityId || null

      });


    // realtime notification

    if(global.io && data.recipient){

        global.io
        .to(
            data.recipient.toString()
        )
        .emit(
            "notification:new",
            notification
        );

    }


    return mapper.toDTO(
        notification
    );

}

  async broadcast({
  title,
  message,
  type = "announcement"
}) {

  const notification =
    await Notification.create({

      recipient: null,
      isBroadcast: true,

      title,
      message,
      type

    });

  return mapper.toDTO(
    notification
  );

}

  async getUserNotifications(
    userId
  ) {

    const notifications =
      await Notification.find({
        recipient: userId,
        isDeleted: false
      })
      .sort({
        createdAt: -1
      });

    return notifications.map(
      mapper.toDTO
    );
  }

  async markAsRead(id) {

  const notification =
    await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

  if (!notification) {
    throw new Error(
      "Notification not found"
    );
  }

  return mapper.toDTO(notification);

  }
  async stats() {

  const total =
    await Notification.countDocuments();

  const unread =
    await Notification.countDocuments({
      read: false
    });

  const byType =
    await Notification.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      }
    ]);

  return {
    total,
    unread,
    byType
  };

}
}


module.exports =
new NotificationService();