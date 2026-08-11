const eventBus =
require("../eventBus");

const Subscription =
require("../../modules/subscription/subscription.model");

eventBus.on("USER_REGISTERED", async ({ userId }) => {

    const existing = await Subscription.findOne({
        user: userId
    });

    if (!existing) {
        await Subscription.create({
            user: userId,
            plan: "FREE_MEMBER",
            status: "active",
            autoRenew: false
        });
    }

});

eventBus.on(
  "SUBSCRIPTION_UPGRADED",
  async (data) => {

    await Subscription.updateOne(
      { user: data.userId },
      {
        plan: data.newPlan,
        status: "active"
      }
    );

  }
);

eventBus.on(
  "SUBSCRIPTION_CANCELLED",
  async (data) => {

    await Subscription.updateOne(
      { user: data.userId },
      {
        status: "cancelled",
        subscriptionPlan: "FREE_MEMBER",
        autoRenew: false
      }
    );

  }
);

eventBus.on(
  "SUBSCRIPTION_EXPIRED",
  async (data) => {

    await Subscription.updateOne(
      { user: data.userId },
      {
        status: "expired"
      }
    );

  }
);