const CreatorWallet = require("../creatorWallet/creatorWallet.model");
const CreatorPayout = require("../creatorPayout/creatorPayout.model");

const MINIMUM_PAYOUT = 100;

exports.requestPayout = async (
    creatorId,
    {
        amount,
        method,
        account
    }
) => {

    const wallet = await CreatorWallet.findOne({
        creator: creatorId
    });

    if (!wallet)
        throw new Error("Wallet not found");

    if (wallet.availableBalance < amount)
        throw new Error("Insufficient available balance");

    if (amount < MINIMUM_PAYOUT)
        throw new Error(
            `Minimum payout is R${MINIMUM_PAYOUT}`
        );

    wallet.availableBalance -= amount;
    wallet.pendingBalance += amount;

    await wallet.save();

    const payout =
        await CreatorPayout.create({

            creator: creatorId,

            amount,

            method,

            account,

            status: "pending"

        });

    return payout;
};

exports.approvePayout =
async (payoutId) => {

    const payout =
        await CreatorPayout.findById(payoutId);

    if (!payout)
        throw new Error("Payout not found");

    if (payout.status !== "pending")
        throw new Error(
            "Payout already processed"
        );

    payout.status = "approved";

    payout.approvedAt = new Date();

    await payout.save();

    return payout;
};

exports.rejectPayout =
async (
    payoutId,
    reason
) => {

    const payout =
        await CreatorPayout.findById(payoutId);

    if (!payout)
        throw new Error("Payout not found");

    const wallet =
        await CreatorWallet.findOne({

            creator: payout.creator

        });

    wallet.availableBalance += payout.amount;

    wallet.pendingBalance -= payout.amount;

    await wallet.save();

    payout.status = "rejected";

    payout.reason = reason;

    payout.rejectedAt = new Date();

    await payout.save();

    return payout;
};

exports.completePayout =
async (
    payoutId,
    transactionId
) => {

    const payout =
        await CreatorPayout.findById(
            payoutId
        );

    if (!payout)
        throw new Error("Payout not found");

    const wallet =
        await CreatorWallet.findOne({

            creator: payout.creator

        });

    wallet.pendingBalance -= payout.amount;

    wallet.totalWithdrawn += payout.amount;

    await wallet.save();

    payout.status = "paid";

    payout.transactionId =
        transactionId;

    payout.paidAt = new Date();

    await payout.save();

    return payout;
};

exports.getMyPayouts =
async (creatorId) => {

    return CreatorPayout
        .find({
            creator: creatorId
        })
        .sort({
            createdAt: -1
        });

};

exports.getPending =
async () => {

    return CreatorPayout
        .find({
            status: "pending"
        })
        .populate(
            "creator",
            "username displayName email"
        )
        .sort({
            createdAt: -1
        });

};