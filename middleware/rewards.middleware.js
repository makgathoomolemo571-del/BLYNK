module.exports =
(requiredPoints = 0) => {

return (req,res,next)=>{

const wallet =
req.wallet;

if(!wallet){

return res.status(404).json({

message:"Wallet required"

});

}

const points =
wallet.vigPoints || 0;

if(points < requiredPoints){

return res.status(400).json({

message:"Insufficient VIG Points"

});

}

next();

};

};