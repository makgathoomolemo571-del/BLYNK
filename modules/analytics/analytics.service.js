const Analytics =
require("./analytics.model");

const mapper =
require("./analytics.mapper");

const User = require("../user/user.model");
const Post = require("../post/post.model");
const Reel = require("../reel/reel.model");
const Story = require("../story/story.model");
const Podcast = require("../podcast/podcast.model");
const Verification = require("../verification/verification.model");
const Wallet = require("../wallet/wallet.model");


exports.track =
async (
userId,
data
)=>{

const event =
await Analytics.create({

actor:userId,

eventType:
data.eventType,

targetId:
data.targetId,

targetType:
data.targetType,

metadata:
data.metadata || {}

});

return mapper.toDTO(
event
);

};

exports.getUserAnalytics =
async (userId)=>{

const totalViews =
await Analytics.countDocuments({

targetId:userId,

eventType:{
$in:[
"PROFILE_VIEWED",
"CREATOR_PROFILE_VIEWED",
"BUSINESS_PROFILE_VIEWED"
]
}

});

return {

profileViews:
totalViews

};

};

exports.getCreatorAnalytics =
async (creatorId)=>{

const reelViews =
await Analytics.countDocuments({

targetId:creatorId,

eventType:
"REEL_VIEWED"

});

const podcastPlays =
await Analytics.countDocuments({

targetId:creatorId,

eventType:
"PODCAST_PLAYED"

});

return {

reelViews,

podcastPlays

};

};

exports.getPlatformAnalytics =
async ()=>{

const totalEvents =
await Analytics.countDocuments();

return {

totalEvents

};

};

exports.stats = async () => {

    const [
        totalUsers,
        creators,
        businesses,
        admins,

        totalPosts,
        totalReels,
        totalStories,
        totalPodcasts,

        pendingVerification,
        approvedVerification,
        rejectedVerification,

        totalWallets,

        totalEvents,
        today,
        thisWeek

    ] = await Promise.all([

        User.countDocuments(),
        User.countDocuments({ role: "creator" }),
        User.countDocuments({ role: "business" }),
        User.countDocuments({ role: "admin" }),

        Post.countDocuments(),
        Reel.countDocuments(),
        Story.countDocuments(),
        Podcast.countDocuments(),

        Verification.countDocuments({ status: "pending" }),
        Verification.countDocuments({ status: "approved" }),
        Verification.countDocuments({ status: "rejected" }),

        Wallet.countDocuments(),

        Analytics.countDocuments(),

        Analytics.countDocuments({
            createdAt: {
                $gte: new Date().setHours(0,0,0,0)
            }
        }),

        Analytics.countDocuments({
            createdAt:{
                $gte:new Date(Date.now()-7*24*60*60*1000)
            }
        })

    ]);

    return {

        users:{
            total:totalUsers,
            creators,
            businesses,
            admins
        },

        content:{
            posts:totalPosts,
            reels:totalReels,
            stories:totalStories,
            podcasts:totalPodcasts
        },

        verification:{
            pending:pendingVerification,
            approved:approvedVerification,
            rejected:rejectedVerification
        },

        wallets:{
            total:totalWallets
        },

        analytics:{
            totalEvents,
            today,
            thisWeek
        }

    };

};