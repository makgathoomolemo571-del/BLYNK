const service =
require("./reel.service");

exports.create = async (req,res,next)=>{
try{
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
const result =
await service.create(
req.user._id,
req.body,
 req.file
);
res.status(201).json(result);
}catch(err){next(err);}
};

exports.feed = async(req,res,next)=>{
try{
const result =
await service.feed();
res.json(result);
}catch(err){next(err);}
};

exports.getById = async(req,res,next)=>{
try{
const result =
await service.getById(
req.params.id
);
res.json(result);
}catch(err){next(err);}
};

exports.update = async(req,res,next)=>{
try{
const result =
await service.update(
req.params.id,
req.user._id,
req.body
);
res.json(result);
}catch(err){next(err);}
};

exports.remove = async(req,res,next)=>{
try{
await service.remove(
req.params.id,
req.user._id
);
res.json({success:true});
}catch(err){next(err);}
};

exports.like = async(req,res,next)=>{
try{
await service.like(
req.params.id,
req.user._id
);
res.json({success:true});
}catch(err){next(err);}
};

exports.unlike = async(req,res,next)=>{
try{
await service.unlike(
req.params.id,
req.user._id
);
res.json({success:true});
}catch(err){next(err);}
};

exports.comment = async(req,res,next)=>{
try{
await service.comment(
req.params.id,
req.user._id,
req.body.text
);
res.json({success:true});
}catch(err){next(err);}
};

exports.share = async(req,res,next)=>{
try{
await service.share(
req.params.id
);
res.json({success:true});
}catch(err){next(err);}
};

exports.save = async(req,res,next)=>{
try{
await service.save(
req.params.id,
req.user._id
);
res.json({success:true});
}catch(err){next(err);}
};

exports.unsave = async(req,res,next)=>{
try{
await service.unsave(
req.params.id,
req.user._id
);
res.json({success:true});
}catch(err){next(err);}
};

exports.view = async(req,res,next)=>{
try{
await service.view(
req.params.id
);
res.json({success:true});
}catch(err){next(err);}
};