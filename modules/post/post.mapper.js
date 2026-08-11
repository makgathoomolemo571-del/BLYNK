const PostDTO =
require("./post.dto");

exports.toDTO = (post) =>
new PostDTO(post);

exports.toDTOList = (posts) =>
posts.map(
  (post) => new PostDTO(post)
);