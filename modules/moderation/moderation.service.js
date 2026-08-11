const Moderation =
require("./moderation.model");

const mapper =
require("./moderation.mapper");

const eventBus =
require("../../shared/eventBus");

const EVENTS =
require("./moderation.events");

exports.submitReport =
async (
userId,
data
)=>{

const report =
await Moderation.create({

reporter:userId,

...data

});

eventBus.emit(
EVENTS.REPORT_SUBMITTED,
{
reportId:report._id
}
);

return mapper.toDTO(
report
);

};

exports.getReports =
async ()=>{

const reports =
await Moderation.find({
isDeleted:false
})
.sort({
createdAt:-1
});

return reports.map(
mapper.toDTO
);

};

exports.getReport =
async (id)=>{

const report =
await Moderation.findById(id);

if(!report)
throw new Error(
"Report not found"
);

return mapper.toDTO(
report
);

};

exports.reviewReport =
async (
reportId,
adminId,
actionTaken,
notes
)=>{

const report =
await Moderation.findById(
reportId
);

if(!report)
throw new Error(
"Report not found"
);

report.status =
"resolved";

report.reviewedBy =
adminId;

report.reviewedAt =
new Date();

report.actionTaken =
actionTaken;

report.resolutionNotes =
notes;

await report.save();

switch(actionTaken){

case "warning":

eventBus.emit(
EVENTS.USER_WARNED,
{
reportId
}
);

break;

case "remove_content":

eventBus.emit(
EVENTS.CONTENT_REMOVED,
{
reportId
}
);

break;

case "suspend_user":

eventBus.emit(
EVENTS.USER_SUSPENDED,
{
reportId
}
);

break;

case "ban_user":

eventBus.emit(
EVENTS.USER_BANNED,
{
reportId
}
);

break;

}

return mapper.toDTO(
report
);

};

exports.approve =
async (
reportId,
adminId
)=>{

const report =
await Moderation.findById(
reportId
);

if(!report)
throw new Error(
"Report not found"
);

report.status =
"approved";

report.reviewedBy =
adminId;

report.reviewedAt =
new Date();

await report.save();

eventBus.emit(
EVENTS.REPORT_APPROVED,
{
reportId
}
);

return mapper.toDTO(
report
);

};

exports.reject =
async (
reportId,
adminId
)=>{

const report =
await Moderation.findById(
reportId
);

if(!report)
throw new Error(
"Report not found"
);

report.status =
"rejected";

report.reviewedBy =
adminId;

report.reviewedAt =
new Date();

await report.save();

eventBus.emit(
EVENTS.REPORT_REJECTED,
{
reportId
}
);

return mapper.toDTO(
report
);

};

exports.stats = async () => {

  const total =
    await Moderation.countDocuments();

  const pending =
    await Moderation.countDocuments({
      status: "pending"
    });

  const approved =
    await Moderation.countDocuments({
      status: "approved"
    });

  const rejected =
    await Moderation.countDocuments({
      status: "rejected"
    });

  return {

    total,
    pending,
    approved,
    rejected

  };

};