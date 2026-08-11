const RevenueDTO =
require("./revenue.dto");

exports.toDTO =
(item)=>
new RevenueDTO({

  id:item._id,

  source:item.source,

  amount:item.amount,

  currency:item.currency,

  status:item.status,

  referenceId:item.referenceId,

  description:item.description,

  paidAt:item.paidAt,

  createdAt:item.createdAt

});