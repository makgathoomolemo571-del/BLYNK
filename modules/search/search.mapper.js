const SearchDTO = require("./search.dto");

exports.toDTO = (data) =>
  new SearchDTO({
    users: data.users || [],
    creators: data.creators || [],
    businesses: data.businesses || [],
    posts: data.posts || [],
    reels: data.reels || [],
    podcasts: data.podcasts || [],
    marketplace: data.marketplace || [],
    creatorHires: data.creatorHires || [],
    businessFinds: data.businessFinds || []
  });