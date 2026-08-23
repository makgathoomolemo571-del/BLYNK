const eventBus =
  require("../eventBus");

const Subscription =
  require("../../modules/subscription/subscription.model");


// ======================
// USER REGISTERED
// ======================

eventBus.on(
  "USER_REGISTERED",
  async ({ userId }) => {

    try {

      if (!userId) {
        throw new Error(
          "USER_REGISTERED: userId is required"
        );
      }

      const existing =
        await Subscription.findOne({
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

    } catch (err) {

      console.error(
        "USER_REGISTERED subscription listener failed:",
        err
      );

    }

  }
);


// ======================
// SUBSCRIPTION UPGRADED
// ======================

eventBus.on(
  "SUBSCRIPTION_UPGRADED",
  async (data) => {

    try {

      if (!data?.userId) {
        throw new Error(
          "SUBSCRIPTION_UPGRADED: userId is required"
        );
      }

      await Subscription.updateOne(
        {
          user: data.userId
        },
        {
          plan: data.newPlan,
          status: "active"
        }
      );

    } catch (err) {

      console.error(
        "SUBSCRIPTION_UPGRADED listener failed:",
        err
      );

    }

  }
);


// ======================
// SUBSCRIPTION CANCELLED
// ======================

eventBus.on(
  "SUBSCRIPTION_CANCELLED",
  async (data) => {

    try {

      if (!data?.userId) {
        throw new Error(
          "SUBSCRIPTION_CANCELLED: userId is required"
        );
      }

      await Subscription.updateOne(
        {
          user: data.userId
        },
        {
          plan: "FREE_MEMBER",
          status: "cancelled",
          autoRenew: false
        }
      );

    } catch (err) {

      console.error(
        "SUBSCRIPTION_CANCELLED listener failed:",
        err
      );

    }

  }
);


// ======================
// SUBSCRIPTION EXPIRED
// ======================

eventBus.on(
  "SUBSCRIPTION_EXPIRED",
  async (data) => {

    try {

      if (!data?.userId) {
        throw new Error(
          "SUBSCRIPTION_EXPIRED: userId is required"
        );
      }

      await Subscription.updateOne(
        {
          user: data.userId
        },
        {
          status: "expired"
        }
      );

    } catch (err) {

      console.error(
        "SUBSCRIPTION_EXPIRED listener failed:",
        err
      );

    }

  }
);