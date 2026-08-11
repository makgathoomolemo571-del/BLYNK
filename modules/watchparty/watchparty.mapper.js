const WatchPartyDTO =
require("./watchparty.dto");

exports.toDTO =
(watchparty) =>
new WatchPartyDTO({

  id: watchparty._id,

  creator:
    watchparty.creator,

  title:
    watchparty.title,

  description:
    watchparty.description,

  type:
    watchparty.type,

  thumbnail:
    watchparty.thumbnail,

  status:
    watchparty.status,

  visibility:
    watchparty.visibility,

  viewerCount:
    watchparty.viewerCount,

  startedAt:
    watchparty.startedAt,

  endedAt:
    watchparty.endedAt,

  createdAt:
    watchparty.createdAt
});