const plans = {

FREE_MEMBER: {
  name: "Free Member",
  price: 0,
  currency: "ZAR",
  billing: "monthly",
  storageGB: 2,
    maxPostsPerDay: 50,
    maxReelsPerDay: 10,
    maxStoriesPerDay: 20,
    maxPayout: 2500,
    liveQuality: "720p",
    maxFollowing: 500
},

FREE_CREATOR: {
  name: "Free Creator",
  price: 0,
  currency: "ZAR",
  billing: "monthly",
  storageGB: 10,
  maxPostsPerDay: 100,
  maxReelsPerDay: 30,
  maxStoriesPerDay: 50,
  maxPayout: 5000,
  liveQuality: "720p"
},

FREE_BUSINESS: {
  name: "Free Business",
  price: 0,
  currency: "ZAR",
  billing: "monthly",
  storageGB: 20,
  maxProducts: 100,
  employees: 1,
  branches: 1,
  liveQuality: "720p"
},

MEMBER_BASIC: {
  name: "Member Basic",
  price: 49,
  currency: "ZAR",
  billing: "monthly",
  storageGB: 10,
  maxPostsPerDay: 100,
  maxReelsPerDay: 50,
  maxStoriesPerDay: 50,
  maxPayout: 10000,
  liveQuality: "1080p",
  maxFollowing: 2500
},

MEMBER_PLUS: {
  name: "Member Plus",
  price: 99,
  currency: "ZAR",
  billing: "monthly",
   storageGB: 50,
  maxPostsPerDay: -1,
  maxReelsPerDay: -1,
  maxStoriesPerDay: -1,
  maxPayout: -1,
  liveQuality: "1080p",
  maxFollowing: -1
},

CREATOR_BASIC: {
  name: "Creator Basic",
  price: 99,
  currency: "ZAR",
  billing: "monthly",
  storageGB: 100,
  maxPostsPerDay: -1,
  maxReelsPerDay: -1,
  maxStoriesPerDay: -1,
  maxPayout: 50000,
  liveQuality: "720p"
},

CREATOR_PLUS: {
  name: "Creator Plus",
  price: 199,
  currency: "ZAR",
  billing: "monthly",
  storageGB: 500,
  maxPostsPerDay: -1,
  maxReelsPerDay: -1,
  maxStoriesPerDay: -1,
  maxPayout: -1,
  liveQuality: "1080p"
},

CREATOR_PRO: {
  name: "Creator Pro",
  price: 399,
  currency: "ZAR",
  billing: "monthly",
  storageGB: -1,
  maxPostsPerDay: -1,
  maxReelsPerDay: -1,
  maxStoriesPerDay: -1,
  maxPayout: -1,
  liveQuality: "4K"
},

BUSINESS_BASIC: {
  name: "Business Basic",
  price: 199,
  currency: "ZAR",
  billing: "monthly",
  storageGB: 200,
  maxProducts: 1000,
  employees: 5,
  branches: 1,
  liveQuality: "720p"
},

BUSINESS_PRO: {
  name: "Business Pro",
  price: 499,
  currency: "ZAR",
  billing: "monthly",
  storageGB: 1000,
  maxProducts: -1,
  employees: 50,
  branches: 10,
  liveQuality: "1080p"
},

BUSINESS_ENTERPRISE: {
  name: "Business Enterprise",
  price: 999,
  currency: "ZAR",
  billing: "monthly",
  storageGB: -1,
  maxProducts: -1,
  employees: -1,
  branches: -1,
  liveQuality: "4K"
},

// MEMBER TO CREATOR_UPGRADE: {
MEMBER_TO_CREATOR_VIP: {
  name: "Member VIP",
  price: 29,
  currency: "ZAR",
  billing: "monthly"
},
MEMBER_TO_CREATOR_VVIP: {
  name: "Member VVIP",
  price: 59,
  currency: "ZAR",
  billing: "monthly"
},

// MEMBER TO BUSINESS_UPGRADE: {
MEMBER_TO_BUSINESS_VIP: {
  name: "Member VIP",
  price: 49,
  currency: "ZAR",
  billing: "monthly"
},
MEMBER_TO_BUSINESS_VVIP: {
  name: "Member VVIP",
  price: 159,
  currency: "ZAR",
  billing: "monthly"
},

};

module.exports = plans;