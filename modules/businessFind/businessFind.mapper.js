const BusinessFindDTO =
require("./businessFind.dto");

exports.toDTO =
(item)=>
new BusinessFindDTO({

  id: item._id,

  business: item.business,

  businessName:
  item.businessName,

  industry:
  item.industry,

  campaignName:
  item.campaignName,

  campaignObjectives:
  item.campaignObjectives,

  targetAudience:
  item.targetAudience,

  campaignBudget:
  item.campaignBudget,

  compensationType:
  item.compensationType,

  status:
  item.status,

  visibility:
  item.visibility,

  applications:
  item.applications,
  

  createdAt:
  item.createdAt
});