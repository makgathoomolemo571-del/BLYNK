const service = require("./studio.service");

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
    const result = await service.getMine(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const result = await service.getById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const result = await service.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const result = await service.remove(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};