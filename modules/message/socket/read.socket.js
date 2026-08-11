// src/modules/messages/socket/read.socket.js

module.exports = (io, socket) => {

  /**
   * =====================================
   * MARK MESSAGE AS READ
   * =====================================
   */
  socket.on(
    "message:read",
    async ({ conversationId, messageId, userId }) => {

      try {

        /**
         * Broadcast to everyone in conversation
         */

        io.to(conversationId).emit(
          "message:read",
          {
            conversationId,
            messageId,
            userId,
            readAt: new Date()
          }
        );

      } catch (err) {

        console.error(
          "READ SOCKET ERROR",
          err
        );

      }

    }
  );

  /**
   * =====================================
   * MARK ALL AS READ
   * =====================================
   */
  socket.on(
    "conversation:read",
    async ({ conversationId, userId }) => {

      try {

        io.to(conversationId).emit(
          "conversation:read",
          {
            conversationId,
            userId,
            readAt: new Date()
          }
        );

      } catch (err) {

        console.error(
          "CONVERSATION READ ERROR",
          err
        );

      }

    }
  );

};