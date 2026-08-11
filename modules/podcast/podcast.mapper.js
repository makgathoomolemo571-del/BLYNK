const PodcastDTO =
require("./podcast.dto");

exports.toDTO = (podcast) =>
new PodcastDTO({
  id: podcast._id,

  creator: podcast.creator,

  name: podcast.name,

  description: podcast.description,

  category: podcast.category,

  coverImage: podcast.coverImage,

  visibility: podcast.visibility,

  totalEpisodes: podcast.totalEpisodes,

  totalViews: podcast.totalViews,

  totalListeners: podcast.totalListeners,

  createdAt: podcast.createdAt
});