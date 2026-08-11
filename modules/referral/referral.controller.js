const service = require("./referral.service");

exports.create = async (req, res, next) => {

  try {

    const result = await service.create(
      req.user._id,
      req.body.code
    );

    res.status(201).json(result);

  } catch (err) {
    next(err);
  }

};

exports.complete = async (req, res, next) => {

  try {

    const result = await service.complete(
      req.body.code,
      req.user._id
    );

    res.json(result);

  } catch (err) {
    next(err);
  }

};

exports.reward = async (req, res, next) => {

  try {

    const result = await service.reward(
      req.params.id,
      req.body.amount
    );

    res.json(result);

  } catch (err) {
    next(err);
  }

};

exports.mine = async (req, res, next) => {

  try {

    const result = await service.getUserReferrals(
      req.user._id
    );

    res.json(result);

  } catch (err) {
    next(err);
  }

};

exports.stats = async (req, res, next) => {

  try {

    res.json(await service.stats());

  } catch (err) {
    next(err);
  }

};