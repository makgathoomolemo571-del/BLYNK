/**
 * Monetization Thresholds
 */

module.exports = {
  MINIMUM_WITHDRAWAL: 100,

  CREATOR_PROGRAM: {
    FOLLOWERS: 1000,
    POSTS: 20,
    WATCH_HOURS: 50,
    PODCAST_EPISODES: 5
  },

  SUBSCRIPTION: {
    MIN_PRICE: 29,
    MAX_PRICE: 999
  },

  MARKETPLACE: {
    COMMISSION: 0.08
  },

  CREATOR_HIRE: {
    COMMISSION: 0.10
  },

  ADS: {
    MINIMUM_VIEWS: 1000
  },

  TIPS: {
    MINIMUM: 5,
    MAXIMUM: 50000
  },

  STARS: {
    VALUE: 0.10
  }
};