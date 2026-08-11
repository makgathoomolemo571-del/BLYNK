const StoryDTO = require("./story.dto");

exports.toDTO = (story) => new StoryDTO(story);

exports.toDTOList = (stories) =>
  stories.map((s) => new StoryDTO(s));