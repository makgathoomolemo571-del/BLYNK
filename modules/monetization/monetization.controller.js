const service =
require("./monetization.service");


exports.dashboard =
async(req,res,next)=>{
console.log("MONETIZATION CONTROLLER HIT");
try{

res.json(
await service.dashboard(
req.user._id
)
);

}catch(e){
next(e);
}

};



exports.wallet =
async(req,res,next)=>{

try{

res.json(
await service.wallet(
req.user._id
)
);

}catch(e){
next(e);
}

};



exports.revenue =
async(req,res,next)=>{

try{

res.json(
await service.revenue(
req.user._id
)
);

}catch(e){
next(e);
}

};



exports.analytics =
async(req,res,next)=>{

try{

res.json(
await service.analytics(
req.user._id
)
);

}catch(e){
next(e);
}

};



exports.eligibility =
async(req,res,next)=>{

try{

res.json(
await service.eligibility(
req.user._id
)
);

}catch(e){
next(e);
}

};



exports.settings =
async(req,res,next)=>{

try{

res.json(
await service.settings(
req.user._id,
req.body
)
);

}catch(e){
next(e);
}

};