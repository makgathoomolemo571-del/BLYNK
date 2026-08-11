const service =
require("./analytics.service");

exports.track =
async (req,res,next)=>{

try{

const result =
await service.track(

req.user._id,

req.body

);

res.status(201)
.json(result);

}
catch(err){
next(err);
}

};

exports.userAnalytics =
async (req,res,next)=>{

try{

const result =
await service.getUserAnalytics(

req.user._id

);

res.json(result);

}
catch(err){
next(err);
}

};

exports.creatorAnalytics =
async (req,res,next)=>{

try{

const result =
await service.getCreatorAnalytics(

req.user._id

);

res.json(result);

}
catch(err){
next(err);
}

};

exports.platformAnalytics =
async (req,res,next)=>{

try{

const result =
await service.getPlatformAnalytics();

res.json(result);

}
catch(err){
next(err);
}

};