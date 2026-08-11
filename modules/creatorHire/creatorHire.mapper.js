exports.toDTO = (job) => ({
  id: job._id,

  creator: job.creator,

  projectTitle: job.projectTitle,
  category: job.category,
  description: job.description,

  objectives: job.objectives,
  deliverables: job.deliverables,

  roleRequired: job.roleRequired,
  experienceLevel: job.experienceLevel,
  skills: job.skills,

  budgetType: job.budgetType,
  budgetRange: job.budgetRange,
  paymentMethod: job.paymentMethod,

  timelineStart: job.timelineStart,
  timelineEnd: job.timelineEnd,

  workType: job.workType,
  location: job.location,
  timeZone: job.timeZone,

  applicants: job.applicants,

  visibility: job.visibility,
  status: job.status,

  

  createdAt: job.createdAt,
  
});