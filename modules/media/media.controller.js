const service =
require("./media.service");

exports.upload =
async (req,res,next)=>{

try{

    console.log(req.file);
console.log(req.body);

if(!req.file){

return res.status(400).json({
message:"File is required"
});
}
const result =
await service.upload(

req.user._id,

req.file,

req.body.module,

req.body.type

);

res.status(201)
.json(result);

}
catch(err){
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

}
catch(err){
next(err);
}

};

exports.remove =
async (req,res,next)=>{

try{

const result =
await service.remove(
req.params.id
);

res.json(result);

}
catch(err){
next(err);
}

};