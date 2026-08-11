const subscriptionRules = {

  FREE_MEMBER: {
    displayName: "Free Member",
    role: "member",

    limits: {
      postsPerDay: 10,
      reelsPerDay: 5,
      storiesPerDay: 20,
      podcasts: 0,
      episodesPerMonth: 0,
      watchParties: 0,
      marketplaceListings: 0,
      creatorHireApplications: 5,
      businessFindApplications: 2,
      savedItems: 500,
      friends: -1,
      followers: -1,
      following: -1
    },

    features: {
      wallet: true,
      vigRewards: true,
      voucherRedemption: true,
      creatorStudio: false,
      analytics: false,
      verification: false,
      liveStreaming: false,
      prioritySupport: false,
      cashWithdrawal: false,
      creatorProfile: false,
      businessProfile: false
    }
  },

  FREE_CREATOR: {
    displayName: "Free Creator",
    role: "creator",

    limits: {
      postsPerDay: 20,
      reelsPerDay: 20,
      storiesPerDay: 50,
      podcasts: 2,
      episodesPerMonth: 20,
      watchParties: 2,
      marketplaceListings: 5,
      creatorHireApplications: -1,
      businessFindApplications: 5,
      savedItems: 1000,
      friends: -1,
      followers: -1,
      following: -1
    },

    features: {
      wallet: true,
      vigRewards: true,
      voucherRedemption: true,
      creatorStudio: true,
      analytics: false,
      verification: false,
      liveStreaming: false,
      prioritySupport: false,
      cashWithdrawal: false,
      creatorProfile: true,
      businessProfile: false
    }
  },

  FREE_BUSINESS: {
    displayName: "Free Business",
    role: "business",

    limits: {
      marketplaceListings: 10,
      campaigns: 2,
      jobs: 2,
      savedItems: 1000
    },

    features: {
      wallet: true,
      vigRewards: true,
      voucherRedemption: true,
      creatorStudio: false,
      analytics: false,
      verification: false,
      liveStreaming: false,
      prioritySupport: false,
      cashWithdrawal: false,
      creatorProfile: false,
      businessProfile: true
    }
  },

  MEMBER_BASIC: {
    displayName: "Member Basic",
    role: "member",

    limits: {
      postsPerDay: -1,
      reelsPerDay: 20,
      storiesPerDay: 100,
      podcasts: 5,
      episodesPerMonth: 30,
      watchParties: 5,
      marketplaceListings: 5,
      creatorHireApplications: 20,
      businessFindApplications: 10,
      savedItems: 3000,
      friends: -1,
      followers: -1,
      following: -1
    },

    features: {
      wallet: true,
      vigRewards: true,
      voucherRedemption: true,
      creatorStudio: false,
      analytics: true,
      verification: false,
      liveStreaming: false,
      prioritySupport: false,
      cashWithdrawal: false,
      creatorProfile: false,
      businessProfile: false
    }
  },

  MEMBER_PLUS: {
    displayName: "Member Plus",
    role: "member",

    limits: {
      postsPerDay: -1,
      reelsPerDay: -1,
      storiesPerDay: -1,
      podcasts: -1,
      episodesPerMonth: -1,
      watchParties: -1,
      marketplaceListings: 20,
      creatorHireApplications: -1,
      businessFindApplications: -1,
      savedItems: -1,
      friends: -1,
      followers: -1,
      following: -1
    },

    features: {
      wallet: true,
      vigRewards: true,
      voucherRedemption: true,
      creatorStudio: false,
      analytics: true,
      verification: true,
      liveStreaming: true,
      prioritySupport: true,
      cashWithdrawal: false,
      creatorProfile: false,
      businessProfile: false
    }
  },

  CREATOR_BASIC: {
    displayName: "Creator Basic",
    role: "creator",

    limits: {
      postsPerDay: -1,
      reelsPerDay: -1,
      storiesPerDay: -1,
      podcasts: 20,
      episodesPerMonth: 100,
      watchParties: 20,
      marketplaceListings: 30,
      creatorHireApplications: -1,
      businessFindApplications: -1,
      savedItems: -1
    },

    features: {
      wallet: true,
      vigRewards: true,
      voucherRedemption: true,
      creatorStudio: true,
      analytics: true,
      verification: true,
      liveStreaming: true,
      prioritySupport: false,
      cashWithdrawal: false,
      creatorProfile: true,
      businessProfile: false
    }
  },

  CREATOR_PLUS: {
    displayName: "Creator Plus",
    role: "creator",

    limits: {
      postsPerDay: -1,
      reelsPerDay: -1,
      storiesPerDay: -1,
      podcasts: -1,
      episodesPerMonth: -1,
      watchParties: -1,
      marketplaceListings: -1,
      creatorHireApplications: -1,
      businessFindApplications: -1,
      savedItems: -1
    },

    features: {
      wallet: true,
      vigRewards: true,
      voucherRedemption: true,
      creatorStudio: true,
      analytics: true,
      verification: true,
      liveStreaming: true,
      prioritySupport: true,
      cashWithdrawal: false,
      creatorProfile: true,
      businessProfile: false
    }
  },

  CREATOR_PRO: {
    displayName: "Creator Pro",
    role: "creator",

    limits: {
      postsPerDay: -1,
      reelsPerDay: -1,
      storiesPerDay: -1,
      podcasts: -1,
      episodesPerMonth: -1,
      watchParties: -1,
      marketplaceListings: -1,
      creatorHireApplications: -1,
      businessFindApplications: -1,
      savedItems: -1
    },

    features: {
      wallet: true,
      vigRewards: true,
      voucherRedemption: true,
      creatorStudio: true,
      analytics: true,
      verification: true,
      liveStreaming: true,
      prioritySupport: true,
      cashWithdrawal: true,
      creatorProfile: true,
      businessProfile: false
    }
  },

  BUSINESS_BASIC: {
    displayName: "Business Basic",
    role: "business",

    limits: {
      marketplaceListings: 100,
      campaigns: 20,
      jobs: 20
    },

    features: {
      wallet: true,
      analytics: true,
      verification: true,
      liveStreaming: false,
      prioritySupport: false,
      cashWithdrawal: true,
      businessProfile: true
    }
  },

  BUSINESS_PRO: {
    displayName: "Business Pro",
    role: "business",

    limits: {
      marketplaceListings: -1,
      campaigns: -1,
      jobs: -1
    },

    features: {
      wallet: true,
      analytics: true,
      verification: true,
      liveStreaming: true,
      prioritySupport: true,
      cashWithdrawal: true,
      businessProfile: true
    }
  },

  BUSINESS_ENTERPRISE: {
    displayName: "Business Enterprise",
    role: "business",

    limits: {
      marketplaceListings: -1,
      campaigns: -1,
      jobs: -1
    },

    features: {
      wallet: true,
      analytics: true,
      verification: true,
      liveStreaming: true,
      prioritySupport: true,
      cashWithdrawal: true,
      businessProfile: true,
      dedicatedManager: true,
      apiAccess: true,
      whiteLabel: true
    }
  },

  MEMBER_TO_CREATOR_VIP: {
    displayName: "Creator VIP Upgrade",
    role: "creator",
    upgradeOnly: true,
    features: {
      creatorStudio: true,
      verification: true
    }
  },

  MEMBER_TO_CREATOR_VVIP: {
    displayName: "Creator VVIP Upgrade",
    role: "creator",
    upgradeOnly: true,
    features: {
      creatorStudio: true,
      analytics: true,
      verification: true,
      liveStreaming: true
    }
  },

  MEMBER_TO_BUSINESS_VIP: {
    displayName: "Business VIP Upgrade",
    role: "business",
    upgradeOnly: true,
    features: {
      businessProfile: true,
      analytics: true
    }
  },

  MEMBER_TO_BUSINESS_VVIP: {
    displayName: "Business VVIP Upgrade",
    role: "business",
    upgradeOnly: true,
    features: {
      businessProfile: true,
      analytics: true,
      verification: true,
      prioritySupport: true
    }
  }

};

export default subscriptionRules;