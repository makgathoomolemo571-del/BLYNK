const User = require("../user/user.model");
const Post = require("../post/post.model");
const Reel = require("../reel/reel.model");
const Podcast = require("../podcast/podcast.model");

const SearchHistory =
require("./search.model"); 

const Marketplace =
require("../marketplace/marketplace.model");

const CreatorHire =
require("../creatorHire/creatorHire.model");

const BusinessFind =
require("../businessFind/businessFind.model");

const mapper =
require("./search.mapper");

exports.search =
async (q, type = "all") => {

  const regex =
  new RegExp(q, "i");

  const result = {

    users: [],
    creators: [],
    businesses: [],

    posts: [],
    reels: [],
    podcasts: [],

    marketplace: [],
    creatorHires: [],
    businessFinds: []
  };

  if (
    type === "all" ||
    type === "users"
  ) {

    const users =
    await User.find({
      username: regex,
      isDeleted: false
    })
    .limit(20);

    result.users = users;
  }

  if (
    type === "all" ||
    type === "creators"
  ) {

    const creators =
    await User.find({
      accountType: "creator",
      username: regex,
      isDeleted: false
    })
    .limit(20);

    result.creators =
    creators;
  }

  if (
    type === "all" ||
    type === "businesses"
  ) {

    const businesses =
    await User.find({
      accountType: "business",
      username: regex,
      isDeleted: false
    })
    .limit(20);

    result.businesses =
    businesses;
  }

  if (
    type === "all" ||
    type === "posts"
  ) {

    result.posts =
    await Post.find({
      caption: regex,
      isDeleted: false
    })
    .limit(20);
  }

  if (
    type === "all" ||
    type === "reels"
  ) {

    result.reels =
    await Reel.find({
      caption: regex,
      isDeleted: false
    })
    .limit(20);
  }

  if (
    type === "all" ||
    type === "podcasts"
  ) {

    result.podcasts =
    await Podcast.find({
      title: regex,
      isDeleted: false
    })
    .limit(20);
  }

  if (
    type === "all" ||
    type === "marketplace"
  ) {

    result.marketplace =
    await Marketplace.find({
      title: regex,
      isDeleted: false
    })
    .limit(20);
  }

  if (
    type === "all" ||
    type === "creatorHires"
  ) {

    result.creatorHires =
    await CreatorHire.find({
      projectTitle: regex,
      isDeleted: false
    })
    .limit(20);
  }

  if (
    type === "all" ||
    type === "businessFinds"
  ) {

    result.businessFinds =
    await BusinessFind.find({
      campaignName: regex,
      isDeleted: false
    })
    .limit(20);
  }

  return mapper.toDTO(result);
};

exports.stats = async () => {

  const totalSearches =
    await SearchHistory.countDocuments();

  const uniqueUsers =
    await SearchHistory.distinct("user");

  const topQueries =
    await SearchHistory.aggregate([
      {
        $group: {
          _id: "$query",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

  return {

    totalSearches,
    uniqueUsers: uniqueUsers.length,
    topQueries

  };

};