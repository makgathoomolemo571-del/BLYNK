const EventEmitter = require("events");
const walletService = require("../../modules/wallet/wallet.service");
const logger = require("../../config/logger");

const eventBus = new EventEmitter();

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
// EVENT LISTENERS
// ======================

// CREDIT WALLET
eventBus.on(WALLET_EVENTS.WALLET_CREDITED, async (payload) => {

  try {

    await walletService.credit(
      payload.userId,
      payload.amount,
      payload.reason || "credit"
    );

    logger.info("WALLET_CREDITED", payload);

  } catch (err) {

    logger.error("WALLET_CREDIT_FAILED", err);

  }

});

// DEBIT WALLET
eventBus.on(WALLET_EVENTS.WALLET_DEBITED, async (payload) => {

  try {

    await walletService.debit(
      payload.userId,
      payload.amount,
      payload.reason || "debit"
    );

    logger.info("WALLET_DEBITED", payload);

  } catch (err) {

    logger.error("WALLET_DEBIT_FAILED", err);

  }

});

// TOKEN EARNED (from posts, reels, rewards)
eventBus.on(WALLET_EVENTS.TOKEN_EARNED, async (payload) => {

  try {

    await walletService.addTokens(
      payload.userId,
      payload.amount,
      payload.source
    );

    logger.info("TOKEN_EARNED", payload);

  } catch (err) {

    logger.error("TOKEN_EARN_FAILED", err);

  }

});

// TOKEN SPENT (marketplace, boosts, etc)
eventBus.on(WALLET_EVENTS.TOKEN_SPENT, async (payload) => {

  try {

    await walletService.spendTokens(
      payload.userId,
      payload.amount,
      payload.reason
    );

    logger.info("TOKEN_SPENT", payload);

  } catch (err) {

    logger.error("TOKEN_SPENT_FAILED", err);

  }

});

// VIG POINTS EARNED
eventBus.on(WALLET_EVENTS.VIG_POINTS_EARNED, async (payload) => {

  try {

    await walletService.addVigPoints(
      payload.userId,
      payload.amount,
      payload.source
    );

    logger.info("VIG_POINTS_EARNED", payload);

  } catch (err) {

    logger.error("VIG_POINTS_FAILED", err);

  }

});

// VOUCHER REDEMPTION
eventBus.on(WALLET_EVENTS.VOUCHER_REDEEMED, async (payload) => {

  try {

    await walletService.redeemVoucher(
      payload.userId,
      payload.voucherType,
      payload.value
    );

    logger.info("VOUCHER_REDEEMED", payload);

  } catch (err) {

    logger.error("VOUCHER_FAILED", err);

  }

});

// FRAUD ALERT
eventBus.on(WALLET_EVENTS.FRAUD_DETECTED, async (payload) => {

  logger.warn("FRAUD_DETECTED", payload);

  // optional: freeze wallet
  await walletService.freezeWallet(payload.userId);

});

// ======================
// EXPORTS
// ======================

module.exports = {
  eventBus,
  WALLET_EVENTS
};