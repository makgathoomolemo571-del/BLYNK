const Verification =
require("./verification.model");

const mapper =
require("./verification.mapper");

const eventBus =
require("../../shared/eventBus");

const EVENTS =
require("./verification.events");

exports.create =
async (
userId,
data
)=>{

const verification =
await Verification.create({

user:userId,

...data

});

eventBus.emit(
EVENTS.VERIFICATION_SUBMITTED,
{
verificationId:
verification._id
}
);

return mapper.toDTO(
verification
);

};

exports.getMine =
async (userId)=>{

const records =
await Verification.find({

user:userId,

isDeleted:false

})
.sort({
createdAt:-1
});

return records.map(
mapper.toDTO
);

};

exports.approve =
async (
id,
adminId
)=>{

const verification =
await Verification.findById(id);

if(!verification)
throw new Error(
"Verification not found"
);

verification.status =
"approved";

verification.reviewedBy =
adminId;

verification.reviewedAt =
new Date();

await verification.save();

eventBus.emit(
EVENTS.VERIFICATION_APPROVED,
{
verificationId:id
}
);

return mapper.toDTO(
verification
);

};

exports.reject =
async (
id,
adminId,
reason
)=>{

const verification =
await Verification.findById(id);

if(!verification)
throw new Error(
"Verification not found"
);

verification.status =
"rejected";

verification.reviewedBy =
adminId;

verification.reviewedAt =
new Date();

verification.rejectionReason =
reason;

await verification.save();

eventBus.emit(
EVENTS.VERIFICATION_REJECTED,
{
verificationId:id
}
);

return mapper.toDTO(
verification
);

};


exports.getAllRequests =
async ()=>{

  return await Verification
  .find({
    isDeleted:false
  })
  .sort({
    createdAt:-1
  });

};

exports.stats = async () => {

  const total =
    await Verification.countDocuments();

  const pending =
    await Verification.countDocuments({
      status: "pending"
    });

  const approved =
    await Verification.countDocuments({
      status: "approved"
    });

  const rejected =
    await Verification.countDocuments({
      status: "rejected"
    });

  return {

    total,
    pending,
    approved,
    rejected

  };

};