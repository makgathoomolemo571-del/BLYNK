const storyService = require("./story.service");
const cron = require("node-cron");

const analyticsJob = require("./jobs/analytics.job");
const notificationJob = require("./jobs/notification.job");
const revenueJob = require("./jobs/revenue.job");
const rewardJob = require("./jobs/reward.job");
const walletJob = require("./jobs/wallet.job");
const trendingJob = require("./jobs/trending.job");
const cleanupJob = require("./jobs/cleanup.job");
const verificationJob = require("./jobs/verification.job");
const storyExpiryJob = require("./jobs/storyExpiry.job");

setInterval(async () => {
  try {
    await storyService.expireStories();
  } catch (err) {
    console.error("STORY EXPIRY ERROR:", err);
  }
}, 15 * 60 * 1000); // every 15 min

// every hour
cron.schedule("0 * * * *", analyticsJob);

// every minute
cron.schedule("* * * * *", notificationJob);

// daily
cron.schedule("0 0 * * *", revenueJob);

// hourly
cron.schedule("0 * * * *", rewardJob);

// hourly
cron.schedule("0 * * * *", walletJob);

// Every 10 minutes
cron.schedule("*/10 * * * *", trendingJob);

// Every hour
cron.schedule("0 * * * *", cleanupJob);

// Every 30 minutes
cron.schedule("*/30 * * * *", verificationJob);

// Every 15 minutes
cron.schedule("*/15 * * * *", storyExpiryJob);