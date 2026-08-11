const service =
require("./episode.service");
const episodeService = require("./episode.service");
exports.create =
async (req,res,next)=>{
try{
const result =
await service.create(
req.user._id,
req.body,
 req.files
);
res.status(201).json(result);
}catch(err){
next(err);
}
};

exports.getByPodcast = async (req, res, next) => {
  try {
    const episodes = await service.getByPodcast(
      req.params.podcastId
    );

    res.json(episodes);
  } catch (err) {
    next(err);
  }
};

exports.getById =
async (req,res,next)=>{
try{
const result =
await service.getById(
req.params.id
);
res.json(result);
}catch(err){
next(err);
}
};

exports.update =
async (req,res,next)=>{
try{
const result =
await service.update(
req.params.id,
req.user._id,
req.body
);
res.json(result);
}catch(err){
next(err);
}
};

exports.delete =
async (req,res,next)=>{
try{
const result =
await service.delete(
req.params.id,
req.user._id
);
res.json(result);
}catch(err){
next(err);
}
};

exports.play =
async (req,res,next)=>{
try{
const result =
await service.play(
req.params.id
);
res.json(result);
}catch(err){
next(err);
}
};

exports.view =
async (req,res,next)=>{
try{
const result =
await service.view(
req.params.id
);
res.json(result);
}catch(err){
next(err);
}
};

exports.like =
async (req,res,next)=>{
try{
const result =
await service.like(
req.params.id,
req.user._id
);
res.json(result);
}catch(err){
next(err);
}
};

exports.share =
async (req,res,next)=>{
try{
const result =
await service.share(
req.params.id
);
res.json(result);
}catch(err){
next(err);
}
};