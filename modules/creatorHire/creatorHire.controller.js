const CreatorHire = require("./creatorHire.model");
const service = require("./creatorHire.service");
const Application =
require("../application/application.model");

exports.create = async (req, res, next) => {
  try {
    const result = await service.create(req.user._id, req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};



exports.getApplications = async (req,res,next)=>{

try{

const result =
await service.getApplications(
req.params.id
);


res.json(result);

}catch(err){

next(err);

}

};

exports.get = async (req, res) => {
  const job = await CreatorHire.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      message: "Job not found"
    });
  }

  res.json(job);
};

exports.getAll = async (req, res, next) => {
    try {
        const jobs = await service.getAll();
        res.json(jobs);
    } catch (err) {
        next(err);
    }
};




exports.apply =
async (
jobId,
userId,
data
)=>{

  const job =
    await Model.findById(jobId);


  if(!job){
    throw new Error(
      "Creator job not found"
    );
  }


  const application =
    await Application.create({

      applicant:userId,

      targetType:"CREATOR_HIRE",

      targetId:jobId,

      message:data.message,

      proposal:data.proposal,

      deliverables:data.deliverables,

      proposedPrice:data.proposedPrice,

      portfolioLinks:data.portfolioLinks || [],

      attachments:data.attachments || []

    });


  return application;

};

exports.updateStatus = async (req, res, next) => {
  try {
    const result = await service.updateStatus(
      req.params.id,
      req.user._id,
      req.body.status
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const result = await service.delete(
      req.params.id,
      req.user._id
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.getMyJobs = async (req, res, next) => {
  try {
    const result = await service.getMyJobs(req.user._id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};