const service = require("./conversation.service");

exports.create = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
console.log("REQ.USER:", req.user);
    const result = await service.create(
      req.user._id,
      req.body
    );

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getMyConversations = async (req, res, next) => {
  try {
    const result = await service.getMine(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const result = await service.getById(
      req.params.id,
      req.user._id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

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

exports.delete = async (req, res, next) => {
  try {
    const result = await service.delete(
      req.params.id,
      req.user._id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.archive = async (req, res, next) => {
  try {
    const result = await service.archive(
      req.params.id,
      req.user._id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.unarchive = async (req, res, next) => {
  try {
    const result = await service.unarchive(
      req.params.id,
      req.user._id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.mute = async (req, res, next) => {
  try {
    const result = await service.mute(
      req.params.id,
      req.user._id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.unmute = async (req, res, next) => {
  try {
    const result = await service.unmute(
      req.params.id,
      req.user._id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.pin = async (req, res, next) => {
  try {
    const result = await service.pin(
      req.params.id,
      req.user._id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.unpin = async (req, res, next) => {
  try {
    const result = await service.unpin(
      req.params.id,
      req.user._id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.addParticipant = async (req, res, next) => {
  try {
    const result = await service.addParticipant(
      req.params.id,
      req.user._id,
      req.body.userId
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.removeParticipant = async (req, res, next) => {
  try {
    const result = await service.removeParticipant(
      req.params.id,
      req.user._id,
      req.params.userId
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.leave = async (req, res, next) => {
  try {
    const result = await service.leave(
      req.params.id,
      req.user._id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};