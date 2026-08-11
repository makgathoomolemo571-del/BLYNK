const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./search.controller");

router.get(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        search: true,
        api: true,
        security: true,
        session: true
    }),
    controller.search
);

module.exports = router;