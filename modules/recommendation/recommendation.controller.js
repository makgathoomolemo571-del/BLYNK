const service =
require("./recommendation.service");

exports.generate =
async (req,res,next)=>{

  try{

    const result =
    await service.generate(
      req.user._id,
      req.query.limit
    );

    res.json(result);

  }catch(err){
    next(err);
  }

};

exports.trackView =
async (req,res,next)=>{

  try{

    const result =
    await service.trackView(
      req.params.id
    );

    res.json(result);

  }catch(err){
    next(err);
  }

};

exports.trackClick =
async (req,res,next)=>{

  try{

    const result =
    await service.trackClick(
      req.params.id
    );

    res.json(result);

  }catch(err){
    next(err);
  }

};