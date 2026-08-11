const service =
require("../subscription/subscription.service");

exports.create =
async (req, res, next) => {

  try {

    console.log("REQ USER:", req.user);
    console.log("PLAN:", req.body.plan);
  const result = await service.create(
    req.user._id,
    req.body.plan
);

    res.status(201).json(result);

  } catch (err) {
    next(err);
  }
};
  
exports.getMine =
async (req,res,next) => {

  try {

    const result =
      await service.get(
        req.user._id
      );

    res.json(result);

  } catch(err) {
    next(err);
  }
};

exports.upgrade =
async (req, res, next) => {

  try {
console.log("USER:", req.user._id);
console.log("PLAN:", req.body.plan);
    const result =
      await service.upgrade(
        req.user._id,
        req.body.plan
      );
console.log("FOUND:", result);
    res.json(result);

  } catch (err) {
    next(err);
  }
};

exports.cancel =
async (req, res, next) => {

  try {

    const result =
      await service.cancel(
        req.user._id
      );

    res.json(result);

  } catch (err) {
    next(err);
  }
};