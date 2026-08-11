const WatchParty =
require("./watchparty.model");

const mapper =
require("./watchparty.mapper");

const eventBus =
require("../../shared/eventBus");

const EVENTS =
require("./watchparty.events");

exports.create =
async (
userId,
data
)=>{

const watchparty =
await WatchParty.create({

creator:userId,

title:data.title,

description:data.description,

type:data.type,

thumbnail:data.thumbnail,

visibility:data.visibility
});

eventBus.emit(
EVENTS.WATCHPARTY_CREATED,
{
watchPartyId:
watchparty._id
}
);

return mapper.toDTO(
watchparty
);
};

exports.getLive =
async ()=>{

const items =
await WatchParty.find({

status:{
       $in:[
          "scheduled",
          "live"
       ]
    },

isDeleted:false

})
.sort({
startedAt:-1
});

return items.map(
mapper.toDTO
);
};

exports.getById =
async (id)=>{

const watchparty =
await WatchParty.findOne({

_id:id,

isDeleted:false

});

if(!watchparty)
throw new Error(
"WatchParty not found"
);

return mapper.toDTO(
watchparty
);
};

exports.start =
async (
id,
userId
)=>{

const watchparty =
await WatchParty.findOne({

_id:id,

creator:userId,

isDeleted:false

});

if(!watchparty)
throw new Error(
"WatchParty not found"
);

watchparty.status =
"live";

watchparty.startedAt =
new Date();

await watchparty.save();

eventBus.emit(
EVENTS.WATCHPARTY_STARTED,
{
watchPartyId:id
}
);

return mapper.toDTO(
watchparty
);
};

exports.end =
async (
id,
userId
)=>{

const watchparty =
await WatchParty.findOne({

_id:id,

creator:userId,

isDeleted:false

});

if(!watchparty)
throw new Error(
"WatchParty not found"
);

watchparty.status =
"ended";

watchparty.endedAt =
new Date();

await watchparty.save();

eventBus.emit(
EVENTS.WATCHPARTY_ENDED,
{
watchPartyId:id
}
);

return mapper.toDTO(
watchparty
);
};

exports.join =
async (
id,
userId
)=>{

await WatchParty.updateOne(
{
_id:id
},
{
$addToSet:{
participants:userId
},
$inc:{
viewerCount:1
}
}
);

eventBus.emit(
EVENTS.WATCHPARTY_JOINED,
{
watchPartyId:id,
userId
}
);

return {
success:true
};
};

exports.leave =
async (
id,
userId
)=>{

await WatchParty.updateOne(
{
_id:id
},
{
$pull:{
participants:userId
},
$inc:{
viewerCount:-1
}
}
);

eventBus.emit(
EVENTS.WATCHPARTY_LEFT,
{
watchPartyId:id,
userId
}
);

return {
success:true
};
};

exports.delete =
async (
id,
userId
)=>{

const watchparty =
await WatchParty.findOne({

_id:id,

creator:userId

});

if(!watchparty)
throw new Error(
"WatchParty not found"
);

watchparty.isDeleted =
true;

watchparty.deletedAt =
new Date();

await watchparty.save();

eventBus.emit(
EVENTS.WATCHPARTY_DELETED,
{
watchPartyId:id
}
);

return {
success:true
};
};

exports.stats = async () => {

  const total =
    await WatchParty.countDocuments({
      isDeleted: false
    });

  const live =
    await WatchParty.countDocuments({
      status: "live",
      isDeleted: false
    });

  const ended =
    await WatchParty.countDocuments({
      status: "ended",
      isDeleted: false
    });

  return {
    total,
    live,
    ended
  };

};