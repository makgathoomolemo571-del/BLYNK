// src/modules/monetization/services/subscriptions.service.js

const CreatorSubscription = require("../models/CreatorSubscription");
const CreatorWallet = require("../models/CreatorWallet");
const CreatorRevenue = require("../models/CreatorRevenue");

class SubscriptionsService {

  async subscribe(subscriberId, creatorId, plan) {

    if (subscriberId.toString() === creatorId.toString()) {
      throw new Error("You cannot subscribe to yourself.");
    }

    const existing =
      await CreatorSubscription.findOne({
        subscriber: subscriberId,
        creator: creatorId,
        status: "active"
      });

    if (existing) {
      throw new Error("Already subscribed.");
    }

    const subscription =
      await CreatorSubscription.create({

        subscriber: subscriberId,

        creator: creatorId,

        planId: plan.id,

        amount: plan.price,

        billingCycle: plan.billingCycle,

        startedAt: new Date(),

        renewAt: plan.renewAt,

        status: "active"

      });

    return subscription;

  }

  async unsubscribe(subscriberId, creatorId) {

    const subscription =
      await CreatorSubscription.findOne({

        subscriber: subscriberId,

        creator: creatorId,

        status: "active"

      });

    if (!subscription)
      throw new Error("Subscription not found.");

    subscription.status = "cancelled";

    subscription.cancelledAt = new Date();

    await subscription.save();

    return subscription;

  }

  async renew(subscriptionId) {

    const subscription =
      await CreatorSubscription.findById(subscriptionId);

    if (!subscription)
      throw new Error("Subscription not found.");

    subscription.renewAt =
      this.calculateNextRenewDate(
        subscription.billingCycle
      );

    subscription.status = "active";

    await subscription.save();

    return subscription;

  }

  async creatorSubscribers(creatorId) {

    return CreatorSubscription.find({

      creator: creatorId,

      status: "active"

    })

      .populate(
        "subscriber",
        "username profilePicture verified"
      )

      .sort({
        createdAt: -1
      });

  }

  async mySubscriptions(userId) {

    return CreatorSubscription.find({

      subscriber: userId,

      status: "active"

    })

      .populate(
        "creator",
        "username profilePicture verified"
      )

      .sort({
        createdAt: -1
      });

  }

  async distributeRevenue(subscription) {

    const creatorShare =
      Number(subscription.amount) * 0.90;

    const platformShare =
      Number(subscription.amount) * 0.10;

    await CreatorWallet.findOneAndUpdate(

      {
        creator: subscription.creator
      },

      {
        $inc: {

          balance: creatorShare,

          lifetimeEarnings: creatorShare

        }

      },

      {
        upsert: true,
        new: true
      }

    );

    await CreatorRevenue.create({

      creator: subscription.creator,

      source: "subscription",

      amount: creatorShare,

      grossAmount: subscription.amount,

      platformFee: platformShare,

      subscriber: subscription.subscriber,

      reference: subscription._id

    });

    return {

      creatorShare,

      platformShare

    };

  }

  calculateNextRenewDate(cycle) {

    const date = new Date();

    switch (cycle) {

      case "weekly":
        date.setDate(date.getDate() + 7);
        break;

      case "monthly":
        date.setMonth(date.getMonth() + 1);
        break;

      case "quarterly":
        date.setMonth(date.getMonth() + 3);
        break;

      case "yearly":
        date.setFullYear(date.getFullYear() + 1);
        break;

      default:
        date.setMonth(date.getMonth() + 1);

    }

    return date;

  }

}

module.exports = new SubscriptionsService();