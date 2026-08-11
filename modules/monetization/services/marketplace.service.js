// src/modules/monetization/services/marketplace.service.js

const CreatorWallet = require("../../wallet/wallet.model");
const CreatorRevenue = require("../creatorRevenue/creatorRevenue.model");
const MarketplaceOrder = require("../../marketplace/order.model");

const REVENUE_TYPE = "MARKETPLACE";
const PLATFORM_COMMISSION = 0.08; // 8%

class MarketplaceService {

  async processCompletedOrder(orderId) {

    const order = await MarketplaceOrder
      .findById(orderId)
      .populate("seller");

    if (!order)
      throw new Error("Order not found");

    if (order.status !== "completed")
      throw new Error("Order is not completed");

    const gross = Number(order.totalAmount);

    const platformFee =
      gross * PLATFORM_COMMISSION;

    const creatorAmount =
      gross - platformFee;

    let wallet =
      await CreatorWallet.findOne({
        creator: order.seller._id
      });

    if (!wallet) {

      wallet =
        await CreatorWallet.create({

          creator: order.seller._id,

          availableBalance: 0,

          pendingBalance: 0,

          lifetimeEarnings: 0

        });

    }

    wallet.availableBalance += creatorAmount;

    wallet.lifetimeEarnings += creatorAmount;

    await wallet.save();

    await CreatorRevenue.create({

      creator: order.seller._id,

      source: REVENUE_TYPE,

      reference: order._id,

      grossAmount: gross,

      platformFee,

      creatorAmount,

      currency: order.currency || "ZAR",

      status: "completed"

    });

    return {

      success: true,

      gross,

      creatorAmount,

      platformFee

    };

  }

  async refundOrder(orderId) {

    const order =
      await MarketplaceOrder.findById(orderId);

    if (!order)
      throw new Error("Order not found");

    const gross =
      Number(order.totalAmount);

    const creatorAmount =
      gross - gross * PLATFORM_COMMISSION;

    await CreatorWallet.updateOne(

      {
        creator: order.seller
      },

      {

        $inc: {

          availableBalance: -creatorAmount,

          lifetimeEarnings: -creatorAmount

        }

      }

    );

    await CreatorRevenue.updateOne(

      {
        reference: order._id
      },

      {

        status: "refunded"

      }

    );

    return {

      success: true

    };

  }

  async calculateRevenue(orderAmount) {

    const gross =
      Number(orderAmount);

    const platformFee =
      gross * PLATFORM_COMMISSION;

    const creatorAmount =
      gross - platformFee;

    return {

      gross,

      creatorAmount,

      platformFee,

      commissionRate:
        PLATFORM_COMMISSION

    };

  }

  async creatorRevenue(creatorId) {

    return CreatorRevenue.find({

      creator: creatorId,

      source: REVENUE_TYPE

    })

    .sort({

      createdAt: -1

    });

  }

  async creatorRevenueSummary(creatorId) {

    const revenues =
      await CreatorRevenue.find({

        creator: creatorId,

        source: REVENUE_TYPE,

        status: "completed"

      });

    const gross =
      revenues.reduce(

        (sum,r)=>

          sum+r.grossAmount,

        0

      );

    const creator =
      revenues.reduce(

        (sum,r)=>

          sum+r.creatorAmount,

        0

      );

    const platform =
      revenues.reduce(

        (sum,r)=>

          sum+r.platformFee,

        0

      );

    return {

      gross,

      creator,

      platform,

      orders:
        revenues.length

    };

  }

}

module.exports =
new MarketplaceService();