const Post = require("../modules/post/post.model");
const Reel = require("../modules/reel/reel.model");
const Podcast = require("../modules/podcast/podcast.model");

const Trending = require("../modules/trending/trending.model");

async function calculateScore(item) {

  const likes = item.likes?.length || 0;
  const comments = item.comments?.length || 0;
  const shares = item.shares || 0;
  const views = item.views || 0;

  const ageHours =
    (Date.now() - new Date(item.createdAt)) / (1000 * 60 * 60);

  const recencyBoost = Math.max(0, 48 - ageHours);

  return (likes * 2) +
         (comments * 3) +
         (shares * 4) +
         (views * 1) +
         recencyBoost;
}

async function runTrendingJob() {

  try {

    const [posts, reels, podcasts] = await Promise.all([
      Post.find({ isDeleted: false }),
      Reel.find({ isDeleted: false }),
      Podcast.find({ isDeleted: false })
    ]);

    const allItems = [
      ...posts.map(i => ({ ...i._doc, type: "post" })),
      ...reels.map(i => ({ ...i._doc, type: "reel" })),
      ...podcasts.map(i => ({ ...i._doc, type: "podcast" }))
    ];

    const scored = [];

    for (let item of allItems) {
      const score = await calculateScore(item);
      scored.push({ item, score });
    }

    scored.sort((a, b) => b.score - a.score);

    const topTrending = scored.slice(0, 50);

    await Trending.deleteMany({});

    await Trending.insertMany(topTrending.map(t => ({
      itemId: t.item._id,
      type: t.item.type,
      score: t.score
    })));

    console.log("TRENDING_UPDATED");

  } catch (err) {
    console.error("TRENDING_JOB_ERROR:", err);
  }
}

module.exports = runTrendingJob;