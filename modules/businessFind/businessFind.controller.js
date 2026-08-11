const service =
require("./businessFind.service");

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

exports.getAll = async (req, res, next) => {
  try {
    const result = await service.getAll();

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
    try {
        const stats = await service.getStats(req.user.userId);

        res.json(stats);
    } catch (err) {
        next(err);
    }
};

exports.getMyCampaigns =
async (req,res,next)=>{
try{

const result =
await service.getMyCampaigns(
req.user._id
);

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

exports.apply =
async (req,res,next)=>{
try{

const result =
await service.apply(
req.params.id,
req.user._id,
req.body
);

res.json(result);

}catch(err){
next(err);
}
};

exports.updateStatus =
async (req,res,next)=>{
try{

const result =
await service.updateStatus(
req.params.id,
req.user._id,
req.body.status
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

exports.getApplications = async (req,res,next)=>{
  try {

    const result =
      await service.getApplications(req.params.id);

    res.json(result);

  } catch(err){
    next(err);
  }
};