const AnalyticsDTO =
require("./analytics.dto");

exports.toDTO =
(item)=>
new AnalyticsDTO({

  id:item._id,

  eventType:
  item.eventType,

  actor:
  item.actor,

  targetId:
  item.targetId,

  targetType:
  item.targetType,

  metadata:
  item.metadata,

  createdAt:
  item.createdAt
});