const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./wallet.controller");

router.post(
    "/create",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        wallet: true,
        audit: "WALLET_CREATE"
    }),
    controller.create
);

router.get(
    "/me",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        wallet: true,
        
    }),
    controller.getMine
);

router.post(
    "/deposit",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        wallet: true,
        payment: true,
        audit: "WALLET_DEPOSIT"
    }),
    controller.deposit
);

router.post(
    "/withdraw",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        wallet: true,
        payment: true,
        audit: "WALLET_WITHDRAW"
    }),
    controller.withdraw
);

router.get(
    "/transactions",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        wallet: true,
        audit: "VIEW_TRANSACTIONS"
    }),
    controller.transactions
);

module.exports = router;