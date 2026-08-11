const SocialDTO =
require("./social.dto");

exports.toDTO = (data) =>
new SocialDTO(data);

exports.toDTOList = (data) =>
data.map(item =>
  new SocialDTO(item)
);