module.exports = {

  baseUrl: process.env.PEACH_BASE_URL,

  entityId: process.env.PEACH_ENTITY_ID,

  accessToken: process.env.PEACH_ACCESS_TOKEN,

  currency: "ZAR",

  testMode: process.env.PEACH_TEST_MODE === "true",

  checkoutUrl: process.env.PEACH_CHECKOUT_URL

};