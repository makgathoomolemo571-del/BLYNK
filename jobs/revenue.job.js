const walletService =
require("../wallet/wallet.service");

const revenueEngine =
require("../services/system/revenueEngine");

async function runRevenueJob() {

  try {

    const summary =
      await walletService.revenueStats();

    await revenueEngine.save(summary);

    console.log("REVENUE_JOB_DONE");

  } catch (err) {

    console.error("REVENUE_JOB_ERROR:", err);

  }

}

module.exports = runRevenueJob;