const service =
require("./moderation.service");

exports.submitReport =
async (req,res,next)=>{

try{

const result =
await service.submitReport(

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

exports.getReports =
async (req,res,next)=>{

try{

const result =
await service.getReports();

res.json(result);

}
catch(err){
next(err);
}

};

exports.getReport =
async (req,res,next)=>{

try{

const result =
await service.getReport(
req.params.id
);

res.json(result);

}
catch(err){
next(err);
}

};

exports.reviewReport =
async (req,res,next)=>{

try{

const result =
await service.reviewReport(

req.params.id,

req.user._id,

req.body.actionTaken,

req.body.resolutionNotes

);

res.json(result);

}
catch(err){
next(err);
}

};

exports.approve =
async (req,res,next)=>{

try{

const result =
await service.approve(

req.params.id,

req.user._id

);

res.json(result);

}
catch(err){
next(err);
}

};

exports.reject =
async (req,res,next)=>{

try{

const result =
await service.reject(

req.params.id,

req.user._id

);

res.json(result);

}
catch(err){
next(err);
}

};