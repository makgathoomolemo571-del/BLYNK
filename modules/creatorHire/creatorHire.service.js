const Model = require("./creatorHire.model");
const mapper = require("./creatorHire.mapper");
const eventBus = require("../../shared/eventBus");
const EVENTS = require("./creatorHire.events");
const Application = require("../application/application.model");
const applicationMapper =
require("../application/application.mapper");

exports.create = async (userId, data) => {

  const job = await Model.create({
    creator: userId,
    ...data
  });

  eventBus.emit(EVENTS.CREATOR_HIRE_CREATED, {
    jobId: job._id,
    creatorId: userId
  });

  return mapper.toDTO(job);
};


exports.getApplications = async (jobId) => {

  const applications = await Application.find({
    targetType: "CREATOR_HIRE",
    targetId: jobId,
    isDeleted: false
  })
  .populate("applicant")
  .sort({ createdAt: -1 });
console.log(applications);
  return applications.map(applicationMapper.toDTO);
};

exports.getAll = async () => {

    const jobs = await Model.find({
        isDeleted: false,
        status: "open"
    }).sort({ createdAt: -1 });

    return jobs.map(mapper.toDTO);

};

exports.apply = async (jobId, userId, data) => {

  const job = await Model.findById(jobId);

  if (!job) throw new Error("Job not found");

  job.applicants.push({
    user: userId,
    ...data
  });

  await job.save();

  eventBus.emit(EVENTS.CREATOR_HIRE_APPLIED, {
    jobId,
    userId
  });

  return { success: true };
};

exports.updateStatus = async (jobId, userId, status) => {

  const job = await Model.findOne({
    _id: jobId,
    creator: userId
  });

  if (!job) throw new Error("Not found");

  job.status = status;

  await job.save();

  eventBus.emit(EVENTS.CREATOR_HIRE_UPDATED, {
    jobId,
    status
  });

  return mapper.toDTO(job);
};

exports.delete = async (jobId, userId) => {

  const job = await Model.findOne({
    _id: jobId,
    creator: userId
  });

  if (!job) throw new Error("Not found");

  job.isDeleted = true;
  job.deletedAt = new Date();

  await job.save();

  eventBus.emit(EVENTS.CREATOR_HIRE_DELETED, {
    jobId
  });

  return { success: true };
};

exports.getMyJobs = async (userId) => {

  const jobs = await Model.find({
    creator: userId,
    isDeleted: false
  });

  return jobs.map(mapper.toDTO);
};

exports.stats = async () => {

  const totalJobs =
    await Model.countDocuments();

  const totalApplicants =
    await Model.aggregate([
      { $project: { applicants: 1 } }
    ]);

  const applicants =
    totalApplicants.reduce(
      (sum, j) => sum + (j.applicants?.length || 0),
      0
    );

  return {
    totalJobs,
    totalApplicants: applicants
  };

};