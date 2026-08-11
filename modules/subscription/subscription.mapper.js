const SubscriptionDTO =
require("../subscription/subscription.dto");

exports.toDTO = (subscription) => {
  console.log("DTO INPUT:", subscription);
  return new SubscriptionDTO(subscription);
};