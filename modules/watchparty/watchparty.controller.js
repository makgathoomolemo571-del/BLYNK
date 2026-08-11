const service =
require("./watchparty.service");

exports.create =
async (req,res,next)=>{
try{
const result =
await service.create(
req.user._id,
req.body
);
res.status(201).json(result);
}catch(err){
next(err);
}
};

exports.live =
async (req,res,next)=>{
try{
const result =
await service.getLive();
res.json(result);
}catch(err){
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

exports.start =
async (req,res,next)=>{
try{
const result =
await service.start(
req.params.id,
req.user._id
);

if (party.creator.toString() !== req.user.userId) {
    return res.status(403).json({
        message: "Not your watch party."
    });
}

res.json(result);
}catch(err){
next(err);
}
};

exports.end =
async (req,res,next)=>{
try{
const result =
await service.end(
req.params.id,
req.user._id
);
res.json(result);
}catch(err){
next(err);
}
};

exports.join =
async (req,res,next)=>{
try{
const result =
await service.join(
req.params.id,
req.user._id
);
res.json(result);
}catch(err){
next(err);
}
};

exports.leave =
async (req,res,next)=>{
try{
const result =
await service.leave(
req.params.id,
req.user._id
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