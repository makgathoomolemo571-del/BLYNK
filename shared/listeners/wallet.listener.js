const eventBus = require("../eventBus");

const walletService =
  require("../../modules/wallet/wallet.service");

const logger =
  require("../../config/logger");

// ======================
// WALLET EVENTS
// ======================

const WALLET_EVENTS = {

  WALLET_CREDITED: "WALLET_CREDITED",
  WALLET_DEBITED: "WALLET_DEBITED",
  WALLET_WITHDRAW_REQUESTED: "WALLET_WITHDRAW_REQUESTED",

  TOKEN_EARNED: "TOKEN_EARNED",
  TOKEN_SPENT: "TOKEN_SPENT",

  VIG_POINTS_EARNED: "VIG_POINTS_EARNED",
  VIG_POINTS_REDEEMED: "VIG_POINTS_REDEEMED",

  VOUCHER_REDEEMED: "VOUCHER_REDEEMED",

  FRAUD_DETECTED: "FRAUD_DETECTED"

};


// ======================
// VALIDATE USER ID
// ======================

function requireUserId(payload, eventName) {

  if (!payload || !payload.userId) {

    throw new Error(
      `${eventName}: userId is required`
    );

  }

  return payload.userId;
}


// ======================
// CREDIT WALLET
// ======================

eventBus.on(
  WALLET_EVENTS.WALLET_CREDITED,
  async (payload) => {

    try {

      const userId =
        requireUserId(
          payload,
          WALLET_EVENTS.WALLET_CREDITED
        );

      await walletService.credit(
        userId,
        payload.amount,
        payload.reason || "credit"
      );

      logger.info(
        "WALLET_CREDITED",
        {
          userId,
          amount: payload.amount,
          reason: payload.reason || "credit"
        }
      );

    } catch (err) {

      logger.error(
        "WALLET_CREDIT_FAILED",
        err
      );

    }

  }
);


// ======================
// DEBIT WALLET
// ======================

eventBus.on(
  WALLET_EVENTS.WALLET_DEBITED,
  async (payload) => {

    try {

      const userId =
        requireUserId(
          payload,
          WALLET_EVENTS.WALLET_DEBITED
        );

      await walletService.debit(
        userId,
        payload.amount,
        payload.reason || "debit"
      );

      logger.info(
        "WALLET_DEBITED",
        {
          userId,
          amount: payload.amount,
          reason: payload.reason || "debit"
        }
      );

    } catch (err) {

      logger.error(
        "WALLET_DEBIT_FAILED",
        err
      );

    }

  }
);


// ======================
// TOKEN EARNED
// ======================

eventBus.on(
  WALLET_EVENTS.TOKEN_EARNED,
  async (payload) => {

    try {

      const userId =
        requireUserId(
          payload,
          WALLET_EVENTS.TOKEN_EARNED
        );

      await walletService.addTokens(
        userId,
        payload.amount,
        payload.source
      );

      logger.info(
        "TOKEN_EARNED",
        {
          userId,
          amount: payload.amount,
          source: payload.source
        }
      );

    } catch (err) {

      logger.error(
        "TOKEN_EARN_FAILED",
        err
      );

    }

  }
);


// ======================
// TOKEN SPENT
// ======================

eventBus.on(
  WALLET_EVENTS.TOKEN_SPENT,
  async (payload) => {

    try {

      const userId =
        requireUserId(
          payload,
          WALLET_EVENTS.TOKEN_SPENT
        );

      await walletService.spendTokens(
        userId,
        payload.amount,
        payload.reason
      );

      logger.info(
        "TOKEN_SPENT",
        {
          userId,
          amount: payload.amount,
          reason: payload.reason
        }
      );

    } catch (err) {

      logger.error(
        "TOKEN_SPENT_FAILED",
        err
      );

    }

  }
);


// ======================
// VIG POINTS EARNED
// ======================

eventBus.on(
  WALLET_EVENTS.VIG_POINTS_EARNED,
  async (payload) => {

    try {

      const userId =
        requireUserId(
          payload,
          WALLET_EVENTS.VIG_POINTS_EARNED
        );

      await walletService.addVigPoints(
        userId,
        payload.amount,
        payload.source
      );

      logger.info(
        "VIG_POINTS_EARNED",
        {
          userId,
          amount: payload.amount,
          source: payload.source
        }
      );

    } catch (err) {

      logger.error(
        "VIG_POINTS_FAILED",
        err
      );

    }

  }
);


// ======================
// VOUCHER REDEEMED
// ======================

eventBus.on(
  WALLET_EVENTS.VOUCHER_REDEEMED,
  async (payload) => {

    try {

      const userId =
        requireUserId(
          payload,
          WALLET_EVENTS.VOUCHER_REDEEMED
        );

      await walletService.redeemVoucher(
        userId,
        payload.voucherType,
        payload.value
      );

      logger.info(
        "VOUCHER_REDEEMED",
        {
          userId,
          voucherType: payload.voucherType,
          value: payload.value
        }
      );

    } catch (err) {

      logger.error(
        "VOUCHER_FAILED",
        err
      );

    }

  }
);


// ======================
// FRAUD DETECTED
// ======================

eventBus.on(
  WALLET_EVENTS.FRAUD_DETECTED,
  async (payload) => {

    try {

      const userId =
        requireUserId(
          payload,
          WALLET_EVENTS.FRAUD_DETECTED
        );

      logger.warn(
        "FRAUD_DETECTED",
        payload
      );

      await walletService.freezeWallet(
        userId
      );

    } catch (err) {

      logger.error(
        "FRAUD_FREEZE_FAILED",
        err
      );

    }

  }
);


// ======================
// EXPORTS
// ======================

module.exports = {
  WALLET_EVENTS
};