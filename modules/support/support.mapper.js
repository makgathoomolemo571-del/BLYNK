const SupportDTO = require("./support.dto");

exports.toDTO = (item) =>
  new SupportDTO({
    id: item._id,

    ticketNumber: item.ticketNumber,

    subject: item.subject,

    description: item.description,

    issueType: item.issueType,

    affectedFeature: item.affectedFeature,

    priority: item.priority,

    status: item.status,

    assignedAgent: item.assignedAgent,

    attachments: item.attachments,

    resolutionNotes: item.resolutionNotes,

    createdAt: item.createdAt,

    updatedAt: item.updatedAt,
  });