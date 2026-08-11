const Episode =
require("./episode.model");

const Podcast =
require("../podcast/podcast.model");

const mapper =
require("./episode.mapper");

const eventBus =
require("../../shared/eventBus");

const EVENTS =
require("./episode.events");

exports.create = async (userId, data, files) => {

    console.log("Incoming data:", data);

    const podcast = await Podcast.findById(data.podcast);

    console.log("Podcast:", podcast);

    if (!podcast) {
        throw new Error("Podcast not found");
    }

console.log("Podcast document:", podcast);
console.log("Podcast ID:", podcast.id);
console.log("Podcast Name:", podcast.name);

const audio =
    files?.audio?.[0]?.path ||
    files?.audio?.[0]?.filename ||
    "";

const video =
    files?.video?.[0]?.path ||
    files?.video?.[0]?.filename ||
    "";

const episode = await Episode.create({

    creator: userId,

    podcast: podcast._id,

    podcastName: podcast.name,

    seasonNumber: data.seasonNumber,

    episodeNumber: data.episodeNumber,

    title: data.title,

    description: data.description,

    audio,

    video

});

await Podcast.updateOne(

   { _id: data.podcast },
{
    $inc: {
        totalEpisodes: 1
    },
    $set: {
        lastEpisodeAt: new Date()
    }
});

eventBus.emit(
EVENTS.EPISODE_CREATED,
{
episodeId:
episode._id
}
);

return mapper.toDTO(
episode
);
};

exports.getByPodcast = async (podcastId) => {

  return Episode.find({
    podcast: podcastId,
    deleted: false
  })
    .sort({
      seasonNumber: 1,
      episodeNumber: 1
    });

};

exports.getById =
async (id)=>{

const episode =
await Episode.findOne({
_id:id,
isDeleted:false
});

if(!episode)
throw new Error(
"Episode not found"
);

return mapper.toDTO(
episode
);
};

exports.update =
async (
id,
userId,
data
)=>{

const episode =
await Episode.findOne({
_id:id,
creator:userId,
isDeleted:false
});

if(!episode)
throw new Error(
"Episode not found"
);

Object.assign(
episode,
data
);

await episode.save();

return mapper.toDTO(
episode
);
};

exports.delete =
async (
id,
userId
)=>{

const episode =
await Episode.findOne({
_id:id,
creator:userId
});

if(!episode)
throw new Error(
"Episode not found"
);

episode.isDeleted =
true;

episode.deletedAt =
new Date();

await episode.save();

return {
success:true
};
};

exports.play =
async (
episodeId
)=>{

await Episode.updateOne(
{
_id:episodeId
},
{
$inc:{
plays:1
}
}
);

eventBus.emit(
EVENTS.EPISODE_PLAYED,
{
episodeId
}
);

return {
success:true
};
};

exports.view =
async (
episodeId
)=>{

await Episode.updateOne(
{
_id:episodeId
},
{
$inc:{
views:1
}
}
);

eventBus.emit(
EVENTS.EPISODE_VIEWED,
{
episodeId
}
);

return {
success:true
};
};

exports.like =
async (
episodeId,
userId
)=>{

await Episode.updateOne(
{
_id:episodeId
},
{
$addToSet:{
likes:userId
}
}
);

eventBus.emit(
EVENTS.EPISODE_LIKED,
{
episodeId,
userId
}
);

return {
success:true
};
};

exports.share =
async (
episodeId
)=>{

await Episode.updateOne(
{
_id:episodeId
},
{
$inc:{
shares:1
}
}
);

eventBus.emit(
EVENTS.EPISODE_SHARED,
{
episodeId
}
);

return {
success:true
};
};