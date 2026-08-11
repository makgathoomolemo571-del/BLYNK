const Subscription =
require("../subscription/subscription.model");

const pricing = require("../../config/plans.config");

const mapper =
require("../subscription/subscription.mapper");

const eventBus =
require("../../shared/eventBus");

const plans = require("../../config/subscriptionRules");

class SubscriptionService {
getPlanPricing(plan) {
    return plans[plan] || null;
  }
 async create(userId, plan) {
    console.log("SUBSCRIPTION CREATE CALLED", userId.toString(), plan);

    let subscription = await Subscription.findOne({ user: userId });

    console.log("FOUND EXISTING:", !!subscription);

    if (!subscription) {
        console.log("CREATING NEW SUBSCRIPTION");

        subscription = await Subscription.create({
            user: userId,
            plan,
            price: pricing[plan]?.price || 0,
            startDate: new Date(),
            status: "active"
        });

        console.log("CREATED:", subscription._id);
    } else {
        console.log("UPDATING EXISTING");

        subscription.plan = plan;
        subscription.price = pricing[plan]?.price || 0;
        subscription.status = "active";

        await subscription.save();
    }

    return mapper.toDTO(subscription);
}

  async get(userId) {

    const sub =
      await Subscription.findOne({
        user: userId
      });

    if (!sub) return null;

    return mapper.toDTO(sub);
  }

  async upgrade(userId, plan) {

    const subscription =
      await Subscription.findOneAndUpdate(
        { user: userId },
        {
          plan,
          status: "active",
           price: pricing.price
        },
        { new: true }
      );
console.log("SUBSCRIPTION:", subscription);
    const dto =
      mapper.toDTO(subscription);

    eventBus.emit(
      "SUBSCRIPTION_UPGRADED",
      dto
    );

    return dto;
  }

  async cancel(userId) {

    const subscription =
      await Subscription.findOneAndUpdate(
        { user: userId },
        {
          status: "cancelled",
          plan: "FREE_MEMBER"
        },
        { new: true }
      );

    const dto =
      mapper.toDTO(subscription);

    eventBus.emit(
      "SUBSCRIPTION_CANCELLED",
      dto
    );

    return dto;
  }
  async stats() {

  const total =
    await Subscription.countDocuments();

  const active =
    await Subscription.countDocuments({
      status: "active"
    });

  const expired =
    await Subscription.countDocuments({
      status: "expired"
    });

  const plans =
    await Subscription.aggregate([
      {
        $group: {
          _id: "$plan",
          count: { $sum: 1 }
        }
      }
    ]);

  return {
    total,
    active,
    expired,
    plans
  };

}

}





module.exports =
new SubscriptionService();