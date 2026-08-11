class PostDTO {

  constructor(post, currentUser = null) {

    this.id = post._id;

    this.creator = post.creator
      ? {
          id: post.creator._id,
          username: post.creator.username,
          profilePicture: post.creator.profilePicture
        }
      : null;

    this.caption = post.caption || "";

    this.media = post.media || [];

    this.visibility = post.visibility;

    this.liked = currentUser
      ? (post.reactions || []).some(
          r => r.user.toString() === currentUser.toString()
        )
      : false;

    this.saved = currentUser
      ? (post.saves || []).some(
          id => id.toString() === currentUser.toString()
        )
      : false;

    this.stats = {
      likes: post.reactions?.length || 0,
      comments: post.comments?.length || 0,
      shares: post.shares || 0,
      saves: post.saves?.length || 0,
      views: post.views || 0
    };

    this.comments = (post.comments || []).map(comment => ({

      id: comment._id,

      user: comment.user,

      text: comment.text,

      createdAt: comment.createdAt,

      likes: comment.likes || [],

      liked: currentUser
        ? (comment.likes || []).some(
            id => id.toString() === currentUser.toString()
          )
        : false,

      replies: (comment.replies || []).map(reply => ({

        id: reply._id,

        user: reply.user,

        text: reply.text,

        createdAt: reply.createdAt,

        likes: reply.likes || [],

        liked: currentUser
          ? (reply.likes || []).some(
              id => id.toString() === currentUser.toString()
            )
          : false

      }))

    }));

    this.sharedPost = post.sharedPost
      ? {
          id: post.sharedPost._id,

          creator: post.sharedPost.creator
            ? {
                id: post.sharedPost.creator._id,
                username: post.sharedPost.creator.username,
                profilePicture: post.sharedPost.creator.profilePicture
              }
            : null,

          caption: post.sharedPost.caption || "",

          media: post.sharedPost.media || [],

          createdAt: post.sharedPost.createdAt
        }
      : null;

    this.createdAt = post.createdAt;

  }

}

module.exports = PostDTO;