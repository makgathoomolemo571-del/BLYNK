const Referral = require("./referral.model");
const events = require("./referral.events");

const eventBus = require("../../shared/eventBus");
const mapper = require("./referral.mapper");

module.exports = {

  async create(referrerId, code) {

    const referral = await Referral.create({

      referrer: referrerId,
      referredUser: null,
      code

    });

    eventBus.emit(events.REFERRAL_CREATED, referral);

    return mapper.toDTO(referral);

  },

  async complete(code, referredUserId) {

    const referral = await Referral.findOne({ code });

    if (!referral) {
      throw new Error("Invalid referral code");
    }

    referral.referredUser = referredUserId;
    referral.status = "completed";

    await referral.save();

    eventBus.emit(events.REFERRAL_COMPLETED, referral);

    return mapper.toDTO(referral);

  },

  async reward(id, amount) {

    const referral = await Referral.findById(id);

    if (!referral) {
      throw new Error("Referral not found");
    }

    referral.rewardAmount = amount;
    referral.rewardGiven = true;

    await referral.save();

    eventBus.emit(events.REFERRAL_REWARDED, referral);

    return mapper.toDTO(referral);

  },

  async getUserReferrals(userId) {

    const referrals = await Referral.find({
      referrer: userId
    }).sort({ createdAt: -1 });

    return referrals.map(mapper.toDTO);

  },

  async stats() {

    const total = await Referral.countDocuments();

    const completed = await Referral.countDocuments({
      status: "completed"
    });

    const pending = await Referral.countDocuments({
      status: "pending"
    });

    return {
      total,
      completed,
      pending
    };

  }

};