const Referral = require("./referral.model");
const User = require("../user/user.model");

const events = require("./referral.events");
const eventBus = require("../../shared/eventBus");
const mapper = require("./referral.mapper");

// =====================================================
// GENERATE REFERRAL CODE
// =====================================================

function generateReferralCode() {
  return (
    "BLYNK-" +
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()
  );
}

// =====================================================
// GENERATE UNIQUE CODE
// =====================================================

async function generateUniqueReferralCode() {
  let code;
  let exists = true;

  while (exists) {
    code = generateReferralCode();

    exists = await User.exists({
      referralCode: code
    });
  }

  return code;
}

// =====================================================
// REFERRAL SERVICE
// =====================================================

module.exports = {

  // ===================================================
  // CREATE USER'S OWN REFERRAL NUMBER
  // ===================================================

  async createUserReferralCode(userId) {

    const user =
      await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // User already has a referral number
    if (user.referralCode) {
      return user.referralCode;
    }

    const code =
      await generateUniqueReferralCode();

    user.referralCode = code;

    await user.save();

    console.log(
      "✅ REFERRAL NUMBER CREATED:",
      code,
      "FOR:",
      user.username
    );

    return code;
  },

  // ===================================================
  // COMPLETE REFERRAL
  // ===================================================

  async complete(code, referredUserId) {

    if (!code) {
      throw new Error(
        "Referral number is required"
      );
    }

    const normalizedCode =
      code.trim().toUpperCase();

    const referrer =
      await User.findOne({
        referralCode: normalizedCode
      });

    if (!referrer) {
      throw new Error(
        "Invalid referral number"
      );
    }

    // Prevent self referral
    if (
      referrer._id.toString() ===
      referredUserId.toString()
    ) {
      throw new Error(
        "You cannot use your own referral number"
      );
    }

    // Check if this user was already referred
    const existing =
      await Referral.findOne({
        referredUser: referredUserId
      });

    if (existing) {
      throw new Error(
        "User has already been referred"
      );
    }

    const referral =
      await Referral.create({

        referrer:
          referrer._id,

        referredUser:
          referredUserId,

        code:
          normalizedCode,

        status:
          "completed",

        referrerReward: {
          tokens: 1000,
          points: 10,
          rewardGiven: false
        },

        referredUserReward: {
          tokens: 500,
          points: 5,
          rewardGiven: false
        },

        rewardAmount: 1500,

        rewardGiven: false
      });

    // Link new user to referrer
    await User.findByIdAndUpdate(
      referredUserId,
      {
        referredBy: referrer._id
      }
    );

    eventBus.emit(
      events.REFERRAL_COMPLETED,
      referral
    );

    console.log(
      "✅ REFERRAL COMPLETED:",
      normalizedCode
    );

    return mapper.toDTO(referral);
  },

  // ===================================================
  // REWARD REFERRAL AFTER EMAIL VERIFICATION
  // ===================================================

  async rewardReferral(referredUserId) {

    const referral =
      await Referral.findOne({
        referredUser: referredUserId,
        status: "completed"
      });

    // No referral = perfectly normal
    if (!referral) {

      console.log(
        "ℹ️ NO REFERRAL FOUND FOR USER:",
        referredUserId
      );

      return null;
    }

    // Already rewarded
    if (referral.rewardGiven) {

      console.log(
        "ℹ️ REFERRAL ALREADY REWARDED:",
        referral._id
      );

      return mapper.toDTO(referral);
    }

    // ================================================
    // HERE IS YOUR REWARD
    // ================================================

    referral.referrerReward = {

      tokens: 1000,

      points: 10,

      rewardGiven: true,

      rewardedAt: new Date()

    };

    referral.referredUserReward = {

      tokens: 500,

      points: 5,

      rewardGiven: true,

      rewardedAt: new Date()

    };

    referral.rewardGiven = true;

    referral.rewardedAt = new Date();

    referral.rewardAmount = 1500;

    await referral.save();

    // Mark new user's referral reward as given
    await User.findByIdAndUpdate(
      referredUserId,
      {
        referralRewarded: true
      }
    );

    eventBus.emit(
      events.REFERRAL_REWARDED,
      referral
    );

    console.log(
      "🎁 REFERRAL REWARDED"
    );

    console.log(
      "OLD MEMBER: 1000 TOKENS / 10 POINTS"
    );

    console.log(
      "NEW MEMBER: 500 TOKENS / 5 POINTS"
    );

    return mapper.toDTO(referral);
  },

  // ===================================================
  // USER REFERRALS
  // ===================================================

  async getUserReferrals(userId) {

    const referrals =
      await Referral.find({
        referrer: userId
      })
      .populate(
        "referredUser",
        "username displayName email"
      )
      .sort({
        createdAt: -1
      });

    return referrals.map(
      mapper.toDTO
    );
  },

  // ===================================================
  // STATS
  // ===================================================

  async stats() {

    const total =
      await Referral.countDocuments();

    const completed =
      await Referral.countDocuments({
        status: "completed"
      });

    const rewarded =
      await Referral.countDocuments({
        rewardGiven: true
      });

    const pending =
      await Referral.countDocuments({
        status: "pending"
      });

    return {

      total,

      completed,

      pending,

      rewarded

    };
  }

};