const Conversation = require("./conversation.model");

const ConversationMapper =
require("./conversation.mapper");

/*
=========================================
Create Conversation
=========================================
*/

exports.create = async (
creatorId,
data
) => {
console.log("SERVICE DATA:", data);
console.log("CREATOR:", creatorId);
console.log("PARTICIPANTS:", data.participants);
const participants =
[
creatorId,
...(data.participants || [])
];

const uniqueParticipants =
[...new Set(participants)];

const conversation =
await Conversation.create({

type:
data.type || "private",

title:
data.title || "",

photo:
data.photo || "",

description:
data.description || "",

participants:
uniqueParticipants,

admins:
[creatorId],

owner:
creatorId

});

return ConversationMapper.toDTO(
conversation
);

};

/*
=========================================
Get My Conversations
=========================================
*/

exports.getMine = async (
userId
) => {

const conversations =
await Conversation.find({

participants: userId,

isDeleted: false

})

.populate(
"participants",
"username displayName profilePicture verified"
)

.populate(
"lastSender",
"username displayName profilePicture"
)

.sort({
updatedAt:-1
});

return conversations.map(
ConversationMapper.toDTO
);

};

/*
=========================================
Get By ID
=========================================
*/

exports.getById = async (
id,
userId
) => {

const conversation =
await Conversation.findOne({

_id:id,

participants:userId,

isDeleted:false

})

.populate(
"participants",
"username displayName profilePicture verified"
)

.populate(
"admins",
"username displayName"
)

.populate(
"owner",
"username displayName"

);

if(!conversation){

throw new Error(
"Conversation not found"
);

}

return ConversationMapper.toDTO(
conversation
);

};

/*
=========================================
Update Conversation
=========================================
*/

exports.update = async (

id,

userId,

data

)=>{

const conversation =
await Conversation.findOne({

_id:id,

owner:userId,

isDeleted:false

});

if(!conversation){

throw new Error(
"Conversation not found"
);

}

if(data.title !== undefined)
conversation.title =
data.title;

if(data.photo !== undefined)
conversation.photo =
data.photo;

if(data.description !== undefined)
conversation.description =
data.description;

await conversation.save();

return ConversationMapper.toDTO(
conversation
);

};

/*
=========================================
Add Participant
=========================================
*/

exports.addParticipant =
async (

id,

userId,

participantId

)=>{

const conversation =
await Conversation.findOne({

_id:id,

admins:userId,

isDeleted:false

});

if(!conversation){

throw new Error(
"Conversation not found"
);

}

if(
!conversation.participants.includes(
participantId
)
){

conversation.participants.push(
participantId
);

}

await conversation.save();

return {
success:true
};

};

/*
=========================================
Remove Participant
=========================================
*/

exports.removeParticipant =
async (

id,

userId,

participantId

)=>{

const conversation =
await Conversation.findOne({

_id:id,

admins:userId,

isDeleted:false

});

if(!conversation){

throw new Error(
"Conversation not found"
);

}

conversation.participants =
conversation.participants.filter(

p=>p.toString() !==
participantId.toString()

);

await conversation.save();

return {
success:true
};

};

/*
=========================================
Archive
=========================================
*/

exports.archive =
async (

id,

userId

)=>{

const conversation =
await Conversation.findOne({

_id:id,

participants:userId,

isDeleted:false

});

if(!conversation){

throw new Error(
"Conversation not found"
);

}

conversation.isArchived =
true;

await conversation.save();

return {
success:true
};

};

/*
=========================================
Delete Conversation
=========================================
*/

exports.delete =
async (

id,

userId

)=>{

const conversation =
await Conversation.findOne({

_id:id,

owner:userId

});

if(!conversation){

throw new Error(
"Conversation not found"
);

}

conversation.isDeleted =
true;

conversation.deletedAt =
new Date();

await conversation.save();

return {
success:true
};

};