const crypto = require("crypto");

const Referral = require("./referral.model");
const User = require("../user/user.model");

const events =
  require("./referral.events");

const eventBus =
  require("../../shared/eventBus");

const mapper =
  require("./referral.mapper");


module.exports = {

  /*
  ==========================================
  GENERATE UNIQUE REFERRAL CODE
  ==========================================
  */

  async generateCode(username) {

    const cleanUsername =
      String(username || "USER")
        .replace(/[^a-zA-Z0-9]/g, "")
        .substring(0, 12)
        .toUpperCase();

    let code;
    let exists = true;

    while (exists) {

      const random =
        crypto
          .randomBytes(3)
          .toString("hex")
          .toUpperCase();

      code =
        `BLYNK-${cleanUsername}-${random}`;

      exists =
        await User.exists({
          referralCode: code
        });
    }

    return code;
  },


  /*
  ==========================================
  CREATE USER REFERRAL CODE
  ==========================================
  */

  async createUserReferralCode(userId) {

    const user =
      await User.findById(userId);

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    if (user.referralCode) {
      return user.referralCode;
    }

    const code =
      await this.generateCode(
        user.username
      );

    user.referralCode = code;

    await user.save();

    return code;
  },


  /*
  ==========================================
  CREATE REFERRAL
  ==========================================
  */

  async create(referrerId, code) {

    const referral =
      await Referral.create({

        referrer: referrerId,

        referredUser: null,

        code

      });

    eventBus.emit(
      events.REFERRAL_CREATED,
      referral
    );

    return mapper.toDTO(
      referral
    );
  },


  /*
  ==========================================
  COMPLETE REFERRAL
  ==========================================
  */

  async complete(
    code,
    referredUserId
  ) {

    const normalizedCode =
      code
        .trim()
        .toUpperCase();

    const referrer =
      await User.findOne({
        referralCode:
          normalizedCode
      });

    if (!referrer) {
      throw new Error(
        "Invalid referral number"
      );
    }

    if (
      referrer._id.toString() ===
      referredUserId.toString()
    ) {
      throw new Error(
        "You cannot use your own referral number"
      );
    }

    const alreadyReferred =
      await Referral.findOne({
        referredUser:
          referredUserId
      });

    if (alreadyReferred) {
      throw new Error(
        "This user has already used a referral number"
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
        }

      });

    // Save relationship on new user
    await User.findByIdAndUpdate(
      referredUserId,
      {
        referredBy:
          referrer._id
      }
    );

    eventBus.emit(
      events.REFERRAL_COMPLETED,
      referral
    );

    return mapper.toDTO(
      referral
    );
  },


  /*
  ==========================================
  REFERRER REWARD
  ==========================================
  */

  async rewardReferrer(id) {

    const referral =
      await Referral.findById(id);

    if (!referral) {
      throw new Error(
        "Referral not found"
      );
    }

    if (
      referral.referrerReward.rewardGiven
    ) {
      return mapper.toDTO(
        referral
      );
    }

    /*
      IMPORTANT:

      Put your actual BLYNK token/points
      wallet service call here.

      DO NOT use ZAR wallet balance
      if tokens are a separate currency.
    */

    referral.referrerReward.rewardGiven =
      true;

    referral.referrerReward.rewardedAt =
      new Date();

    await referral.save();

    eventBus.emit(
      events.REFERRAL_REWARDED,
      referral
    );

    return mapper.toDTO(
      referral
    );
  },


  /*
  ==========================================
  NEW MEMBER REWARD
  ==========================================
  */

  async rewardReferredUser(id) {

    const referral =
      await Referral.findById(id);

    if (!referral) {
      throw new Error(
        "Referral not found"
      );
    }

    if (
      referral
        .referredUserReward
        .rewardGiven
    ) {
      return mapper.toDTO(
        referral
      );
    }

    /*
      NEW MEMBER:

      500 TOKENS
      5 POINTS

      Connect your existing
      token/points service here.
    */

    referral
      .referredUserReward
      .rewardGiven = true;

    referral
      .referredUserReward
      .rewardedAt =
        new Date();

    await referral.save();

    eventBus.emit(
      events.REFERRAL_REWARDED,
      referral
    );

    return mapper.toDTO(
      referral
    );
  },


  /*
  ==========================================
  GET USER REFERRALS
  ==========================================
  */

  async getUserReferrals(userId) {

    const referrals =
      await Referral.find({
        referrer: userId
      })
      .populate(
        "referredUser",
        "username firstName lastName"
      )
      .sort({
        createdAt: -1
      });

    return referrals.map(
      mapper.toDTO
    );
  },


  /*
  ==========================================
  STATS
  ==========================================
  */

  async stats() {

    const total =
      await Referral.countDocuments();

    const completed =
      await Referral.countDocuments({
        status: "completed"
      });

    const pending =
      await Referral.countDocuments({
        status: "pending"
      });

    return {
      total,
      completed,
      pending
    };
  }

};