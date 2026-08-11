const Model =
require("./application.model");

const mapper =
require("./application.mapper");

const eventBus =
require("../../shared/eventBus");

const EVENTS =
require("./application.events");

exports.create =
async (
userId,
data
)=>{

const application =
await Model.create({

applicant:userId,

targetType:
data.targetType,

targetId:
data.targetId,

message:
data.message,

proposal:
data.proposal,

deliverables:
data.deliverables,

proposedPrice:
data.proposedPrice,

portfolioLinks:
data.portfolioLinks,

attachments:
data.attachments
});

eventBus.emit(
EVENTS.APPLICATION_CREATED,
{
applicationId:
application._id
}
);

return mapper.toDTO(
application
);
};

exports.getMine =
async (userId)=>{

const applications =
await Model.find({

applicant:userId,

isDeleted:false

});

return applications.map(
mapper.toDTO
);
};

exports.getById =
async (id)=>{

const application =
await Model.findOne({

_id:id,

isDeleted:false

});

if(!application)
throw new Error(
"Application not found"
);

return mapper.toDTO(
application
);
};

exports.updateStatus =
async (
id,
status
)=>{
console.log("Application ID:", id);
const application =
await Model.findById(id);
console.log("Found:", application);
if(!application)
throw new Error(
"Application not found"
);

application.status =
status;

await application.save();

if(status==="accepted"){

eventBus.emit(
EVENTS.APPLICATION_ACCEPTED,
{
applicationId:id
}
);

}

if(status==="rejected"){

eventBus.emit(
EVENTS.APPLICATION_REJECTED,
{
applicationId:id
}
);

}

eventBus.emit(
EVENTS.APPLICATION_UPDATED,
{
applicationId:id
}
);

return mapper.toDTO(
application);
};

exports.withdraw =
async (
id,
userId
)=>{

const application =
await Model.findOne({

_id:id,

applicant:userId

});

if(!application)
throw new Error(
"Application not found"
);

application.status =
"withdrawn";

await application.save();

eventBus.emit(
EVENTS.APPLICATION_WITHDRAWN,
{
applicationId:id
}
);

return {
success:true
};
};