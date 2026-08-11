const mongoose = require("mongoose");

const Sponsorship =
require("./sponsorship.model");
const {
sendNotification
}
=
require("../notification/notification.helper");

const Wallet =
require("../wallet/wallet.model");

const Revenue =
require("../revenue/revenue.model");

const Transaction =
require("../wallet/transaction.model");

/*
=================================================
CREATE SPONSORSHIP
=================================================
*/

exports.create = async (businessId, payload) => {

    console.log(payload);
await sendNotification({

recipient:
payload.creator,

actor:
businessId,

type:
"SPONSORSHIP",

title:
"New Sponsorship Opportunity",

message:
"A business created a sponsorship campaign for you",

entityType:
"SPONSORSHIP",

entityId:
sponsorship._id

});
    return await Sponsorship.create({

        sponsorshipId: "SPO-" + Date.now(),

        business: businessId,

        creator: payload.creator,

        title: payload.title,

        description: payload.description,

        category: payload.category,

        budget: payload.budget,

        currency: payload.currency || "ZAR",

        paymentType: payload.paymentType,

        startDate: payload.startDate || null,

        endDate: payload.endDate || null,

        deliverables: payload.deliverables.join(", "),

        hashtags: payload.hashtags || [],

        status: "requested"


        
    });



};

exports.getMine = async (businessId) => {
    return Sponsorship.find({
        business: businessId,
        isDeleted: false
    })
    .sort({ createdAt: -1 });
};

/*
=================================================
GET ALL ACTIVE SPONSORSHIPS
=================================================
*/

exports.getAll = async (query = {}) => {

    const filter = {
        isDeleted: false
    };


    if(query.status){
        filter.status = query.status;
    }


    if(query.category){
        filter.category = query.category;
    }


    return await Sponsorship
        .find(filter)
        .populate(
            "business",
            "businessName username logo"
        )
        .populate(
            "creator",
            "username profilePicture"
        )
        .sort({
            createdAt:-1
        });

};



exports.apply = async (sponsorshipId, creatorId, data) => {

    const sponsorship = await Sponsorship.findById(sponsorshipId);

    if (!sponsorship)
        throw new Error("Sponsorship not found");

    const exists = await Application.findOne({
        targetType: "SPONSORSHIP",
        targetId: sponsorshipId,
        applicant: creatorId,
        isDeleted: false
    });

    if (exists)
        throw new Error("Already applied");

    const application = await Application.create({

        applicant: creatorId,

        targetType: "SPONSORSHIP",

        targetId: sponsorshipId,

        proposal: data.proposal,

        message: data.message,

        deliverables: data.deliverables,

        proposedPrice: data.proposedPrice,

        portfolioLinks: data.portfolioLinks || [],

        attachments: data.attachments || []

    });

    return application;
};

const Application = require("../application/application.model");

exports.getApplications = async (sponsorshipId, businessId) => {

    const sponsorship = await Sponsorship.findOne({
        _id: sponsorshipId,
        business: businessId,
        isDeleted: false
    });

    if (!sponsorship)
        throw new Error("Sponsorship not found");

    return await Application.find({
        targetType: "SPONSORSHIP",
        targetId: sponsorshipId,
        isDeleted: false
    })
    .populate("applicant")
    .sort({ createdAt: -1 });

};

exports.acceptApplication = async (
    sponsorshipId,
    applicationId,
    businessId
) => {

    const sponsorship = await Sponsorship.findOne({
        _id: sponsorshipId,
        business: businessId
    });

    if (!sponsorship)
        throw new Error("Sponsorship not found");

    const application = await Application.findById(applicationId);

    if (!application)
        throw new Error("Application not found");

    application.status = "accepted";

    await application.save();

    sponsorship.creator = application.applicant;
    sponsorship.status = "accepted";

    await sponsorship.save();

    return application;

};

exports.rejectApplication = async (
    sponsorshipId,
    applicationId,
    businessId
) => {

    const sponsorship = await Sponsorship.findOne({
        _id: sponsorshipId,
        business: businessId
    });

    if (!sponsorship)
        throw new Error("Sponsorship not found");

    const application = await Application.findById(applicationId);

    if (!application)
        throw new Error("Application not found");

    application.status = "rejected";

    await application.save();

    return application;

};

