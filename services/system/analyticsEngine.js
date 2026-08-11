const Post = require("../post/post.model");
const Reel = require("../reel/reel.model");
const Podcast = require("../podcast/podcast.model");
const User = require("../user/user.model");
const Wallet = require("../wallet/wallet.model");

const analyticsEngine = {

  async platform() {

    const [
      users,
      posts,
      reels,
      podcasts,
      wallets
    ] = await Promise.all([

      User.countDocuments(),
      Post.countDocuments(),
      Reel.countDocuments(),
      Podcast.countDocuments(),
      Wallet.countDocuments()

    ]);

    return {

      users,
      posts,
      reels,
      podcasts,
      wallets

    };

  },

  async engagement() {

    const posts = await Post.aggregate([
      {
        $group: {
          _id: null,
          likes: { $sum: "$likesCount" },
          comments: { $sum: "$commentsCount" },
          shares: { $sum: "$sharesCount" },
          views: { $sum: "$views" }
        }
      }
    ]);

    return posts[0] || {
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0
    };

  }

};

module.exports = analyticsEngine;