const Post = require("./post.model");
const PostDTO = require("./post.dto");

const service =
require("./post.service");

exports.create =
async (req,res,next) => {

  try {

    const result =
    await service.create(
      req.user._id,
      req.body
    );

    

    res.status(201)
      .json(result);

  } catch(err) {
    next(err);
  }
};

// FEED
exports.feed = async (req, res, next) => {
  try {
    const result = await service.feed(req.user._id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.save = async(req,res,next)=>{

try{

const result =
await service.save(
req.params.id,
req.user._id
);

res.json(result);

}catch(err){

next(err);

}

};

exports.hide = async(req,res,next)=>{

try{

await service.hide(
req.params.id
);

res.json({
success:true
});


}catch(err){

next(err);

}

};

// GET ONE
exports.getOne = async (req, res, next) => {
  try {
    const result = await service.getOne(req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
};

// LIKE
exports.like = async (req, res, next) => {
  try {
    await service.like(req.params.id, req.user._id);
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};

// UNLIKE
exports.unlike = async (req, res, next) => {
  try {
    await service.unlike(req.params.id, req.user._id);
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};

// COMMENT
exports.comment = async (req, res, next) => {
  
  try {
    await service.comment(
      req.params.id,
      req.user._id,
      req.body.text
    );

    

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};

// DELETE
exports.delete = async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};

// SHARE
exports.share = async(req,res,next)=>{

try{

const post=

await service.share(

req.params.id,

req.user._id,

req.body.caption

);

res.json(post);

}catch(err){

next(err);

}

};
// REPORT
exports.report = async (req, res, next) => {
  try {
    await service.report(
      req.params.id,
      req.user._id,
      req.body.reason
    );

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {

    try {

        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only edit your own post."
            });
        }

        if (req.body.caption !== undefined)
            post.caption = req.body.caption;

        if (req.body.visibility)
            post.visibility = req.body.visibility;

        // If frontend sends a media array
        if (Array.isArray(req.body.media))
            post.media = req.body.media;

        post.updatedAt = new Date();

        await post.save();

        await post.populate("creator");

        return res.json({
            success: true,
            post: new PostDTO(post, req.user._id)
        });

    } catch (err) {
        next(err);
    }

};

exports.likeComment =
async (req,res,next) => {

  try {

    const result =
      await service.likeComment(
        req.params.postId,
        req.params.commentId,
        req.user._id
      );

    res.json(result);

  } catch(err) {
    next(err);
  }
};

exports.unlikeComment = async (req, res, next) => {
  try {
    const result = await service.unlikeComment(
      req.params.id,
      req.params.commentId,
      req.user._id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.editComment = async (req, res, next) => {
  try {
    const result = await service.editComment(
      req.params.id,
      req.params.commentId,
      req.user._id,
      req.body.text
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.replyComment = async (req, res, next) => {
  try {
    const result = await service.replyComment(
      req.params.id,
      req.params.commentId,
      req.user._id,
      req.body.text
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const result = await service.deleteComment(
      req.params.id,
      req.params.commentId,
      req.user._id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.likeReply =
async (req,res,next) => {

  try {

    const result =
    await service.likeReply(

      req.params.id,

      req.params.commentId,

      req.params.replyId,

      req.user._id

    );

    res.json(result);

  } catch(err) {
    next(err);
  }
};

exports.unlikeReply =
async (req,res,next) => {

  try {

    const result =
    await service.unlikeReply(

      req.params.id,

      req.params.commentId,

      req.params.replyId,

      req.user._id

    );

    res.json(result);

  } catch(err) {
    next(err);
  }
};

exports.deleteReply = async (req, res) => {
  try {
    const { id, commentId, replyId } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    const reply = comment.replies.id(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "Reply not found"
      });
    }

    if (reply.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not allowed"
      });
    }

    reply.deleteOne();

    await post.save();

    return res.json({
      success: true,
      message: "Reply deleted"
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.savedPosts = async (req, res, next) => {
    try {
        const posts =
            await service.savedPosts(req.user.id);

        res.json(posts);
    } catch (err) {
        next(err);
    }
};