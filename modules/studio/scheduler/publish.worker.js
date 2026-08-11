const queue = require("./publish.queue");
const Model = require("../model");
const events = require("../events");
const eventBus = require("../../../events/eventBus");

queue.process(async (job) => {

  const { id } = job.data;

  const post = await Model.findById(id);

  if (!post) throw new Error("Not found");

  post.status = "published";
  post.publishedAt = new Date();

  await post.save();

  eventBus.emit(events.PUBLISHED, post);

  return post;
});