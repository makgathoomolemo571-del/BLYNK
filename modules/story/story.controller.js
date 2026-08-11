const service = require("./story.service");

exports.create = async (req,res,next)=>{
try{

     console.log("BODY:", req.body);
    console.log("FILE:", req.file);
const result = await service.create(
req.user._id,
req.body,
req.file
);
res.status(201).json(result);
}catch(err){next(err);}
};

exports.feed = async (req,res,next)=>{
try{
const result = await service.feed();
res.json(result);
}catch(err){next(err);}
};

exports.react = async (req,res,next)=>{
    try{
        await service.react(
            req.params.id,
            req.user._id
        );

        res.json({success:true});
    }catch(err){
        next(err);
    }
};

exports.comment = async (req,res,next)=>{
    try{
        await service.comment(
            req.params.id,
            req.user._id,
            req.body.text
        );

        res.json({success:true});
    }catch(err){
        next(err);
    }
};

exports.reply = async (req,res,next)=>{
    try{
        await service.reply(
            req.params.id,
            req.user._id,
            req.body.text
        );

        res.json({success:true});
    }catch(err){
        next(err);
    }
};

exports.view = async (req,res,next)=>{
try{
await service.view(
req.params.id,
req.user._id
);
res.json({success:true});
}catch(err){next(err);}
};

exports.remove = async (req,res,next)=>{
try{
await service.remove(
req.params.id,
req.user._id
);
res.json({success:true});
}catch(err){next(err);}
};

exports.expire = async (req,res,next)=>{
try{
const result = await service.expireStories();
res.json({expired: result});
}catch(err){next(err);}
};