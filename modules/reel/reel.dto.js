class ReelDTO {
  constructor(reel) {
    this.id = reel._id;

    this.creator = reel.creator
      ? {
          id: reel.creator._id,
          username: reel.creator.username,
          profilePicture: reel.creator.profilePicture,
        }
      : null;

    this.caption = reel.caption;
    this.video = reel.video;
    this.visibility = reel.visibility;

    this.stats = {
      views: reel.views || 0,
      likes: reel.reactions?.length || 0,
      comments: reel.comments?.length || 0,
      shares: reel.shares || 0,
      saves: reel.saves?.length || 0,
    };

    // <<< THIS WAS MISSING
    this.comments =
      reel.comments?.map((c) => ({
        id: c._id,
        text: c.text,
        createdAt: c.createdAt,
        user: c.user
          ? {
              id: c.user._id,
              username: c.user.username,
              profilePicture: c.user.profilePicture,
            }
          : null,
      })) || [];

    this.createdAt = reel.createdAt;
  }
}

module.exports = ReelDTO;