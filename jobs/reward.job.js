const rewardEngine =
require("../services/system/rewardEngine");

const userService =
require("../user/user.service");

async function runRewardJob() {

  try {

    const users =
      await userService.getActiveUsers();

    for (const user of users) {

      await rewardEngine.calculate(user._id);

    }

    console.log("REWARD_JOB_DONE");

  } catch (err) {

    console.error("REWARD_JOB_ERROR:", err);

  }

}

module.exports = runRewardJob;