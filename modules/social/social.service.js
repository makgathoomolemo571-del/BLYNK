const Social =
require("./social.model");

const mapper =
require("./social.mapper");
const Profile = require("../profile/profile.model");

const eventBus =
require("../../shared/eventBus");

const events =
require("./social.events");

const FriendRequest = require("../social/friendRequest.model");
const User = require("../user/user.model");

exports.follow = async (userId, targetUserId) => {

  if (String(userId) === String(targetUserId)) {
    throw new Error("You cannot follow yourself");
  }

  const existing = await Social.findOne({
    user: userId,
    targetUser: targetUserId,
    relationshipType: "follow",
    isDeleted: false
  });

  if (existing) {
    return mapper.toDTO(existing);
  }

  const social = await Social.create({

    user: userId,

    targetUser: targetUserId,

    relationshipType: "follow",

    status: "accepted",

    isDeleted: false

  });

  eventBus.emit(
    events.USER_FOLLOWED,
    social
  );

  return mapper.toDTO(social);
};

exports.unfollow = async (userId, targetId) => {
  await Social.updateOne(
    {
      user: userId,
      targetUser: targetId,
      relationshipType: "follow",
      isDeleted: false
    },
    {
      $set: {
        isDeleted: true
      }
    }
  );

  eventBus.emit("USER_UNFOLLOWED", {
    userId,
    targetId
  });

  return {
    success: true
  };
};

exports.block =
async (userId, targetUserId) => {

  const social =
  await Social.create({

    user: userId,

    targetUser: targetUserId,

    relationshipType:
      "blocked"

  });

  console.log({
  userId,
  targetUserId
});

 await this.unfollow(userId, targetUserId);
await this.unfollow(targetUserId, userId);

  eventBus.emit(
    events.USER_BLOCKED,
    social
  );

  return mapper.toDTO(
    social
  );
};

exports.getFollowers = async (userId) => {

    const followers = await Social.find({
        targetUser: userId,
        relationshipType: "follow",
        isDeleted: false
    }).populate(
        "user",
        "username displayName profilePicture"
    );

    return followers.map(f => f.user);

};

exports.getFollowing = async (userId) => {

    const following = await Social.find({
        user: userId,
        relationshipType: "follow",
        isDeleted: false
    })
    .populate(
        "targetUser",
        "username displayName profilePicture"
    );

    return following.map(item => item.targetUser);

};

exports.unblock = async (userId, targetId) => {
  await Social.updateOne(
    { user: userId },
    {
      $pull: { blockedUsers: { user: targetId } }
    }
  );

  eventBus.emit("USER_UNBLOCKED", { userId, targetId });

  return { success: true };
};

// ======================
// MUTE
// ======================
exports.mute = async (userId, targetId) => {
  await Social.findOneAndUpdate(
    { user: userId },
    {
      $addToSet: { mutedUsers: { user: targetId } }
    },
    { upsert: true }
  );

  return { success: true };
};

// ======================
// UNMUTE
// ======================
exports.unmute = async (userId, targetId) => {
  await Social.updateOne(
    { user: userId },
    {
      $pull: { mutedUsers: { user: targetId } }
    }
  );

  return { success: true };
};



