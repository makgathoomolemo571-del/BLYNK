const Post =
require("./post.model");
const {
sendNotification
}
=
require("../notification/notification.helper");
const mapper =
require("./post.mapper");

const eventBus = require("../../shared/eventBus");
const EVENTS = require("./post.events");


exports.create = async (userId, data) => {

  const post = await Post.create({
    creator: userId,

    caption: data.caption || "",

    visibility: data.visibility || "public",

    media: Array.isArray(data.media)
      ? data.media
      : []
  });

  await post.populate({
    path: "creator",
    select: "username profilePicture"
  });

  if (post.sharedPost) {
    await post.populate({
      path: "sharedPost",
      populate: {
        path: "creator",
        select: "username profilePicture"
      }
    });
  }

  await sendNotification({
    recipient: userId,
    actor: userId,
    type: "POST_CREATED",
    title: "Post Published",
    message: "Your post is now live",
    entityType: "POST",
    entityId: post._id
  });

  eventBus.emit(
    EVENTS.POST_CREATED,
    {
      postId: post._id,
      userId
    }
  );

  return mapper.toDTO(post);
};


exports.save = async(postId,userId)=>{

const post =
await Post.findById(postId);

if(!post)
throw new Error("Post not found");


const exists =
post.saves.some(
id=>id.toString()===userId.toString()
);


if(!exists){

post.saves.push(userId);

}else{

post.saves =
post.saves.filter(
id=>id.toString()!==userId.toString()
);

}


await post.save();


return {
saved:!exists
};

};

exports.hide = async(id)=>{

await Post.findByIdAndUpdate(
id,
{
status:"hidden"
}
);

return true;

};

// FEED
exports.feed = async () => {
  const posts = await Post.find({ isDeleted: false })
   .populate("creator", "username profilePicture")
.populate("comments.user", "username profilePicture")
.populate("comments.replies.user", "username profilePicture")
.populate({
    path: "sharedPost",
    populate: {
        path: "creator",
        select: "username profilePicture"
    }
})


    .sort({ createdAt: -1 });
console.log(JSON.stringify(posts[0], null, 2));
  return mapper.toDTOList(posts);
};

// GET ONE
exports.getOne = async (id) => {
  const post = await Post.findById(id)

.populate(
    "creator",
    "username profilePicture"
)

.populate(
    "comments.user",
    "username profilePicture"
)

.populate(
    "comments.replies.user",
    "username profilePicture"
)

.populate({
    path: "sharedPost",
    populate: {
        path: "creator",
        select: "username profilePicture"
    }
});

  return mapper.toDTO(post);
};

// LIKE
exports.like = async (postId, userId) => {

  const post = await Post.findById(postId);

  if (!post) throw new Error("Post not found");

  const alreadyLiked =
    post.reactions.some(
      r => r.user.toString() === userId.toString()
    );

  if (alreadyLiked) return post;

  post.reactions.push({
    user: userId,
    type: "like"
  });

  await post.save();

  return post;
};

// UNLIKE
exports.unlike = async (postId, userId) => {
  const post = await Post.findById(postId);

  post.reactions = (post.reactions || [])
  .filter(
    (r) =>
      r.user.toString() !== userId.toString()
  );

  await post.save();

  eventBus.emit(EVENTS.POST_UNLIKED, { postId, userId });

  return true;
};

// COMMENT
exports.comment = async (postId, userId, text) => {

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  post.comments.push({
    user: userId,
    text
  });

  await post.save();

  eventBus.emit(
    EVENTS.POST_COMMENTED,
    {
      postId,
      userId
    }
  );

  return post.comments[
    post.comments.length - 1
  ];
};

// DELETE POST
exports.delete = async (id) => {
  await Post.findByIdAndUpdate(id, {
    isDeleted: true
  });

  eventBus.emit(EVENTS.POST_DELETED, { id });

  return true;
};

// SHARE
exports.share = async (
    postId,
    userId,
    caption=""
)=>{

    const original = await Post.findById(postId);

const originalPost =
    original.sharedPost
        ? original.sharedPost
        : original._id;

const shared = await Post.create({
    creator: userId,
    caption,
    sharedPost: originalPost,
    visibility: "public"
});

    return mapper.toDTO(shared,userId);

};

