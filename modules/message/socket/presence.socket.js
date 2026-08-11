// src/modules/messages/socket/presence.socket.js

const jwt = require("jsonwebtoken");
const User = require("../../user/user.model");

const onlineUsers = new Map();

/**
 * ===========================================
 * USER PRESENCE SOCKET
 * ===========================================
 */

module.exports = (io) => {

  io.on("connection", async (socket) => {

    try {

      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers.authorization?.replace("Bearer ", "");

      if (!token) return;

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      const userId = decoded.id;

      socket.userId = userId;

      socket.join(`user:${userId}`);

      onlineUsers.set(userId, socket.id);

      await User.findByIdAndUpdate(
        userId,
        {
          isOnline: true,
          lastSeen: new Date()
        }
      );

      io.emit("presence:online", {
        userId
      });

      /**
       * ===========================
       * HEARTBEAT
       * ===========================
       */

      socket.on(
        "presence:heartbeat",
        async () => {

          await User.findByIdAndUpdate(
            userId,
            {
              lastSeen: new Date()
            }
          );

        }
      );

      /**
       * ===========================
       * USER STATUS REQUEST
       * ===========================
       */

      socket.on(
        "presence:status",
        async (targetUserId, callback) => {

          const target =
            await User.findById(targetUserId)
              .select(
                "isOnline lastSeen"
              );

          callback({
            online:
              target?.isOnline || false,
            lastSeen:
              target?.lastSeen || null
          });

        }
      );

      /**
       * ===========================
       * DISCONNECT
       * ===========================
       */

      socket.on(
        "disconnect",
        async () => {

          onlineUsers.delete(userId);

          await User.findByIdAndUpdate(
            userId,
            {
              isOnline: false,
              lastSeen: new Date()
            }
          );

          io.emit("presence:offline", {
            userId,
            lastSeen: new Date()
          });

        }
      );

    } catch (err) {

      console.error(
        "Presence Socket Error:",
        err.message
      );

      socket.disconnect(true);

    }

  });

};

/**
 * ===========================================
 * HELPERS
 * ===========================================
 */

module.exports.onlineUsers = onlineUsers;

module.exports.isOnline = (userId) => {

  return onlineUsers.has(
    String(userId)
  );

};

module.exports.getSocketId = (userId) => {

  return onlineUsers.get(
    String(userId)
  );

};