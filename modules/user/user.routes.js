const router = require("express").Router();

const controller = require("./user.controller");

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

// Create User (Admin only)

router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["admin", "superadmin"],
        permission: "user.create",
        admin: true,
        audit: "USER_CREATE"
    }),
    controller.createUser
);

// List Users (Admin only)

router.get(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["admin", "superadmin"],
        permission: "user.view",
        admin: true,
        audit: "USER_LIST"
    }),
    controller.getUsers
);

// View One User

router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "user.view",
        privacy: true,
        audit: "USER_VIEW"
    }),
    controller.getUser
);

module.exports = router;