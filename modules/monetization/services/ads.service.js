// src/modules/monetization/services/ads.service.js

const CreatorRevenue = require("../creatorRevenue/creatorRevenue.model");
const CreatorWallet = require("../creatorWallet/creatorWallet.model");

const PLATFORM_SHARE = 0.45;
const CREATOR_SHARE = 0.55;

/*
CPM values can later come from:
- Country
- Device
- Advertiser
- Campaign
- Category
*/

const CPM = {
  post: 0.80,
  reel: 2.50,
  video: 3.50,
  podcast: 4.20,
  story: 0.60,
  watchparty: 5.50
};

class AdsService {

  calculateRevenue(type, impressions) {

    const cpm = CPM[type] || 1;

    const grossRevenue =
      (impressions / 1000) * cpm;

    return {

      grossRevenue,

      creatorRevenue:
        grossRevenue * CREATOR_SHARE,

      platformRevenue:
        grossRevenue * PLATFORM_SHARE

    };

  }

  async recordRevenue({

    creatorId,

    contentId,

    contentType,

    impressions

  }) {

    const revenue =
      this.calculateRevenue(
        contentType,
        impressions
      );

    await CreatorRevenue.create({

      creator: creatorId,

      content: contentId,

      contentType,

      impressions,

      grossRevenue:
        revenue.grossRevenue,

      creatorRevenue:
        revenue.creatorRevenue,

      platformRevenue:
        revenue.platformRevenue

    });

    await CreatorWallet.findOneAndUpdate(

      {

        creator: creatorId

      },

      {

        $inc: {

          pendingBalance:
            revenue.creatorRevenue,

          lifetimeEarnings:
            revenue.creatorRevenue

        }

      },

      {

        upsert: true,

        new: true

      }

    );

    return revenue;

  }

}

module.exports = new AdsService();