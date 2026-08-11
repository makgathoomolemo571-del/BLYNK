const MarketplaceDTO =
require("./marketplace.dto");

exports.toDTO =
(item)=>
new MarketplaceDTO({

  id:item._id,

  creator:item.creator,

  listingType:item.listingType,

  title:item.title,

  category:item.category,

  description:item.description,

  price:item.price,

  budgetRange:item.budgetRange,

  location:item.location,

  visibility:item.visibility,

  applicationCount:
    item.applications?.length || 0,

  createdAt:item.createdAt
});