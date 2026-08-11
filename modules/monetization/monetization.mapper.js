// src/modules/monetization/monetization.mapper.js

const MonetizationDTO = require("./monetization.dto");

exports.toDTO = (monetization) =>
  new MonetizationDTO({
    id: monetization._id,

    creator:
      monetization.creator,

    wallet:
      monetization.wallet,

    currency:
      monetization.currency,

    status:
      monetization.status,

    eligibility:
      monetization.eligibility,

    revenue: {
      ads:
        monetization.revenue?.ads || 0,

      subscriptions:
        monetization.revenue?.subscriptions || 0,

      tips:
        monetization.revenue?.tips || 0,

      gifts:
        monetization.revenue?.gifts || 0,

      stars:
        monetization.revenue?.stars || 0,

      marketplace:
        monetization.revenue?.marketplace || 0,

      affiliate:
        monetization.revenue?.affiliate || 0,

      sponsors:
        monetization.revenue?.sponsors || 0,

      livestream:
        monetization.revenue?.livestream || 0,

      podcasts:
        monetization.revenue?.podcasts || 0,

      creatorFund:
        monetization.revenue?.creatorFund || 0
    },

    totals: {
      lifetime:
        monetization.totals?.lifetime || 0,

      available:
        monetization.totals?.available || 0,

      pending:
        monetization.totals?.pending || 0,

      processing:
        monetization.totals?.processing || 0,

      withdrawn:
        monetization.totals?.withdrawn || 0
    },

    payoutSettings:
      monetization.payoutSettings,

    lastPayout:
      monetization.lastPayout,

    nextPayout:
      monetization.nextPayout,

    createdAt:
      monetization.createdAt,

    updatedAt:
      monetization.updatedAt
  });

exports.toListDTO = (items = []) =>
  items.map(exports.toDTO);