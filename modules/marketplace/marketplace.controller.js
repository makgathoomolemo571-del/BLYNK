const service = require("./marketplace.service");

// CREATE
exports.create = async (req, res, next) => {
  try {
    const result = await service.create(req.user._id, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// GET ALL
exports.getAll = async (req, res, next) => {
  try {
    const result = await service.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// MINE
exports.getMine = async (req, res, next) => {
  try {
    const result = await service.getMine(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// GET ONE
exports.getById = async (req, res, next) => {
  try {
    const result = await service.getById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.update = async (req, res, next) => {
  try {
    const result = await service.update(
      req.params.id,
      req.user._id,
      req.body
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.remove = async (req, res, next) => {
  try {
    const result = await service.remove(
      req.params.id,
      req.user._id
    );
    res.json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

// APPLY
exports.apply = async (req, res, next) => {
  try {
    const result = await service.apply(
      req.params.id,
      req.user._id,
      req.body
    );
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// APPLICATIONS
exports.getApplications = async (req, res, next) => {
  try {
    const result = await service.getApplications(
      req.params.id,
      req.user._id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};