const ProfileDTO =
require("./profile.dto");

exports.toDTO = (profile) => {
  return new ProfileDTO(profile);
};