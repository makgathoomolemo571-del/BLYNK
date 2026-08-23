const service =
require("./social.service");
const events = require("./social.events");
const eventBus = require("../../shared/eventBus");

exports.follow =
async (req,res,next) => {

  try {

    const result =
    await service.follow(

      req.user._id,

       req.body.targetUser

    );

    res.status(201)
      .json(result);

  } catch(err) {
    next(err);
  }
};

exports.block =
async (req,res,next) => {

  try {

    const result =
    await service.block(

      req.user._id,

      req.body.targetUserId

    );

    res.status(201)
      .json(result);

  } catch(err) {
    next(err);
  }
};

exports.followers =
async (req,res,next) => {

  try {

    const result =
    await service.getFollowers(
      req.user._id
    );
console.log(result);
    res.json(result);

  } catch(err) {
    next(err);
  }
};

exports.following =
async (req,res,next) => {

  try {

    const result =
    await service.getFollowing(
      req.user._id
    );

    res.json(result);

  } catch(err) {
    next(err);
  }
};

exports.follow = async (req, res, next) => {

    console.log("BODY:", req.body);
    console.log("TARGET:", req.body.targetUserId);

    try {

        const result = await service.follow(
    req.user._id,
    req.body.targetUser
);

        res.status(201).json(result);

    } catch (err) {
        next(err);
    }
};

exports.unfollow = async (req, res, next) => {
  try {
    const result = await service.unfollow(
      req.user._id,
      req.body.targetUser
    );

    res.json({ dto: result });
  } catch (err) {
    next(err);
  }
};

// BLOCK
exports.block = async (req, res, next) => {
  try {
    const result = await service.block(
      req.user._id,
      req.body.targetUserId
    );

    res.json({ dto: result });
  } catch (err) {
    next(err);
  }
};

// UNBLOCK
exports.unblock = async (req, res, next) => {
  try {
    const result = await service.unblock(
      req.user._id,
      req.body.targetUserId
    );

    res.json({ dto: result });
  } catch (err) {
    next(err);
  }
};

// MUTE
exports.mute = async (req, res, next) => {
  try {
    const result = await service.mute(
      req.user._id,
      req.body.targetUserId
    );

    res.json({ dto: result });
  } catch (err) {
    next(err);
  }
};

// UNMUTE
exports.unmute = async (req, res, next) => {
  try {
    const result = await service.unmute(
      req.user._id,
      req.body.targetUserId
    );

    res.json({ dto: result });
  } catch (err) {
    next(err);
  }
};


// SUGGESTIONS
exports.suggestions = async (req, res, next) => {
  try {
    const result = await service.suggestions(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};


// ===================== FRIEND REQUEST =====================

exports.sendFriendRequest = async (req, res, next) => {
  try {
console.log("BODY:", req.body);
    const { targetUser } = req.body;

    if (!targetUser) {
      return res.status(400).json({
        message: "targetUserId is required"
      });
    }

    const result =
      await service.sendFriendRequest(
        req.user._id,
        targetUser
      );

    eventBus.emit(
      events.FRIEND_REQUEST_SENT,
      result
    );

    res.json(result);

  } catch (err) {
    
    next(err);
  }
};

exports.cancelFriendRequest = async (req, res, next) => {
  try {
    const result = await service.cancelFriendRequest(
      req.user._id,
      req.body.userId
    );

    eventBus.emit(events.FRIEND_REQUEST_CANCELLED, result);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.acceptFriendRequest = async (req, res, next) => {
  try {
    const result = await service.acceptFriendRequest(
    req.user._id,
    req.body.requestId
);
    eventBus.emit(events.FRIEND_REQUEST_ACCEPTED, result);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.rejectFriendRequest = async (req, res, next) => {
  try {
    const result = await service.rejectFriendRequest(
      req.user._id,
      req.body.userId
    );

    eventBus.emit(events.FRIEND_REQUEST_REJECTED, result);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.unfriend = async (req, res, next) => {
  try {
    const result = await service.unfriend(
      req.user._id,
      req.body.userId
    );

    eventBus.emit(events.FRIEND_REMOVED, result);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

// ===================== LISTS =====================

exports.friends = async (req, res, next) => {
  try {
    const result = await service.getFriends(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.friendRequests = async (req, res, next) => {
  try {
    const result = await service.getFriendRequests(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.sentRequests = async (req, res, next) => {
  try {
    console.log(
 "FRIEND REQUEST BODY:",
 req.body
);
    const result = await service.getSentRequests(req.user._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res) => {

  try {

    const stats =
      await socialService.getStats(
        req.params.userId
      );

    return res.status(200).json({
      success: true,
      data: stats
    });

  } catch (error) {

    console.error(
      "SOCIAL STATS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};