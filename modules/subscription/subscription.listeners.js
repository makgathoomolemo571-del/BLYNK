const eventBus = require("../../shared/eventBus");
const EVENTS = require("../subscription/subscription.events");

const NotificationService =
require("../../notification/notification.service");

eventBus.on(EVENTS.SUBSCRIPTION_CREATED, async (data) => {

  await NotificationService.create({
    recipient: data.userId,
    type: "SUBSCRIPTION",
    title: "Subscription Activated",
    message: `Plan ${data.plan} is now active`
  });

});