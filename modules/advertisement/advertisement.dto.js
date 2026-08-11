module.exports = function toAdDTO(ad) {

  return {

    id: ad._id,

    advertiser: ad.advertiser,

    title: ad.title,

    description: ad.description,

    media: ad.media,

    type: ad.type,

    targetAudience: ad.targetAudience,

    budget: ad.budget,

    spent: ad.spent,

    impressions: ad.impressions,

    clicks: ad.clicks,

    status: ad.status,

    createdAt: ad.createdAt

  };

};