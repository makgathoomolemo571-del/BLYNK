const ApplicationDTO =
require("./application.dto");

exports.toDTO =
(item)=>
new ApplicationDTO({

  id: item._id,

  applicant:
  item.applicant,

  targetType:
  item.targetType,

  targetId:
  item.targetId,

  message:
  item.message,

  proposal:
  item.proposal,

  deliverables:
  item.deliverables,

  proposedPrice:
  item.proposedPrice,

  status:
  item.status,

  createdAt:
  item.createdAt
});