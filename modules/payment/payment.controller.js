const service = require("./payment.service");

const peachService =
require("../../services/payments/peach.service");

const walletService =
require("../wallet/wallet.service");

const subscriptionService =
require("../subscription/subscription.service");

exports.create = async (req, res, next) => {

  try {

    const result =
      await service.create(
        req.body,
        req.user._id
      );

    res.status(201).json(result);

  } catch (err) {
    next(err);
  }

};

exports.mine = async (req, res, next) => {

  try {

    const result =
      await service.getUserPayments(req.user._id);

    res.json(result);

  } catch (err) {
    next(err);
  }

};

exports.stats = async (req, res, next) => {

  try {

    const result =
      await service.stats();

    res.json(result);

  } catch (err) {
    next(err);
  }

};

exports.createCheckout = async (req, res, next) => {

  try {

    const userId = req.user._id;

    const result =
      await peachService.createCheckout({

        amount: req.body.amount,

        merchantTransactionId:
          `BLYNK_${Date.now()}_${userId}`,

        customerEmail: req.user.email,

        callbackUrl: req.body.callbackUrl

      });

    res.json(result);

  } catch (err) {
    next(err);
  }

};

exports.callback = async (req, res, next) => {

  try {

    const { checkoutId } = req.body;

    const payment =
      await peachService.verifyPayment(checkoutId);

    // SUCCESS CHECK
    if (payment.resultCode === "000.000.000") {

      const userId =
        payment.merchantTransactionId.split("_").pop();

      // CREDIT WALLET (TOKENS)
      await walletService.depositTokens({

        userId,

        amount: payment.amount

      });

    }

    res.json({ success: true });

  } catch (err) {
    next(err);
  }

};