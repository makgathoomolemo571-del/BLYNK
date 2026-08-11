const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");
const validate = require("../../middleware/validation.middleware");

const controller = require("./advertisement.controller");
const validator = require("./advertisement.validator");

// Create Advertisement
router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        role: ["business"],
        business: true,
        subscription: [
            "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"
        ],
        feature: "ADVERTISEMENT_CREATE",
        permission: "ADVERTISEMENT_CREATE",
        payment: true,
        wallet: true,
        security: true,
        api: true,
        device: true,
        session: true,
        privacy: true,
        compliance: true,
        audit: "ADVERTISEMENT_CREATE",
        system: true
    }),
    validate(validator.createAd),
    controller.create
);

router.get(
    "/my",
    auth,
    policy({
        auth: true,
        role: ["business"]
    }),
    controller.myAdvertisements
);

// Get Advertisements
router.get(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        role: ["member",
    "creator",
            "business",
            "admin",
            "superadmin"
        ],
        business: true,
        permission: "ADVERTISEMENT_VIEW",
        subscription: [
            "member",
    "creator",
    "business"
        ],
        security: true,
        api: true,
        device: true,
        session: true,
        audit: "ADVERTISEMENT_VIEW",
        system: true
    }),
    controller.getAll
);

// Update Advertisement
router.patch(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        role: ["business"],
        business: true,
        permission: "advertisement.update",
        subscription: [
            "BUSINESS_PRO",
            "BUSINESS_PREMIUM",
            "ENTERPRISE"
        ],
        feature: "ADVERTISEMENT_EDIT",
        security: true,
        api: true,
        device: true,
        session: true,
        audit: "ADVERTISEMENT_UPDATE",
        system: true
    }),
    controller.update
);

// Pause Advertisement
router.patch(
    "/:id/pause",
    auth,
    policy({
        auth: true,
        role: ["business"],
        business: true,
        permission: "advertisement.pause",
        audit: "ADVERTISEMENT_PAUSE"
    }),
    controller.pause
);

// Resume Advertisement
router.patch(
    "/:id/resume",
    auth,
    policy({
        auth: true,
        role: ["business"],
        business: true,
        permission: "advertisement.resume",
        audit: "ADVERTISEMENT_RESUME"
    }),
    controller.resume
);

// Register Click
router.post(
    "/:id/click",
    auth,
    policy({
        auth: true,
        api: true,
        security: true,
        audit: "ADVERTISEMENT_CLICK"
    }),
    controller.click
);

// Register Impression
router.post(
    "/:id/impression",
    auth,
    policy({
        auth: true,
        api: true,
        security: true,
        audit: "ADVERTISEMENT_IMPRESSION"
    }),
    controller.impression
);

module.exports = router;