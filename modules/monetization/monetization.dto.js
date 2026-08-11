module.exports = class MonetizationDTO {
  constructor(data = {}) {
    this.id = data.id;

    this.creator = data.creator;

    this.status = data.status;

    this.currency = data.currency;

    this.wallet = {
      available: data.wallet?.available ?? 0,
      pending: data.wallet?.pending ?? 0,
      processing: data.wallet?.processing ?? 0,
      lifetime: data.wallet?.lifetime ?? 0
    };

    this.revenue = {
      ads: data.revenue?.ads ?? 0,
      subscriptions: data.revenue?.subscriptions ?? 0,
      tips: data.revenue?.tips ?? 0,
      gifts: data.revenue?.gifts ?? 0,
      marketplace: data.revenue?.marketplace ?? 0,
      creatorHire: data.revenue?.creatorHire ?? 0,
      affiliate: data.revenue?.affiliate ?? 0,
      podcasts: data.revenue?.podcasts ?? 0,
      watchParties: data.revenue?.watchParties ?? 0,
      liveStreams: data.revenue?.liveStreams ?? 0,
      sponsors: data.revenue?.sponsors ?? 0,
      creatorFund: data.revenue?.creatorFund ?? 0,
      total: data.revenue?.total ?? 0
    };

    this.statistics = {
      subscribers: data.statistics?.subscribers ?? 0,
      followers: data.statistics?.followers ?? 0,
      impressions: data.statistics?.impressions ?? 0,
      views: data.statistics?.views ?? 0,
      engagement: data.statistics?.engagement ?? 0,
      watchHours: data.statistics?.watchHours ?? 0
    };

    this.payout = {
      minimumThreshold:
        data.payout?.minimumThreshold ?? 100,
      nextPayoutDate:
        data.payout?.nextPayoutDate ?? null,
      bankVerified:
        data.payout?.bankVerified ?? false,
      kycVerified:
        data.payout?.kycVerified ?? false
    };

    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
};