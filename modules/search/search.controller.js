const service =
require("./search.service");

exports.search =
async (req, res, next) => {

  try {

    const result =
    await service.search(
      req.query.q,
      req.query.type
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};