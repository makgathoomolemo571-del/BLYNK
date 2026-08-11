const Draft = require("./draft.model");

exports.save = async (userId, data) => {

  return await Draft.findOneAndUpdate(
    { creator: userId },
    {
      creator: userId,
      data
    },
    { upsert: true, new: true }
  );

};

exports.get = async (userId) => {

  return await Draft.find({ creator: userId });

};