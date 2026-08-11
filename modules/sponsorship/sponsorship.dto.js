// modules/sponsorship/sponsorship.dto.js

class SponsorshipDTO {
  constructor(data = {}) {
    this.id = data._id || data.id;

    this.campaignName = data.campaignName;
    this.campaignCode = data.campaignCode;

    this.business = data.business
      ? {
          id: data.business._id || data.business.id,
          name:
            data.business.businessName ||
            data.business.displayName ||
            data.business.name,
          logo:
            data.business.logo ||
            data.business.profilePicture
        }
      : null;

    this.creator = data.creator
      ? {
          id: data.creator._id || data.creator.id,
          username: data.creator.username,
          displayName: data.creator.displayName,
          avatar: data.creator.profilePicture
        }
      : null;

    this.title = data.title;

    this.description = data.description;

    this.category = data.category;

    this.platforms = data.platforms || [];

    this.contentType = data.contentType;

    this.deliverables = data.deliverables || [];

    this.requirements = data.requirements || [];

    this.targetAudience =
      data.targetAudience || {};

    this.budget = {
      amount:
        data.budget?.amount || 0,

      currency:
        data.budget?.currency || "ZAR",

      type:
        data.budget?.type || "fixed"
    };

    this.payment = {
      upfront:
        data.payment?.upfront || 0,

      remaining:
        data.payment?.remaining || 0,

      milestone:
        data.payment?.milestone || false,

      payoutStatus:
        data.payment?.payoutStatus || "pending"
    };

    this.application = {
      total:
        data.application?.total || 0,

      accepted:
        data.application?.accepted || 0,

      rejected:
        data.application?.rejected || 0
    };

    this.status = data.status;

    this.visibility = data.visibility;

    this.startDate = data.startDate;

    this.endDate = data.endDate;

    this.deadline = data.deadline;

    this.location = data.location;

    this.contract = {
      signed:
        data.contract?.signed || false,

      url:
        data.contract?.url || null
    };

    this.analytics = {
      impressions:
        data.analytics?.impressions || 0,

      reach:
        data.analytics?.reach || 0,

      clicks:
        data.analytics?.clicks || 0,

      conversions:
        data.analytics?.conversions || 0,

      engagement:
        data.analytics?.engagement || 0,

      roi:
        data.analytics?.roi || 0
    };

    this.createdAt = data.createdAt;

    this.updatedAt = data.updatedAt;
  }
}

module.exports = SponsorshipDTO;