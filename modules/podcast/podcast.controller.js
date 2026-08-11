const service =
require("./podcast.service");

exports.create =
async (req,res,next)=>{
try{
const result =
await service.create(
req.user._id,
req.body
);
console.log("CREATE RESULT:", result);
res.status(201).json(result);

}catch(err){
next(err);
}
};

exports.publish = async (req, res) => {

    const podcast =
        await Podcast.findById(req.params.id);

    if (!podcast)
        return res.status(404).json({
            message: "Podcast not found."
        });

    if (podcast.totalEpisodes === 0) {
        return res.status(400).json({
            message:
                "Create at least one episode before publishing."
        });
    }

    podcast.status = "active";
    podcast.published = true;
    podcast.publishedAt = new Date();

    await podcast.save();

    res.json(podcast);

};

exports.getByName = async (req, res, next) => {
  try {
    const podcast = await service.getByName(req.params.name);
    res.json(podcast);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {

    const result =
      await service.getAll();

    res.json(result);

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

exports.getMine =
async (req,res,next)=>{
try{
const result =
await service.getMine(
req.user._id
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

exports.subscribe =
async (req,res,next)=>{
try{

const result =
await service.subscribe(
req.params.id,
req.user._id
);

res.json(result);

}catch(err){
next(err);
}
};

exports.unsubscribe =
async (req,res,next)=>{
try{

const result =
await service.unsubscribe(
req.params.id,
req.user._id
);

res.json(result);

}catch(err){
next(err);
}
};