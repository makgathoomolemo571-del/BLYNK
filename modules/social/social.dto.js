class SocialDTO {
  constructor(data) {

    this.id = data._id;

    this.user = data.user;

    this.targetUser =
      data.targetUser;

    this.relationshipType =
      data.relationshipType;

    this.status =
      data.status;

    this.createdAt =
      data.createdAt;
  }
}

exports.friendDTO = (user) => ({
  id: user._id,
  username: user.username,
  profilePicture: user.profilePicture
});

exports.friendRequestDTO = (req) => ({
  id: req._id,
  from: {
    id: req.from._id,
    username: req.from.username,
    profilePicture: req.from.profilePicture
  },
  to: {
    id: req.to._id,
    username: req.to.username,
    profilePicture: req.to.profilePicture
  },
  status: req.status,
  createdAt: req.createdAt
});

module.exports = SocialDTO;