const Post = require("../post/post.model");
const Reel = require("../reel/reel.model");
const Podcast = require("../podcast/podcast.model");

const calculateScore = (item) => {

  return (
    (item.likes || 0) * 3 +
    (item.comments || 0) * 5 +
    (item.shares || 0) * 7 +
    (item.views || 0) * 1 +
    (item.createdAt ? new Date(item.createdAt).getTime() / 1000000000 : 0)
  );

};

const trendingEngine = {

  async posts() {

    const posts = await Post.find({ isDeleted: false });

    return posts
      .map(p => ({
        ...p.toObject(),
        score: calculateScore(p)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

  },

  async reels() {

    const reels = await Reel.find({ isDeleted: false });

    return reels
      .map(r => ({
        ...r.toObject(),
        score: calculateScore(r)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

  },

  async podcasts() {

    const podcasts = await Podcast.find({ isDeleted: false });

    return podcasts
      .map(p => ({
        ...p.toObject(),
        score: calculateScore(p)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

  }

};

module.exports = trendingEngine;