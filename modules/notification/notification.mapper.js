const NotificationDTO =
require("../notification/notification.dto");

const toDTO = (
  notification
) =>
new NotificationDTO(
  notification
);

module.exports = {
  toDTO
};