/*
=================================================
GET BUSINESS SPONSORSHIPS
=================================================
*/

exports.getBusinessSponsors =
async businessId=>{

return Sponsorship
.find({
business:businessId
})
.populate("creator","username profilePicture")
.sort("-createdAt");

};

/*
=================================================
GET CREATOR SPONSORSHIPS
=================================================
*/

exports.getCreatorSponsors =
async creatorId=>{

return Sponsorship
.find({
creator:creatorId
})
.populate("business","businessName logo")
.sort("-createdAt");

};

/*
=================================================
GET SINGLE
=================================================
*/

exports.getById =
async id=>{

return Sponsorship
.findById(id)
.populate("creator")
.populate("business");

};

/*
=================================================
ACCEPT
=================================================
*/

exports.accept =
async(id,userId)=>{

const sponsorship =
await Sponsorship.findById(id);

if(!sponsorship)
throw new Error(
"Sponsorship not found"
);

if(
sponsorship.creator.toString()
!==userId.toString()
){
throw new Error(
"Not allowed"
);
}

sponsorship.status="accepted";

await sponsorship.save();

return sponsorship;

};

/*
=================================================
REJECT
=================================================
*/

exports.reject =
async(id,userId)=>{

const sponsorship =
await Sponsorship.findById(id);

if(!sponsorship)
throw new Error(
"Sponsorship not found"
);

if(
sponsorship.creator.toString()
!==userId.toString()
){
throw new Error(
"Not allowed"
);
}

sponsorship.status="rejected";

await sponsorship.save();

return sponsorship;

};

/*
=================================================
MARK COMPLETED
=================================================
*/

exports.complete =
async(id,businessId)=>{

const sponsorship =
await Sponsorship.findById(id);

if(!sponsorship)
throw new Error(
"Sponsorship not found"
);

if(
sponsorship.business.toString()
!==businessId.toString()
){
throw new Error(
"Not allowed"
);
}

sponsorship.status="completed";

await sponsorship.save();

return sponsorship;

};

/*
=================================================
PAY CREATOR
=================================================
*/

exports.pay =
async(id,businessId)=>{

const session =
await mongoose.startSession();

session.startTransaction();

try{

const sponsorship =
await Sponsorship.findById(id)
.session(session);

if(!sponsorship)
throw new Error(
"Sponsorship not found"
);

if(
sponsorship.business.toString()
!==businessId.toString()
){
throw new Error(
"Unauthorized"
);
}

if(
sponsorship.paymentStatus==="paid"
){
throw new Error(
"Already paid"
);
}

const creatorWallet =
await Wallet.findOne({
user:sponsorship.creator
}).session(session);

if(!creatorWallet)
throw new Error(
"Creator wallet missing"
);

creatorWallet.balance+=
sponsorship.amount;

creatorWallet.totalRevenue+=
sponsorship.amount;

creatorWallet.lastTransactionAt=
new Date();

await creatorWallet.save({
session
});

await Revenue.create([{

user:sponsorship.creator,

source:"sponsorship",

amount:sponsorship.amount,

currency:sponsorship.currency,

status:"paid",

referenceId:sponsorship._id,

description:
`Sponsorship payment`

}],{session});

await Transaction.create([{

transactionId:
`SP-${Date.now()}`,

wallet:creatorWallet._id,

user:sponsorship.creator,

type:"credit",

amount:sponsorship.amount,

currency:sponsorship.currency,

status:"completed",

reference:
sponsorship._id,

description:
"Sponsorship income"

}],{session});

sponsorship.paymentStatus=
"paid";

sponsorship.paidAt=
new Date();

await sponsorship.save({
session
});

await session.commitTransaction();

return sponsorship;

}catch(err){

await session.abortTransaction();

throw err;

}finally{

session.endSession();

}

};

/*
=================================================
DELETE
=================================================
*/

exports.delete =
async(id,businessId)=>{

const sponsorship =
await Sponsorship.findById(id);

if(!sponsorship)
throw new Error(
"Not found"
);

if(
sponsorship.business.toString()
!==businessId.toString()
){
throw new Error(
"Unauthorized"
);
}

await sponsorship.deleteOne();

return{
success:true
};

};