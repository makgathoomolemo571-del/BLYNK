const ReelDTO =
require("./reel.dto");

exports.toDTO =
(reel) =>
new ReelDTO(reel);

exports.toDTOList =
(reels) =>
reels.map(
  (r) => new ReelDTO(r)
);