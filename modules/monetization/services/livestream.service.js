const CreatorWallet = require("../creatorWallet/creatorWallet.model");
const CreatorRevenue = require("../creatorRevenue/creatorRevenue.model");
const CreatorAnalytics = require("../creatorAnalytics/creatorAnalytics.model");

const REVENUE_TYPES = {
  LIVE_GIFT: "live_gift",
  LIVE_TIP: "live_tip",
  LIVE_SUBSCRIPTION: "live_subscription",
  LIVE_AD: "live_ad",
  LIVE_SPONSOR: "live_sponsor"
};

const PLATFORM_FEES = {
  LIVE_GIFT: 0.30,
  LIVE_TIP: 0.05,
  LIVE_SUBSCRIPTION: 0.10,
  LIVE_AD: 0.45,
  LIVE_SPONSOR: 0.15
};

async function ensureWallet(userId) {

  let wallet = await CreatorWallet.findOne({
    creator: userId
  });

  if (!wallet) {

    wallet = await CreatorWallet.create({
      creator: userId
    });

  }

  return wallet;

}

async function creditRevenue({
  creatorId,
  amount,
  revenueType,
  referenceId,
  description = ""
}) {

  const wallet = await ensureWallet(creatorId);

  const feeRate =
    PLATFORM_FEES[
      revenueType.toUpperCase()
    ] || 0;

  const platformFee =
    amount * feeRate;

  const creatorAmount =
    amount - platformFee;

  await CreatorRevenue.create({

    creator: creatorId,

    revenueType,

    grossAmount: amount,

    platformFee,

    netAmount: creatorAmount,

    reference: referenceId,

    description

  });

  wallet.availableBalance += creatorAmount;

  wallet.lifetimeEarnings += creatorAmount;

  await wallet.save();

  return {
    creatorAmount,
    platformFee
  };

}

async function recordViewer(creatorId) {

  await CreatorAnalytics.updateOne(

    {
      creator: creatorId
    },

    {
      $inc: {
        livestreamViews: 1
      }
    },

    {
      upsert: true
    }

  );

}

async function recordWatchMinutes(
  creatorId,
  minutes
) {

  await CreatorAnalytics.updateOne(

    {
      creator: creatorId
    },

    {
      $inc: {
        livestreamMinutes: minutes
      }
    },

    {
      upsert: true
    }

  );

}

async function receiveGift({
  creatorId,
  giftValue,
  giftId
}) {

  return creditRevenue({

    creatorId,

    amount: giftValue,

    revenueType:
      REVENUE_TYPES.LIVE_GIFT,

    referenceId: giftId,

    description:
      "Live Gift"

  });

}

async function receiveTip({
  creatorId,
  amount,
  tipId
}) {

  return creditRevenue({

    creatorId,

    amount,

    revenueType:
      REVENUE_TYPES.LIVE_TIP,

    referenceId: tipId,

    description:
      "Live Tip"

  });

}

async function receiveSubscription({
  creatorId,
  amount,
  subscriptionId
}) {

  return creditRevenue({

    creatorId,

    amount,

    revenueType:
      REVENUE_TYPES.LIVE_SUBSCRIPTION,

    referenceId:
      subscriptionId,

    description:
      "Live Subscription"

  });

}

async function receiveAdRevenue({
  creatorId,
  amount,
  campaignId
}) {

  return creditRevenue({

    creatorId,

    amount,

    revenueType:
      REVENUE_TYPES.LIVE_AD,

    referenceId:
      campaignId,

    description:
      "Live Advertisement"

  });

}

async function receiveSponsorRevenue({
  creatorId,
  amount,
  sponsorId
}) {

  return creditRevenue({

    creatorId,

    amount,

    revenueType:
      REVENUE_TYPES.LIVE_SPONSOR,

    referenceId:
      sponsorId,

    description:
      "Sponsored Live"

  });

}

module.exports = {

  REVENUE_TYPES,

  creditRevenue,

  receiveGift,

  receiveTip,

  receiveSubscription,

  receiveAdRevenue,

  receiveSponsorRevenue,

  recordViewer,

  recordWatchMinutes

};