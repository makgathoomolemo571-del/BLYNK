const service =
require("../notification/notification.service");

exports.getMine =
async (req,res,next) => {

  try {

    const result =
      await service.getUserNotifications(
        req.user._id
      );

    res.json(result);

  } catch(err) {
    next(err);
  }
};

exports.read =
async (req,res,next) => {

  try {

    const result =
      await service.markAsRead(
        req.params.id
      );

    res.json(result);

  } catch(err) {
    next(err);
  }
};