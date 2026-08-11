const service =
require("./revenue.service");

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

exports.markPaid =
async (req,res,next)=>{

try{

const result =
await service.markPaid(
req.params.id
);

res.json(result);

}
catch(err){
next(err);
}

};

exports.summary =
async (req,res,next)=>{

try{

const result =
await service.summary(
req.user._id
);

res.json(result);

}
catch(err){
next(err);
}

};