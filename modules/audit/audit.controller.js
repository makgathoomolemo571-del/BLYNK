const service = require("./audit.service");

exports.getAll = async (req, res, next) => {

  try {
    const result = await service.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }

};

exports.getByUser = async (req, res, next) => {

  try {
    const result = await service.getByUser(req.params.userId);
    res.json(result);
  } catch (err) {
    next(err);
  }

};

exports.stats = async (req, res, next) => {

  try {
    const result = await service.stats();
    res.json(result);
  } catch (err) {
    next(err);
  }

};

exports.log = async (req, res, next) => {

  try {

    const result = await service.log({
      user: req.user?._id,
      action: req.body.action,
      module: req.body.module,
      metadata: req.body.metadata,
      ip: req.ip,
      userAgent: req.headers["user-agent"]
    });

    res.status(201).json(result);

  } catch (err) {
    next(err);
  }

};