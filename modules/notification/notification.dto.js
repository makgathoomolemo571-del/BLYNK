class NotificationDTO {
  constructor(data) {

    this.id = data._id;

    this.type =
      data.type;

    this.title =
      data.title;

    this.message =
      data.message;

    this.entityType =
      data.entityType;

    this.entityId =
      data.entityId;

    this.read =
      data.read;

    this.createdAt =
      data.createdAt;
  }
}

module.exports =
NotificationDTO;