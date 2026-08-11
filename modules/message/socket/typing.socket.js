// src/modules/messages/socket/typing.socket.js

/**
 * ==========================================
 * BLYNK
 * Typing Socket
 * ==========================================
 */

const typingUsers = new Map();

/**
 * Register typing events
 */
module.exports = (io, socket) => {

  /**
   * User started typing
   */
  socket.on("typing:start", ({ conversationId, user }) => {

    if (!conversationId || !user) return;

    if (!typingUsers.has(conversationId)) {
      typingUsers.set(conversationId, new Map());
    }

    const users = typingUsers.get(conversationId);

    users.set(socket.id, {
      id: user.id,
      username: user.username,
      avatar: user.avatar || null
    });

    socket.to(conversationId).emit(
      "typing:update",
      Array.from(users.values())
    );

  });

  /**
   * User stopped typing
   */
  socket.on("typing:stop", ({ conversationId }) => {

    if (!conversationId) return;

    const users = typingUsers.get(conversationId);

    if (!users) return;

    users.delete(socket.id);

    socket.to(conversationId).emit(
      "typing:update",
      Array.from(users.values())
    );

  });

  /**
   * Disconnect
   */
  socket.on("disconnect", () => {

    for (const [conversationId, users] of typingUsers.entries()) {

      if (users.has(socket.id)) {

        users.delete(socket.id);

        socket.to(conversationId).emit(
          "typing:update",
          Array.from(users.values())
        );

        if (users.size === 0) {
          typingUsers.delete(conversationId);
        }

      }

    }

  });

};