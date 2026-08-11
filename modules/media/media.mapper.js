const MediaDTO =
require("./media.dto");

exports.toDTO =
(item)=>
new MediaDTO({

  id:item._id,

  type:item.type,

  module:item.module,

  url:item.url,

  thumbnail:item.thumbnail,

  mimeType:item.mimeType,

  size:item.size,

  createdAt:item.createdAt
});