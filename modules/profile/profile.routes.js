const router = require("express").Router();

const controller = require("./profile.controller");
const upload = require("../../middleware/upload.middleware");
const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

// Create Profile
router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "profile:create",
        privacy: true,
        compliance: true,
        audit: "PROFILE_CREATE"
    }),
    controller.createProfile
);

// My Profile
router.get(
    "/me",
    auth,
    policy({
        auth: true,
        account: true,
       
    }),
    controller.getProfile
);

// View Another Profile
router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        privacy: true
    }),
    controller.getProfileById
);

router.post(
    "/upload/avatar",
    auth,
    upload.single("avatar"),
    controller.uploadAvatar
);

router.post(
    "/upload/banner",
    auth,
    upload.single("banner"),
    controller.uploadBanner
);

// Update My Profile
router.put(
    "/me",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        
        privacy: true,
        compliance: true,
        audit: "PROFILE_UPDATE"
    }),
    controller.updateProfile
);

module.exports = router;