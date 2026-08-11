const Conversation = require("./conversation.model");
const Message = require("./message.model");

const mapper = require("./message.mapper");

const eventBus =
require("../../shared/eventBus");

const EVENTS =
require("./message.events");

/*
======================================
SEND MESSAGE
======================================
*/

exports.send = async (
userId,
data
) => {

const conversation =
await Conversation.findById(
data.conversationId
);

if (!conversation)
throw new Error(
"Conversation not found."
);

const message =
await Message.create({

conversation:
conversation._id,

sender:
userId,

text:
data.text || "",

attachments:
data.attachments || [],

replyTo:
data.replyTo || null,

forwardedFrom:
data.forwardedFrom || null

});

conversation.lastMessage =
message._id;

conversation.lastSender =
userId;

conversation.lastMessageAt =
new Date();

await conversation.save();

eventBus.emit(
EVENTS.MESSAGE_SENT,
{
conversationId:
conversation._id,

messageId:
message._id,

sender:
userId
}
);

return mapper.toDTO(
message
);

};

/*
======================================
GET CONVERSATION MESSAGES
======================================
*/

exports.getConversationMessages =
async (
conversationId,
page = 1,
limit = 30
) => {

const skip =
(page - 1) * limit;

const messages =
await Message.find({

conversation:
conversationId,

deletedForEveryone:
false

})

.populate(
"sender",
"username profilePicture verified"
)

.populate(
"replyTo"
)

.sort({
createdAt: -1
})

.skip(skip)

.limit(limit);

return messages
.reverse()
.map(
mapper.toDTO
);

};

/*
======================================
GET SINGLE MESSAGE
======================================
*/

exports.getById =
async (
id
)=>{

const message =
await Message.findById(id)

.populate(
"sender",
"username profilePicture verified"
)

.populate(
"replyTo"
);

if(!message)
throw new Error(
"Message not found."
);

return mapper.toDTO(
message
);

};

/*
======================================
EDIT MESSAGE
======================================
*/

exports.update =
async (
id,
userId,
data
)=>{

const message =
await Message.findOne({

_id:id,

sender:userId,

deletedForEveryone:false

});

if(!message)
throw new Error(
"Message not found."
);

message.text =
data.text;

message.edited =
true;

message.editedAt =
new Date();

await message.save();

eventBus.emit(
EVENTS.MESSAGE_UPDATED,
{
messageId:id
}
);

return mapper.toDTO(
message
);

};

/*
======================================
DELETE FOR EVERYONE
======================================
*/

exports.delete =
async (
id,
userId
)=>{

const message =
await Message.findOne({

_id:id,

sender:userId

});

if(!message)
throw new Error(
"Message not found."
);

message.deletedForEveryone =
true;

await message.save();

eventBus.emit(
EVENTS.MESSAGE_DELETED,
{
messageId:id
}
);

return {
success:true
};

};

/*
======================================
DELETE FOR ME
======================================
*/

exports.deleteForMe =
async (
id,
userId
)=>{

const message =
await Message.findById(id);

if(!message)
throw new Error(
"Message not found."
);

if(
!message.deletedFor.includes(
userId
)
){

message.deletedFor.push(
userId
);

await message.save();

}

return {
success:true
};

};

/*
======================================
REACTION
======================================
*/

exports.react =
async (
messageId,
userId,
emoji
)=>{

const message =
await Message.findById(
messageId
);

if(!message)
throw new Error(
"Message not found."
);

const existing =
message.reactions.find(
r =>
String(r.user) ===
String(userId)
);

if(existing){

existing.emoji =
emoji;

}else{

message.reactions.push({

user:userId,

emoji

});

}

await message.save();

eventBus.emit(
EVENTS.MESSAGE_REACTION,
{
messageId,
userId,
emoji
}
);

return mapper.toDTO(
message
);

};

/*
======================================
MARK AS READ
======================================
*/

exports.read =
async (
messageId,
userId
)=>{

const message =
await Message.findById(
messageId
);

if(!message)
throw new Error(
"Message not found."
);

if(
!message.readBy.includes(
userId
)
){

message.readBy.push(
userId
);

message.status =
"read";

await message.save();

}

eventBus.emit(
EVENTS.MESSAGE_READ,
{
messageId,
userId
}
);

return {
success:true
};

};