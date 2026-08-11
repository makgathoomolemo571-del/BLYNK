// src/modules/monetization/services/creatorFund.service.js

const CreatorRevenue = require("../creatorRevenue.model");
const CreatorWallet = require("../creatorWallet.model");
const CreatorMonetization = require("../monetization.model");

const DEFAULT_RULES = {
  minimumFollowers: 1000,
  minimumViews: 10000,
  minimumPosts: 20,
  minimumWatchHours: 100,
  payoutRate: 0.02
};

exports.checkEligibility = async (creator) => {

  const followers =
    creator.followersCount || 0;

  const views =
    creator.totalViews || 0;

  const posts =
    creator.postsCount || 0;

  const watchHours =
    creator.watchHours || 0;

  return {
    eligible:
      followers >= DEFAULT_RULES.minimumFollowers &&
      views >= DEFAULT_RULES.minimumViews &&
      posts >= DEFAULT_RULES.minimumPosts &&
      watchHours >= DEFAULT_RULES.minimumWatchHours,

    requirements: DEFAULT_RULES,

    current: {
      followers,
      views,
      posts,
      watchHours
    }
  };

};

exports.calculateFund = async (creator) => {

  const eligible =
    await exports.checkEligibility(
      creator
    );

  if (!eligible.eligible) {

    return {
      eligible: false,
      amount: 0
    };

  }

  const amount =
    creator.totalViews *
    DEFAULT_RULES.payoutRate;

  return {
    eligible: true,
    amount
  };

};

exports.creditCreator = async (
  creatorId,
  amount
) => {

  if (amount <= 0)
    return null;

  await CreatorWallet.updateOne(
    {
      creator: creatorId
    },
    {
      $inc: {
        pendingBalance: amount,
        lifetimeEarnings: amount,
        creatorFundRevenue: amount
      }
    },
    {
      upsert: true
    }
  );

  await CreatorRevenue.create({

    creator: creatorId,

    source: "creator_fund",

    amount,

    status: "pending"

  });

  return {
    success: true,
    amount
  };

};

exports.processCreator = async (
  creator
) => {

  const fund =
    await exports.calculateFund(
      creator
    );

  if (!fund.eligible)
    return fund;

  await exports.creditCreator(
    creator._id,
    fund.amount
  );

  return fund;

};

exports.processAll = async () => {

  const creators =
    await CreatorMonetization.find({
      monetizationEnabled: true
    }).populate("creator");

  const results = [];

  for (const item of creators) {

    const result =
      await exports.processCreator({
        ...item.creator.toObject(),
        ...item.toObject()
      });

    results.push(result);

  }

  return results;

};