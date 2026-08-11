const service = require("./advertisement.service");

exports.create = async (req, res, next) => {

  try {
 console.log("========== CREATE AD START ==========");
console.log("========== CREATE AD CONTROLLER ==========");
        console.log("USER:", req.user);

        console.log("BODY:", req.body);

    const result =
  await service.create(
    {
      ...req.body,
      advertiser: req.user._id
    },
    req.app.get("eventBus")
  );
    res.status(201).json(result);

  } catch(error){
console.log("CREATE AD ERROR:", error);

    console.log("ADVERTISEMENT CREATE ERROR:");
    console.log(error);

    return res.status(400).json({
        message:error.message,
        stack:error.stack
    });

}

};

exports.myAdvertisements = async (req, res, next) => {
    try {
        const ads = await service.myAdvertisements(req.user._id);

        res.json({
            success: true,
            data: ads
        });

    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {

  try {

    const result =
      await service.getAll(req.user._id);

    res.json(result);

  } catch (err) {
    next(err);
  }

};

exports.update = async (req, res, next) => {

  try {

    const result =
      await service.update(
        req.params.id,
        req.body,
        req.app.get("eventBus")
      );

    res.json(result);

  } catch (err) {
    next(err);
  }

};

exports.pause = async (req, res, next) => {

  try {

    const result =
      await service.pause(
        req.params.id,
        req.app.get("eventBus")
      );

    res.json(result);

  } catch (err) {
    next(err);
  }

};

exports.resume = async (req, res, next) => {

  try {

    const result =
      await service.resume(
        req.params.id,
        req.app.get("eventBus")
      );

    res.json(result);

  } catch (err) {
    next(err);
  }

};

exports.click = async (req, res, next) => {

  try {

    const result =
      await service.trackClick(
        req.params.id,
        req.app.get("eventBus")
      );

    res.json(result);

  } catch (err) {
    next(err);
  }

};

exports.impression = async (req, res, next) => {

  try {

    const result =
      await service.trackImpression(
        req.params.id,
        req.app.get("eventBus")
      );

    res.json(result);

  } catch (err) {
    next(err);
  }

};