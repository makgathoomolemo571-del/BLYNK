const RecommendationDTO =
require("./recommendation.dto");

exports.toDTO =
(item)=>
new RecommendationDTO({

  id:item._id,

  type:item.type,

  targetId:item.targetId,

  score:item.score,

  reason:item.reason

});