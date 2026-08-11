const User = require("../user/user.model");

const rewardEngine = {

  async addVigPoints(userId, points, reason = "activity") {

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    user.vigPoints = (user.vigPoints || 0) + points;

    user.rewardHistory.push({
      points,
      reason,
      date: new Date()
    });

    await user.save();

    return user.vigPoints;

  },

  async redeem(userId, points) {

    const user = await User.findById(userId);

    if (user.vigPoints < points) {
      throw new Error("Insufficient VIG points");
    }

    user.vigPoints -= points;

    await user.save();

    return user.vigPoints;

  },

  async stats(userId) {

    const user = await User.findById(userId);

    return {
      vigPoints: user.vigPoints || 0,
      history: user.rewardHistory || []
    };

  }

};

module.exports = rewardEngine;