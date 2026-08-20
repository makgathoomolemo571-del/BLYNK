const Referral = require("./referral.model");
const User = require("../user/user.model");

const events = require("./referral.events");
const eventBus = require("../../shared/eventBus");
const mapper = require("./referral.mapper");

function generateReferralCode() {
  return (
    "BLK" +
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );
}

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

module.exports = {

  // ==========================================
  // CREATE USER'S OWN REFERRAL NUMBER
  // ==========================================

  async createUserReferralCode(userId) {

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Already has one
    if (user.referralCode) {
      return user.referralCode;
    }

    const code =
      await generateUniqueReferralCode();

    user.referralCode = code;

    await user.save();

    console.log(
      "✅ REFERRAL CODE CREATED:",
      code
    );

    return code;
  },


  // ==========================================
  // COMPLETE REFERRAL
  // ==========================================

  async complete(code, referredUserId) {

    if (!code) {
      throw new Error(
        "Referral code is required"
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

    // Prevent duplicate referral
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

        referrer: referrer._id,

        referredUser:
          referredUserId,

        code:
          normalizedCode,

        status:
          "completed"

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


  // ==========================================
  // REWARD REFERRAL
  // ==========================================

  async reward(id) {

    const referral =
      await Referral.findById(id);

    if (!referral) {
      throw new Error(
        "Referral not found"
      );
    }

    if (referral.rewardGiven) {
      return mapper.toDTO(referral);
    }

    // OLD MEMBER
    referral.referrerReward = {
      tokens: 1000,
      points: 10,
      rewardGiven: true,
      rewardedAt: new Date()
    };

    // NEW MEMBER
    referral.referredUserReward = {
      tokens: 500,
      points: 5,
      rewardGiven: true,
      rewardedAt: new Date()
    };

    referral.rewardGiven = true;

    referral.rewardAmount = 1500;

    await referral.save();

    eventBus.emit(
      events.REFERRAL_REWARDED,
      referral
    );

    console.log(
      "🎁 REFERRAL REWARDED:",
      referral._id
    );

    return mapper.toDTO(referral);
  },


  // ==========================================
  // USER REFERRALS
  // ==========================================

  async getUserReferrals(userId) {

    const referrals =
      await Referral.find({
        referrer: userId
      })
      .populate(
        "referredUser",
        "username displayName"
      )
      .sort({
        createdAt: -1
      });

    return referrals.map(
      mapper.toDTO
    );
  },


  // ==========================================
  // STATS
  // ==========================================

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

    return {
      total,
      completed,
      rewarded
    };
  }

};