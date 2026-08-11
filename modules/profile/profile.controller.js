const service = require("./profile.service");
const upload = require("../../middleware/upload.middleware");

exports.createProfile = async (req, res, next) => {
  try {
    const profile = await service.createProfile(
      req.user._id,
      req.body
    );

    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await service.getProfile(req.user._id);

    res.json(profile);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const profile = await service.updateProfile(
      req.user._id,
      req.body
    );

    res.json(profile);
  } catch (err) {
    next(err);
  }
};

exports.getProfileById = async (req, res, next) => {
  try {
    const profile = await service.getProfileById(req.params.id);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

exports.uploadAvatar = async (req, res, next) => {
    try {
        const profile = await service.uploadAvatar(
            req.user._id,
            req.file
        );

        res.json(profile);
    } catch (err) {
        next(err);
    }
};

exports.uploadBanner = async (req, res, next) => {
    try {
        const profile = await service.uploadBanner(
            req.user._id,
            req.file
        );

        res.json(profile);
    } catch (err) {
        next(err);
    }
};