const service = require("./reward.service");

exports.create = async (req, res, next) => {
  try {
    const result = await service.create(req.body, req.user._id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.mine = async (req, res, next) => {
  try {
    const result = await service.getUserRewards(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.redeem = async (req, res, next) => {
  try {
    const result = await service.redeem(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.stats = async (req, res, next) => {
  try {
    const result = await service.stats(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};