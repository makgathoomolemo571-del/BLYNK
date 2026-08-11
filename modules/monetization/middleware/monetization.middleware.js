const Profile = require("../../profile/profile.model");

module.exports = async function monetizationMiddleware(
  req,
  res,
  next
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required."
      });
    }

    const profile = await Profile.findOne({
      user: req.user._id
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found."
      });
    }

    if (profile.isBlocked) {
      return res.status(403).json({
        success: false,
        message:
          "Your account is not eligible for monetization."
      });
    }

    req.creatorProfile = profile;

    next();

  } catch (err) {
    next(err);
  }
};