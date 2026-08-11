const service = require("./admin.service");

exports.login = async (req, res, next) => {
  try {
    const result = await service.login(
      req.body.email,
      req.body.password
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const result = await service.logout(req.body.refreshToken);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    const result = await service.me(req.user.userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.dashboard = async (req, res, next) => {
  try {
    const result = await service.dashboard();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.users = async (req, res, next) => {
  try {
    const result = await service.users();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
exports.user = async (req, res, next) => {
  try {

    const result =
    await service.getUser(req.params.id);

    res.json(result);

  } catch (err) {
    next(err);
  }
};

exports.suspendUser = async (req, res, next) => {
  try {
    const result = await service.suspendUser(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.unsuspendUser = async (req, res, next) => {
  try {
    const result = await service.unsuspendUser(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.changeRole = async (req, res, next) => {
  try {
    const result = await service.changeRole(
      req.params.id,
      req.body.role
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};

exports.reports = async (req, res, next) => {
  try {
    res.json(await service.reports());
  } catch (err) {
    next(err);
  }
};

exports.support = async (req, res, next) => {
  try {
    res.json(await service.support());
  } catch (err) {
    next(err);
  }
};

exports.verification = async (req, res, next) => {
  try {
    res.json(await service.verification());
  } catch (err) {
    next(err);
  }
};

exports.analytics = async (req, res, next) => {
  try {
    res.json(await service.analytics());
  } catch (err) {
    next(err);
  }
};

exports.wallets = async (req, res, next) => {
  try {
    res.json(await service.wallets());
  } catch (err) {
    next(err);
  }
};

exports.revenues = async (req, res, next) => {
  try {
    res.json(await service.revenues());
  } catch (err) {
    next(err);
  }
};

exports.subscriptions = async (req, res, next) => {
  try {
    res.json(await service.subscriptions());
  } catch (err) {
    next(err);
  }
};

exports.health = async (req, res, next) => {
  try {
    res.json(await service.health());
  } catch (err) {
    next(err);
  }
};

exports.audit = async (req, res, next) => {
  try {
    res.json(await service.audit());
  } catch (err) {
    next(err);
  }
};

exports.announcement = async (req, res, next) => {
  try {
    const result = await service.announcement(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};