// REPORT
exports.report = async (postId, userId, reason) => {
  const post = await Post.findById(postId);

  post.reports.push({
    user: userId,
    reason
  });

  await post.save();

  eventBus.emit(EVENTS.POST_REPORTED, { postId, userId });

  return true;
};

exports.update = async (
  postId,
  userId,
  payload
) => {

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (
    post.creator.toString() !== userId.toString()
  ) {
    throw new Error("Unauthorized");
  }

  if (payload.caption)
    post.caption = payload.caption;

  if (payload.visibility)
    post.visibility = payload.visibility;

  await post.save();

  return mapper.toDTO(post);
};

exports.likeComment =
async (
  postId,
  commentId,
  userId
) => {

  console.log("POST ID:", postId);
  console.log("COMMENT ID:", commentId);

  const post =
    await Post.findById(postId);

  console.log("POST FOUND:", post);

  if (!post) {
    throw new Error("Post not found");
  }

  const comment =
    post.comments.id(commentId);

  console.log("COMMENT FOUND:", comment);

  if (!comment) {
    throw new Error("Comment not found");
  }

  const exists =
    comment.likes.some(
      id => id.toString() === userId.toString()
    );

  if (!exists) {
    comment.likes.push(userId);
  }

  await post.save();

  return {
    success: true
  };
};

exports.unlikeComment = async (
  postId,
  commentId,
  userId
) => {

  const post = await Post.findOne({
    _id: postId,
    "comments._id": commentId
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const comment =
    post.comments.id(commentId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  comment.likes =
    comment.likes.filter(
      id =>
        id.toString() !== userId.toString()
    );

  await post.save();

  return {
    success: true
  };
};

exports.editComment = async (
  postId,
  commentId,
  userId,
  text
) => {

  const post = await Post.findOne({
  "comments._id": commentId
});

  const comment =
    post.comments.id(commentId);

  if (!comment)
    throw new Error("Comment not found");

  if (
    comment.user.toString() !==
    userId.toString()
  ) {
    throw new Error("Unauthorized");
  }

  comment.text = text;

  await post.save();

  return {
    success: true
  };
};

exports.replyComment = async (
  postId,
  commentId,
  userId,
  text
) => {

  console.log("POST ID:", postId);
  console.log("COMMENT ID:", commentId);

  const post = await Post.findById(postId);

  console.log("POST FOUND:", !!post);

  console.log(
    "COMMENTS:",
    post.comments.map(c => ({
      id: c._id.toString(),
      text: c.text
    }))
  );

  const comment = post.comments.id(commentId);

  console.log("FOUND COMMENT:", comment);

  if (!comment) {
    throw new Error("Comment not found");
  }

  comment.replies.push({
    user: userId,
    text
  });

  await post.save();

  return { success: true };
};

exports.deleteComment = async (
  postId,
  commentId,
  userId
) => {

  const post = await Post.findOne({
  "comments._id": commentId
});


  const comment =
    post.comments.id(commentId);

  if (!comment)
    throw new Error("Comment not found");

  if (
    comment.user.toString() !==
    userId.toString()
  ) {
    throw new Error("Unauthorized");
  }

  comment.deleteOne();

  await post.save();

  return {
    success: true
  };
};

exports.likeReply =
async (
  postId,
  commentId,
  replyId,
  userId
) => {

  const post =
  await Post.findById(postId);

  const comment =
  post.comments.id(commentId);

  const reply =
  comment.replies.id(replyId);

  const alreadyLiked =
  reply.likes.some(
    id =>
      id.toString() ===
      userId.toString()
  );

  if (!alreadyLiked) {
    reply.likes.push(userId);
  }

  await post.save();

  return {
    success: true
  };
};

exports.unlikeReply =
async (
  postId,
  commentId,
  replyId,
  userId
) => {

  const post =
  await Post.findById(postId);

  const comment =
  post.comments.id(commentId);

  const reply =
  comment.replies.id(replyId);

  reply.likes =
  reply.likes.filter(
    id =>
      id.toString() !==
      userId.toString()
  );

  await post.save();

  return {
    success: true
  };
};

// post.service.js

exports.savedPosts = async (userId) => {
    const posts = await Post.find({
        saves: userId,
        isDeleted: false
    })
        .populate(
            "creator",
            "username profilePicture"
        )
        .sort({
            createdAt: -1
        });

    return mapper.toDTOList(posts);
};