const Model =
require("./businessFind.model");
const BusinessFind = require("./businessFind.model");
const mapper =
require("./businessFind.mapper");
const Application = require("../application/application.model");
const applicationMapper = require("../application/application.mapper");

const eventBus =
require("../../shared/eventBus");

const EVENTS =
require("./businessFind.events");

exports.create =
async (
userId,
data
)=>{

const item =
await Model.create({

business:userId,

...data

});

eventBus.emit(
EVENTS.BUSINESS_FIND_CREATED,
{
businessFindId:
item._id
}
);

return mapper.toDTO(item);
};

exports.getAll = async () => {
  const campaigns = await BusinessFind.find({
    isDeleted: false,
    status: "open"
  })
    .sort({ createdAt: -1 });

  return campaigns.map(mapper.toDTO);
};

exports.getStats = async (userId) => {

    const campaigns = await BusinessFind.find({
        business: userId,
        isDeleted: false,
    });

    return {
        totalCampaigns: campaigns.length,

        activeCampaigns: campaigns.filter(
            c => c.status === "open"
        ).length,

        totalApplications: campaigns.reduce(
            (total, campaign) =>
                total + (campaign.applications?.length || 0),
            0
        ),
    };
};

exports.getMyCampaigns =
async (userId)=>{

const campaigns =
await Model.find({

business:userId,

isDeleted:false

});

return campaigns.map(
mapper.toDTO
);
};

exports.getById =
async (id)=>{

const campaign =
await Model.findOne({

_id:id,

isDeleted:false

});

if(!campaign)
throw new Error(
"Campaign not found"
);

return mapper.toDTO(
campaign
);
};

exports.apply =
async (
campaignId,
userId,
data
)=>{

const campaign =
await Model.findById(
campaignId
);

if(!campaign)
throw new Error(
"Campaign not found"
);

campaign.applications.push({

creator:userId,

proposal:
data.proposal,

contentStrategy:
data.contentStrategy,

deliverables:
data.deliverables,

fixedFee:
data.fixedFee,

revenueShare:
data.revenueShare,

sponsorshipDetails:
data.sponsorshipDetails,

portfolio:
data.portfolio
});

await campaign.save();

eventBus.emit(
EVENTS.BUSINESS_FIND_APPLIED,
{
campaignId,
userId
}
);

return {
success:true
};
};

exports.updateStatus =
async (
campaignId,
userId,
status
)=>{

const campaign =
await Model.findOne({

_id:campaignId,

business:userId

});

if(!campaign)
throw new Error(
"Campaign not found"
);

campaign.status =
status;

await campaign.save();

eventBus.emit(
EVENTS.BUSINESS_FIND_UPDATED,
{
campaignId,
status
}
);

return mapper.toDTO(
campaign
);
};

exports.delete =
async (
campaignId,
userId
)=>{

const campaign =
await Model.findOne({

_id:campaignId,

business:userId

});

if(!campaign)
throw new Error(
"Campaign not found"
);

campaign.isDeleted =
true;

campaign.deletedAt =
new Date();

await campaign.save();

eventBus.emit(
EVENTS.BUSINESS_FIND_DELETED,
{
campaignId
}
);

return {
success:true
};
};

exports.stats = async () => {

  const totalCampaigns =
    await Model.countDocuments({ isDeleted: false });

  const totalApplications =
    await Model.aggregate([
      { $match: { isDeleted: false } },
      { $project: { applications: 1 } }
    ]);

  const applications =
    totalApplications.reduce(
      (sum, c) => sum + (c.applications?.length || 0),
      0
    );

  const activeCampaigns =
    await Model.countDocuments({
      isDeleted: false,
      status: "active"
    });

  return {
    totalCampaigns,
    activeCampaigns,
    totalApplications: applications
  };

};

exports.getApplications = async (campaignId) => {

  const applications = await Application.find({
    targetId: campaignId,
    targetType: "BUSINESS_FIND",
    isDeleted: false
  })
  .populate("applicant");

  console.log("RAW APPLICATIONS:", applications);

  const dto = applications.map(applicationMapper.toDTO);

  console.log("DTO:", dto);

  return dto;
};