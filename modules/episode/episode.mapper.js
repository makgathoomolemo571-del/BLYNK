const EpisodeDTO =
require("./episode.dto");

exports.toDTO = (episode) =>
new EpisodeDTO({
  id: episode._id,

  podcast: episode.podcast,

  title: episode.title,

  description: episode.description,

  seasonNumber: episode.seasonNumber,

  episodeNumber: episode.episodeNumber,

  audio: episode.audio,

  video: episode.video,

  duration: episode.duration,

  plays: episode.plays,

  views: episode.views,

  shares: episode.shares,

  createdAt: episode.createdAt
});