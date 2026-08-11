// modules/sponsorship/sponsorship.mapper.js

const SponsorshipDTO = require("./sponsorship.dto");

/**
 * ============================================
 * SINGLE SPONSORSHIP
 * ============================================
 */
exports.toDTO = (item) => {
  if (!item) return null;

  return new SponsorshipDTO({

    id: item._id,

    title: item.title,

    description: item.description,

    campaignType: item.campaignType,

    category: item.category,

    objective: item.objective,

    visibility: item.visibility,

    status: item.status,

    budget: item.budget,

    currency: item.currency,

    remainingBudget: item.remainingBudget,

    amountSpent: item.amountSpent,

    creatorReward: item.creatorReward,

    commissionRate: item.commissionRate,

    applicationDeadline: item.applicationDeadline,

    campaignStart: item.campaignStart,

    campaignEnd: item.campaignEnd,

    targetAudience: item.targetAudience,

    requirements: item.requirements,

    hashtags: item.hashtags,

    attachments: item.attachments,

    metrics: item.metrics,

    creatorCount: item.creatorCount,

    applicationCount: item.applicationCount,

    approvedCount: item.approvedCount,

    completedCount: item.completedCount,

    rejectedCount: item.rejectedCount,

    business: item.business
      ? {
          id: item.business._id,
          businessName:
            item.business.businessName ||
            item.business.name,
          logo:
            item.business.logo,
          verified:
            item.business.verified
        }
      : null,

    createdBy: item.createdBy
      ? {
          id: item.createdBy._id,
          username:
            item.createdBy.username,
          displayName:
            item.createdBy.displayName,
          profilePicture:
            item.createdBy.profilePicture
        }
      : null,

    createdAt: item.createdAt,

    updatedAt: item.updatedAt

  });
};

/**
 * ============================================
 * LIST
 * ============================================
 */
exports.toDTOList = (items = []) =>
  items.map(exports.toDTO);

/**
 * ============================================
 * CREATOR APPLICATION
 * ============================================
 */
exports.toApplicationDTO = (application) => {

  if (!application) return null;

  return {

    id: application._id,

    sponsorship:
      application.sponsorship,

    creator: application.creator
      ? {
          id: application.creator._id,
          username:
            application.creator.username,
          displayName:
            application.creator.displayName,
          profilePicture:
            application.creator.profilePicture,
          verified:
            application.creator.verified
        }
      : null,

    proposal:
      application.proposal,

    quotedPrice:
      application.quotedPrice,

    status:
      application.status,

    submittedContent:
      application.submittedContent,

    feedback:
      application.feedback,

    paymentStatus:
      application.paymentStatus,

    paidAmount:
      application.paidAmount,

    createdAt:
      application.createdAt,

    updatedAt:
      application.updatedAt

  };

};

/**
 * ============================================
 * APPLICATION LIST
 * ============================================
 */
exports.toApplicationList = (
  applications = []
) =>
  applications.map(
    exports.toApplicationDTO
  );

/**
 * ============================================
 * ANALYTICS
 * ============================================
 */
exports.toAnalyticsDTO = (stats) => ({

  totalCampaigns:
    stats.totalCampaigns || 0,

  activeCampaigns:
    stats.activeCampaigns || 0,

  completedCampaigns:
    stats.completedCampaigns || 0,

  totalBudget:
    stats.totalBudget || 0,

  totalSpent:
    stats.totalSpent || 0,

  totalApplications:
    stats.totalApplications || 0,

  approvedCreators:
    stats.approvedCreators || 0,

  completedCreators:
    stats.completedCreators || 0,

  totalViews:
    stats.totalViews || 0,

  totalClicks:
    stats.totalClicks || 0,

  totalConversions:
    stats.totalConversions || 0,

  engagementRate:
    stats.engagementRate || 0,

  roi:
    stats.roi || 0

});