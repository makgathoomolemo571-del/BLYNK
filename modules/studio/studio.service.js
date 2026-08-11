const Model = require("./studio.model");
const mapper = require("./studio.mapper");
const events = require("./studio.events");

const eventBus = require("../../shared/eventBus");

exports.create = async (data, userId) => {

  const studio = await Model.create({
    ...data,
    creator: userId,
    status: data.scheduledAt ? "scheduled" : "draft"
  });

  eventBus.emit(events.CREATED, studio);

  return mapper.toDTO(studio);
};

exports.getMine = async (userId) => {

  const items = await Model.find({
    creator: userId,
    isDeleted: false
  }).sort({ createdAt: -1 });

  return items.map(mapper.toDTO);
};

exports.getById = async (id) => {

  const item = await Model.findById(id);

  if (!item || item.isDeleted) {
    throw new Error("Not found");
  }

  return mapper.toDTO(item);
};

exports.update = async (id, data) => {

  const updated = await Model.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  eventBus.emit(events.UPDATED, updated);

  return mapper.toDTO(updated);
};

exports.remove = async (id) => {

  const deleted = await Model.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
      deletedAt: new Date()
    },
    { new: true }
  );

  eventBus.emit(events.DELETED, deleted);

  return { success: true };
};