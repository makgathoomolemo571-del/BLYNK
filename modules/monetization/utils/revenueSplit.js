/**
 * Revenue Split Engine
 */

module.exports = {

  advertisements(amount) {

    return {

      creator: Number((amount * 0.55).toFixed(2)),

      platform: Number((amount * 0.45).toFixed(2))

    };

  },

  subscriptions(amount) {

    return {

      creator: Number((amount * 0.90).toFixed(2)),

      platform: Number((amount * 0.10).toFixed(2))

    };

  },

  marketplace(amount) {

    return {

      creator: Number((amount * 0.92).toFixed(2)),

      platform: Number((amount * 0.08).toFixed(2))

    };

  },

  creatorHire(amount) {

    return {

      creator: Number((amount * 0.90).toFixed(2)),

      platform: Number((amount * 0.10).toFixed(2))

    };

  },

  stars(amount) {

    return {

      creator: Number((amount * 0.70).toFixed(2)),

      platform: Number((amount * 0.30).toFixed(2))

    };

  },

  gifts(amount) {

    return {

      creator: Number((amount * 0.80).toFixed(2)),

      platform: Number((amount * 0.20).toFixed(2))

    };

  },

  tips(amount) {

    return {

      creator: Number(amount.toFixed(2)),

      platform: 0

    };

  }

};