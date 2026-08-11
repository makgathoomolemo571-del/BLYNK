const walletService =
require("../wallet/wallet.service");

const walletEngine =
require("../services/system/walletEngine");

async function runWalletJob() {

  try {

    const wallets =
      await walletService.getAllActive();

    for (const wallet of wallets) {

      await walletEngine.validate(wallet._id);

      await walletEngine.expireVouchers(wallet._id);

      await walletEngine.reconcile(wallet._id);

    }

    console.log("WALLET_JOB_DONE");

  } catch (err) {

    console.error("WALLET_JOB_ERROR:", err);

  }

}

module.exports = runWalletJob;