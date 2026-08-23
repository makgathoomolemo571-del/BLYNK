const service = require("./wallet.service");

const getUserId = (req) => {
  return req.user?.userId || req.user?._id || req.user?.id;
};

exports.create = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: "USER_ID_MISSING",
          message: "Authenticated user ID is missing"
        }
      });
    }

    const result = await service.createWallet(userId);

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};

exports.getMine = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: "USER_ID_MISSING",
          message: "Authenticated user ID is missing"
        }
      });
    }

    const wallet = await service.getMine(userId);

    res.json({
      success: true,
      data: wallet
    });

  } catch (err) {
    next(err);
  }
};

exports.deposit = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: "USER_ID_MISSING",
          message: "Authenticated user ID is missing"
        }
      });
    }

    const result = await service.deposit(
      userId,
      req.body.amount
    );

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};

exports.withdraw = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: "USER_ID_MISSING",
          message: "Authenticated user ID is missing"
        }
      });
    }

    const result = await service.withdraw(
      userId,
      req.body.amount
    );

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};

exports.transactions = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: "USER_ID_MISSING",
          message: "Authenticated user ID is missing"
        }
      });
    }

    const result = await service.getTransactions(userId);

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};