// ======================
// SUGGESTIONS (basic version)
// ======================
exports.suggestions = async (userId) => {

    const social = await Social.find({
    user:userId,
    relationshipType:"follow"
});
    const followingIds =
        social?.following?.map(f => f.user.toString()) || [];

    const friendIds =
        social?.friends?.map(f => f.user.toString()) || [];

    const blockedIds =
        social?.blocked?.map(b => b.user.toString()) || [];

    const users = await User.find({
        _id: {
            $nin: [...followingIds, userId]
        }
    }).select(
        "username displayName profilePicture"
    );

    const results = [];

    for (const user of users) {

        const sent = await FriendRequest.findOne({
            from: userId,
            to: user._id,
            status: "pending"
        });

        const received = await FriendRequest.findOne({
            from: user._id,
            to: userId,
            status: "pending"
        });

        const following = await Social.find({
    user: userId,
    relationshipType: "follow",
    status: "accepted"
});

const friends = await Social.find({
    user: userId,
    relationshipType: "friend",
    status: "accepted"
});

const blocked = await Social.find({
    user: userId,
    relationshipType: "blocked"
});

const followingIds =
following.map(x => x.targetUser.toString());
console.log("FRIENDS:", friends);
const friendIds =
friends.map(x => x.targetUser.toString());

const blockedIds =
blocked.map(x => x.targetUser.toString());


        results.push({

            _id: user._id,

            username: user.username,

            displayName: user.displayName,

            profilePicture: user.profilePicture,

            isFollowing:
                followingIds.includes(
                    user._id.toString()
                ),

            isFriend:
                friendIds.includes(
                    user._id.toString()
                ),

            blocked:
                blockedIds.includes(
                    user._id.toString()
                ),

            requestSent: !friendIds.includes(user._id.toString()) && !!sent,

            requestReceived: !friendIds.includes(user._id.toString()) && !!received,

            requestId:
                sent?._id ||
                received?._id ||
                null

        });

    }

    return results;

};
// SEND REQUEST
exports.sendFriendRequest = async (from, to) => {

    console.log("FROM:", from);
    console.log("TO:", to);
    console.log("TYPE OF TO:", typeof to);

    const exists = await FriendRequest.findOne({ from, to });

    if (exists) {
        return { message: "Request already exists" };
    }

    const request = await FriendRequest.create({
        from,
        to,
        status: "pending"
    });

    return request;
};
// CANCEL REQUEST
exports.cancelFriendRequest = async (from, to) => {
  await FriendRequest.deleteOne({ from, to, status: "pending" });
  return { success: true };
};

// ACCEPT REQUEST
exports.acceptFriendRequest = async (userId, requestId) => {

    const request = await FriendRequest.findById(requestId);

    if (!request) {
        throw new Error("Friend request not found");
    }

    await FriendRequest.updateOne(
        { _id: requestId },
        { status: "accepted" }
    );

    await Social.create({
        user: request.from,
        targetUser: request.to,
        relationshipType: "friend",
        status: "accepted"
    });

    await Social.create({
        user: request.to,
        targetUser: request.from,
        relationshipType: "friend",
        status: "accepted"
    });

    return { success: true };
};

// REJECT REQUEST
exports.rejectFriendRequest = async (userId, from) => {
  await FriendRequest.updateOne(
    { from, to: userId },
    { status: "rejected" }
  );

  return { success: true };
};

// UNFRIEND
exports.unfriend = async (userId, friendId) => {
  await FriendRequest.deleteMany({
    $or: [
      { from: userId, to: friendId },
      { from: friendId, to: userId }
    ]
  });

  return { success: true };
};

// LISTS
exports.getFriends = async (userId) => {

  const friends = await Social.find({
        user: userId,
        relationshipType: "friend",
        status: "accepted",
        isDeleted: false
    }).populate(
        "targetUser",
        "username displayName profilePicture"
    );



    return friends.map(friend => friend.targetUser);

};

exports.getFriendRequests = async (userId) => {
    const requests = await FriendRequest.find({
        to: userId,
        status: "pending"
    })
    .populate("from");

    return requests.map(request => ({
        ...request.from.toObject(),

        requestId: request._id,
        requestReceived: true
    }));
};

exports.getSentRequests = async (userId) => {
  return await FriendRequest.find({
    from: userId,
    status: "pending"
  });
};

// ======================
// REAL SOCIAL STATISTICS
// ======================
exports.getStats = async (userId) => {
  const [
    followers,
    following,
    friends,
    blocked
  ] = await Promise.all([

    Social.countDocuments({
      targetUser: userId,
      relationshipType: "follow",
      isDeleted: false
    }),

    Social.countDocuments({
      user: userId,
      relationshipType: "follow",
      isDeleted: false
    }),

    Social.countDocuments({
      user: userId,
      relationshipType: "friend",
      status: "accepted",
      isDeleted: false
    }),

    Social.countDocuments({
      user: userId,
      relationshipType: "blocked",
      isDeleted: false
    })

  ]);

  return {
    followers,
    following,
    friends,
    blocked
  };
};