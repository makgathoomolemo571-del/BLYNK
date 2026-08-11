const revenueSplit = require("./revenueSplit");

/**
 * Generic Revenue Calculator
 */

exports.calculateRevenue = (
  type,
  grossAmount
) => {

  if (!grossAmount || grossAmount <= 0) {

    throw new Error("Invalid amount");

  }

  if (
    typeof revenueSplit[type] !== "function"
  ) {

    throw new Error(
      `Unknown revenue type: ${type}`
    );

  }

  const split =
    revenueSplit[type](grossAmount);

  return {

    gross: Number(grossAmount.toFixed(2)),

    creatorRevenue:
      split.creator,

    platformRevenue:
      split.platform,

    netRevenue:
      split.creator,

    platformCommission:
      split.platform

  };

};

/**
 * Sum Revenue
 */

exports.sumRevenue = (
  records = []
) => {

  return records.reduce(

    (total, item) =>
      total +
      Number(item || 0),

    0

  );

};

/**
 * Estimated Payout
 */

exports.calculatePayout = (
  available,
  processingFee = 0
) => {

  return Number(

    (available - processingFee)
      .toFixed(2)

  );

};

/**
 * CPM Calculator
 */

exports.calculateCPM = (
  revenue,
  impressions
) => {

  if (!impressions)
    return 0;

  return Number(

    (
      (revenue / impressions) *
      1000
    ).toFixed(2)

  );

};

/**
 * RPM Calculator
 */

exports.calculateRPM = (
  revenue,
  views
) => {

  if (!views)
    return 0;

  return Number(

    (
      (revenue / views) *
      1000
    ).toFixed(2)

  );

};

/**
 * Engagement Rate
 */

exports.calculateEngagementRate = (

  likes,

  comments,

  shares,

  views

) => {

  if (!views)
    return 0;

  const total =
    likes +
    comments +
    shares;

  return Number(

    (
      (total / views) *
      100
    ).toFixed(2)

  );

};