const Queue = require("bull");

const publishQueue = new Queue("creator-publish");

module.exports = publishQueue;