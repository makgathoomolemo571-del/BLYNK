class StoryDTO {
  constructor(story) {
    this.id = story._id;

    this.creator = story.creator
      ? {
          id: story.creator._id,
          username: story.creator.username,
          profilePicture: story.creator.profilePicture,
        }
      : null;

    this.media = story.media;
    this.caption = story.caption;
    this.type = story.type;

   this.stats = {

    views: story.views,

    reactions: story.reactions.length,

    replies: story.replies.length

    };

   this.replies = story.replies;

this.reactions = story.reactions;

    this.expiresAt = story.expiresAt;
    this.createdAt = story.createdAt;
  }
}

module.exports = StoryDTO;