const userService = require("../user/user.service");
const postService = require("../post/post.service");
const reelService = require("../reel/reel.service");
const podcastService = require("../podcast/podcast.service");
const walletService = require("../wallet/wallet.service");

const analyticsEngine = require("../services/system/analyticsEngine");

async function runAnalyticsJob() {

  try {

    const data = {

      users: await userService.stats(),
      posts: await postService.stats(),
      reels: await reelService.stats(),
      podcasts: await podcastService.stats(),
      wallets: await walletService.stats(),

      timestamp: new Date()

    };

    await analyticsEngine.storeSnapshot(data);

    console.log("ANALYTICS_JOB_COMPLETED");

  } catch (err) {

    console.error("ANALYTICS_JOB_ERROR:", err);

  }

}

module.exports = runAnalyticsJob;