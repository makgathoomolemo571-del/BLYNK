const VerificationDTO =
require("./verification.dto");

exports.toDTO =
(item)=>
new VerificationDTO({

  id:item._id,

  type:item.type,

  status:item.status,

  fullName:item.fullName,

  reviewedAt:item.reviewedAt,

  rejectionReason:
  item.rejectionReason,

  createdAt:item.createdAt

});