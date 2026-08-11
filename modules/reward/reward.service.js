const Reward = require("./reward.model");
const mapper = require("./reward.mapper");
const events = require("./reward.events");

const eventBus = require("../../shared/eventBus");

class RewardService {

  async create(data, userId) {

    const reward = await Reward.create({

      user: userId,
      ...data

    });

    eventBus.emit(events.REWARD_EARNED, reward);

    return mapper.toDTO(reward);
  }

  async getUserRewards(userId) {

    const rewards = await Reward.find({
      user: userId
    }).sort({ createdAt: -1 });

    return rewards.map(mapper.toDTO);
  }

  async redeem(id) {

    const reward = await Reward.findById(id);

    if (!reward) throw new Error("Reward not found");

    reward.isRedeemed = true;
    reward.redeemedAt = new Date();

    await reward.save();

    eventBus.emit(events.REWARD_REDEEMED, reward);

    return mapper.toDTO(reward);
  }

  async stats(userId) {

    const total = await Reward.countDocuments({ user: userId });

    const totalPoints = await Reward.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$type", total: { $sum: "$amount" } } }
    ]);

    return {
      total,
      totalPoints
    };
  }

}

module.exports = new RewardService();