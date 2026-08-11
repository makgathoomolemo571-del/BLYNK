// src/modules/monetization/validators/monetization.validator.js

const Joi = require("joi");

/*
|--------------------------------------------------------------------------
| Common
|--------------------------------------------------------------------------
*/

const objectId = Joi.string()
  .length(24)
  .hex();

const currency = Joi.string()
  .valid(
    "ZAR",
    "USD",
    "EUR",
    "GBP"
  )
  .default("ZAR");

/*
|--------------------------------------------------------------------------
| Creator Monetization Settings
|--------------------------------------------------------------------------
*/

exports.settings = Joi.object({

  adsEnabled: Joi.boolean(),

  subscriptionsEnabled: Joi.boolean(),

  tipsEnabled: Joi.boolean(),

  giftsEnabled: Joi.boolean(),

  affiliateEnabled: Joi.boolean(),

  sponsorshipEnabled: Joi.boolean(),

  marketplaceEnabled: Joi.boolean(),

  minimumSubscriptionPrice:
    Joi.number()
      .min(1)
      .max(100000),

  currency

});

/*
|--------------------------------------------------------------------------
| Withdraw
|--------------------------------------------------------------------------
*/

exports.withdraw = Joi.object({

  amount: Joi.number()
    .positive()
    .required(),

  currency,

  method: Joi.string()
    .valid(
      "BANK",
      "PAYPAL",
      "PAYSTACK",
      "PEACH",
      "STRIPE"
    )
    .required()

});

/*
|--------------------------------------------------------------------------
| Tip Creator
|--------------------------------------------------------------------------
*/

exports.tip = Joi.object({

  creatorId: objectId.required(),

  amount: Joi.number()
    .positive()
    .required(),

  currency,

  message: Joi.string()
    .allow("")
    .max(300)

});

/*
|--------------------------------------------------------------------------
| Buy Stars
|--------------------------------------------------------------------------
*/

exports.buyStars = Joi.object({

  stars: Joi.number()
    .integer()
    .min(1)
    .required()

});

/*
|--------------------------------------------------------------------------
| Send Gift
|--------------------------------------------------------------------------
*/

exports.sendGift = Joi.object({

  creatorId: objectId.required(),

  giftId: objectId.required(),

  quantity: Joi.number()
    .integer()
    .min(1)
    .default(1)

});

/*
|--------------------------------------------------------------------------
| Subscription
|--------------------------------------------------------------------------
*/

exports.subscribe = Joi.object({

  creatorId: objectId.required(),

  tier: Joi.string()
    .valid(
      "basic",
      "silver",
      "gold",
      "platinum"
    )
    .required()

});

/*
|--------------------------------------------------------------------------
| Affiliate
|--------------------------------------------------------------------------
*/

exports.affiliate = Joi.object({

  campaignId: objectId.required(),

  productId: objectId.required()

});

/*
|--------------------------------------------------------------------------
| Sponsorship
|--------------------------------------------------------------------------
*/

exports.sponsorship = Joi.object({

  creatorId: objectId.required(),

  campaignTitle: Joi.string()
    .min(3)
    .max(150)
    .required(),

  description: Joi.string()
    .allow("")
    .max(2000),

  budget: Joi.number()
    .positive()
    .required(),

  currency

});

/*
|--------------------------------------------------------------------------
| Membership Tier
|--------------------------------------------------------------------------
*/

exports.membership = Joi.object({

  title: Joi.string()
    .min(3)
    .max(100)
    .required(),

  description: Joi.string()
    .allow("")
    .max(1000),

  price: Joi.number()
    .positive()
    .required(),

  currency,

  benefits: Joi.array()
    .items(
      Joi.string().max(200)
    )
    .default([])

});

/*
|--------------------------------------------------------------------------
| Tax Details
|--------------------------------------------------------------------------
*/

exports.tax = Joi.object({

  country: Joi.string()
    .required(),

  taxNumber: Joi.string()
    .required(),

  registeredBusiness:
    Joi.boolean()
      .default(false)

});

/*
|--------------------------------------------------------------------------
| Revenue Filter
|--------------------------------------------------------------------------
*/

exports.revenueFilter = Joi.object({

  startDate: Joi.date(),

  endDate: Joi.date(),

  source: Joi.string().valid(
    "ads",
    "subscriptions",
    "tips",
    "gifts",
    "marketplace",
    "affiliate",
    "sponsorship",
    "creator_hire",
    "watch_party",
    "podcast",
    "reels",
    "posts",
    "stories"
  )

});