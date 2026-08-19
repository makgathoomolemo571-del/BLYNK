const Wallet = require("./wallet.model");
const Transaction = require("./transaction.model");

const walletMapper =
require("./wallet.mapper");

const transactionMapper =
require("./transaction.mapper");

const eventBus =
require("../../shared/eventBus");

const events =
require("./wallet.events");

exports.createWallet =
async (userId) => {

  let wallet =
  await Wallet.findOne({
    user: userId
  });

  if (wallet) {
    return walletMapper.toDTO(wallet);
  }

  wallet =
  await Wallet.create({
    user: userId
  });

  eventBus.emit(
    events.WALLET_CREATED,
    {
      userId,
      walletId: wallet._id
    }
  );

  return walletMapper.toDTO(wallet);
};

exports.getMine = async (userId) => {

    let wallet = await Wallet.findOne({
        user: userId
    });

    if (!wallet) {

        wallet = await Wallet.create({
            user: userId,
            balance: 0,
            currency: "ZAR",
            status: "active"
        });

        eventBus.emit(events.WALLET_CREATED, {
            userId,
            walletId: wallet._id
        });
    }

    return walletMapper.toDTO(wallet);
};

exports.deposit =
async (
  userId,
  amount
) => {

  const wallet =
  await Wallet.findOne({
    user: userId
  });

  if (!wallet) {
    throw new Error(
      "Wallet not found"
    );
  }

  wallet.balance += amount;

  wallet.totalDeposits += amount;

  wallet.lastTransactionAt =
  new Date();

  await wallet.save();

const transactionId =
  `TXN-${Date.now()}-${Math.floor(Math.random()*100000)}`;

  const transaction =
  await Transaction.create({
    transactionId,
    wallet: wallet._id,
    user: userId,
    type: "deposit",
    amount,
    status: "completed"
  });

  eventBus.emit(
    events.FUNDS_DEPOSITED,
    {
      userId,
      amount
    }
  );

  return {
    wallet:
      walletMapper.toDTO(wallet),
    transaction:
      transactionMapper.toDTO(
        transaction
      )
  };
};

exports.depositTokens = async (
  userId,
  amount,
  reason = "TOKEN_REWARD"
) => {

  const wallet =
    await Wallet.findOne({
      user: userId
    });

  if (!wallet) {
    throw new Error(
      "Wallet not found"
    );
  }

  if (wallet.status !== "active") {
    throw new Error(
      "Wallet is not active"
    );
  }

  wallet.balance += amount;

  wallet.totalDeposits += amount;

  wallet.lastTransactionAt =
    new Date();

  await wallet.save();

  const transactionId =
    `TXN-${Date.now()}-${Math.floor(
      Math.random() * 100000
    )}`;

  const transaction =
    await Transaction.create({

      transactionId,

      wallet: wallet._id,

      user: userId,

      type: "deposit",

      amount,

      status: "completed",

      description: reason

    });

  eventBus.emit(
    events.FUNDS_DEPOSITED,
    {
      userId,
      amount,
      reason
    }
  );

  return {
    wallet:
      walletMapper.toDTO(wallet),

    transaction:
      transactionMapper.toDTO(
        transaction
      )
  };
};

exports.withdraw =
async (
  userId,
  amount
) => {

  const wallet =
  await Wallet.findOne({
    user: userId
  });

  if (!wallet) {
    throw new Error(
      "Wallet not found"
    );
  }

  if (
    wallet.balance < amount
  ) {
    throw new Error(
      "Insufficient balance"
    );
  }

  wallet.balance -= amount;

  wallet.totalWithdrawals += amount;

  wallet.lastTransactionAt =
  new Date();

  await wallet.save();

const transactionId =
  `TXN-${Date.now()}-${Math.floor(Math.random()*100000)}`;

  const transaction =
  await Transaction.create({
    transactionId,
    wallet: wallet._id,
    user: userId,
    type: "withdrawal",
    amount,
    status: "completed"
  });

  eventBus.emit(
    events.FUNDS_WITHDRAWN,
    {
      userId,
      amount
    }
  );

  return {
    wallet:
      walletMapper.toDTO(wallet),
    transaction:
      transactionMapper.toDTO(
        transaction
      )
  };
};

exports.getTransactions =
async (userId) => {

  const transactions =
  await Transaction.find({
    user: userId
  })
  .sort({
    createdAt: -1
  });

  return transactions.map(
    transactionMapper.toDTO
  );
};

exports.freezeWallet =
async (userId) => {

  const wallet =
  await Wallet.findOne({
    user: userId
  });

  wallet.status =
    "frozen";

  await wallet.save();

  return walletMapper.toDTO(
    wallet
  );
};

exports.closeWallet =
async (userId) => {

  const wallet =
  await Wallet.findOne({
    user: userId
  });

  wallet.status =
    "closed";

  await wallet.save();

  return walletMapper.toDTO(
    wallet
  );
};

exports.getAll =
async ()=>{

    return await Wallet
    .find()
    .populate(
        "user",
        "username email"
    );

};

exports.stats = async () => {

  const totalWallets = await Wallet.countDocuments();

  const balance = await Wallet.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$balance" }
      }
    }
  ]);

  const vouchers = await Transaction.countDocuments({
    type: "voucher"
  });

  return {

    totalWallets,

    totalTokens: balance[0]?.total || 0,

    totalVIG: balance[0]?.total || 0,

    vouchersIssued: vouchers

  };

};