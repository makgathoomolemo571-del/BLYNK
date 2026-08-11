const Affiliate = require("../affiliate/affiliate.model");
const CreatorWallet = require("../wallet/wallet.model");
const Revenue = require("../revenue/revenue.model");

const COMMISSION_RATE = 0.10;

exports.generateCode = async (userId) => {
  let code;

  do {
    code =
      "BLYNK-" +
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
  } while (await Affiliate.findOne({ code }));

  return await Affiliate.create({
    creator: userId,
    code,
    clicks: 0,
    conversions: 0,
    earnings: 0,
    active: true
  });
};

exports.getAffiliate = async (userId) => {
  return Affiliate.findOne({
    creator: userId
  });
};

exports.trackClick = async (code) => {

  const affiliate = await Affiliate.findOne({
    code,
    active: true
  });

  if (!affiliate)
    throw new Error("Affiliate code not found");

  affiliate.clicks += 1;

  await affiliate.save();

  return affiliate;
};

exports.recordConversion = async (
  code,
  orderAmount
) => {

  const affiliate = await Affiliate.findOne({
    code,
    active: true
  });

  if (!affiliate)
    throw new Error("Affiliate code not found");

  const commission =
    orderAmount * COMMISSION_RATE;

  affiliate.conversions += 1;

  affiliate.earnings += commission;

  await affiliate.save();

  await Revenue.create({
    creator: affiliate.creator,
    type: "AFFILIATE",
    amount: commission,
    source: code,
    status: "completed"
  });

  await CreatorWallet.findOneAndUpdate(
    {
      creator: affiliate.creator
    },
    {
      $inc: {
        availableBalance: commission,
        lifetimeEarnings: commission
      }
    },
    {
      upsert: true,
      new: true
    }
  );

  return {
    commission,
    affiliate
  };
};

exports.getLeaderboard = async () => {

  return Affiliate.find({
    active: true
  })
    .sort({
      earnings: -1
    })
    .limit(100);

};

exports.disableAffiliate = async (
  userId
) => {

  return Affiliate.findOneAndUpdate(
    {
      creator: userId
    },
    {
      active: false
    },
    {
      new: true
    }
  );

};

exports.enableAffiliate = async (
  userId
) => {

  return Affiliate.findOneAndUpdate(
    {
      creator: userId
    },
    {
      active: true
    },
    {
      new: true
    }
  );

};

exports.getAnalytics = async (
  userId
) => {

  const affiliate =
    await Affiliate.findOne({
      creator: userId
    });

  if (!affiliate)
    throw new Error("Affiliate not found");

  const conversionRate =
    affiliate.clicks === 0
      ? 0
      : (
          affiliate.conversions /
          affiliate.clicks
        ) * 100;

  return {

    code: affiliate.code,

    clicks: affiliate.clicks,

    conversions:
      affiliate.conversions,

    earnings:
      affiliate.earnings,

    conversionRate

  };

};