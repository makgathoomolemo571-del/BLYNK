const service =
require("./application.service");

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

exports.updateStatus =
async (req,res,next)=>{
try{

const result =
await service.updateStatus(
req.params.id,
req.body.status
);

res.json(result);

}catch(err){
next(err);
}
};

exports.withdraw =
async (req,res,next)=>{
try{

const result =
await service.withdraw(
req.params.id,
req.user._id
);

res.json(result);

}catch(err){
next(err);
}
};