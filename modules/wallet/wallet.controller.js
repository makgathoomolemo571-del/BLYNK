const service =
require("./wallet.service");

exports.create =
async (req,res,next) => {

  try {

    const result =
    await service.createWallet(
      req.user._id
    );

    res.status(201)
      .json(result);

  } catch(err) {
    next(err);
  }
};

exports.getMine = async (req, res, next) => {
    try {

        const wallet = await service.getMine(req.user._id);

        res.json(wallet);

    } catch (err) {
        next(err);
    }
};

exports.deposit =
async (req,res,next) => {

  try {

    const result =
    await service.deposit(
      req.user._id,
      req.body.amount
    );

    res.json(result);

  } catch(err) {
    next(err);
  }
};

exports.withdraw =
async (req,res,next) => {

  try {

    const result =
    await service.withdraw(
      req.user._id,
      req.body.amount
    );

    res.json(result);

  } catch(err) {
    next(err);
  }
};

exports.transactions =
async (req,res,next) => {

  try {

    const result =
    await service.getTransactions(
      req.user._id
    );

    res.json(result);

  } catch(err) {
    next(err);
  }
};