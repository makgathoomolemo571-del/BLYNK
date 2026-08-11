const ModerationDTO =
require("./moderation.dto");

exports.toDTO =
(item)=>
new ModerationDTO({

  id:item._id,

  targetType:item.targetType,

  targetId:item.targetId,

  reason:item.reason,

  severity:item.severity,

  status:item.status,

  actionTaken:item.actionTaken,

  reviewedAt:item.reviewedAt,

  createdAt:item.createdAt

});