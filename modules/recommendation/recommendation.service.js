const Recommendation =
require("./recommendation.model");

const mapper =
require("./recommendation.mapper");

const eventBus =
require("../../shared/eventBus");

const EVENTS =
require("./recommendation.events");

exports.generate =
async (
userId,
limit = 20
)=>{

  const items =
  await Recommendation.find({
    user:userId
  })
  .sort({
    score:-1
  })
  .limit(limit);

  eventBus.emit(
    EVENTS.RECOMMENDATION_GENERATED,
    {
      userId
    }
  );

  return items.map(
    mapper.toDTO
  );

};

exports.trackView =
async (
id
)=>{

  eventBus.emit(
    EVENTS.RECOMMENDATION_VIEWED,
    {
      recommendationId:id
    }
  );

  return {
    success:true
  };

};

exports.trackClick =
async (
id
)=>{

  eventBus.emit(
    EVENTS.RECOMMENDATION_CLICKED,
    {
      recommendationId:id
    }
  );

  return {
    success:true
  };

};

exports.stats = async () => {

  const generated =
    await Recommendation.countDocuments();

  const clicks =
    await Recommendation.countDocuments({
      clicked: true
    });

  const views =
    await Recommendation.countDocuments({
      viewed: true
    });

  return {
    generated,
    views,
    clicks
  };

};