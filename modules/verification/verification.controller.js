const service =
require("./verification.service");

exports.create =
async (req,res,next)=>{

try{

const result =
await service.create(

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

exports.getMine =
async (req,res,next)=>{

try{

const result =
await service.getMine(
req.user._id
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

req.user._id,

req.body.reason

);

res.json(result);

}
catch(err){
next(err);
}

};