const router = require("express").Router();

const multer = require("multer");

const upload = multer({
    dest: "uploads/"
});

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./media.controller");

// Upload media
router.post(
    "/upload",
    auth,
    upload.single("file"),
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "MEDIA_UPLOAD",
        file: true,
        storage: true,
        media: true,
        security: true,
        audit: "MEDIA_UPLOAD"
    }),
    controller.upload
);

// View media
router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "media.view",
        media: true,
        security: true
    }),
    controller.getById
);

// Delete media
router.delete(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "media.delete",
        media: true,
        security: true,
        audit: "MEDIA_DELETE"
    }),
    controller.remove
);

module.exports = router;