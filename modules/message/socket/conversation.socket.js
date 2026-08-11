// src/modules/messages/socket/conversation.socket.js

const Conversation = require("../conversation/conversation.model");
const Message = require("../message/message.model");

module.exports = (io, socket) => {

  /**
   * =====================================
   * JOIN CONVERSATION
   * =====================================
   */
  socket.on("conversation:join", async (conversationId) => {
    try {

      socket.join(`conversation:${conversationId}`);

      socket.emit("conversation:joined", {
        conversationId
      });

    } catch (err) {

      socket.emit("conversation:error", {
        message: err.message
      });

    }
  });

  /**
   * =====================================
   * LEAVE CONVERSATION
   * =====================================
   */
  socket.on("conversation:leave", (conversationId) => {

    socket.leave(`conversation:${conversationId}`);

    socket.emit("conversation:left", {
      conversationId
    });

  });

  /**
   * =====================================
   * CREATE CONVERSATION
   * =====================================
   */
  socket.on("conversation:create", async (payload) => {

    try {

      const conversation =
        await Conversation.create({

          type:
            payload.type || "private",

          participants:
            payload.participants,

          name:
            payload.name || "",

          photo:
            payload.photo || ""

        });

      io.to(`user:${payload.owner}`)
        .emit(
          "conversation:created",
          conversation
        );

      payload.participants.forEach(userId => {

        io.to(`user:${userId}`)
          .emit(
            "conversation:created",
            conversation
          );

      });

    } catch (err) {

      socket.emit(
        "conversation:error",
        {
          message: err.message
        }
      );

    }

  });

  /**
   * =====================================
   * LOAD HISTORY
   * =====================================
   */
  socket.on(
    "conversation:history",
    async ({ conversationId }) => {

      try {

        const messages =
          await Message.find({

            conversation:
              conversationId,

            isDeleted: false

          })

          .sort({
            createdAt: 1
          })

          .populate(
            "sender",
            "username displayName profilePicture"
          );

        socket.emit(
          "conversation:history",
          messages
        );

      } catch (err) {

        socket.emit(
          "conversation:error",
          {
            message: err.message
          }
        );

      }

    }
  );

  /**
   * =====================================
   * DELETE CONVERSATION
   * =====================================
   */
  socket.on(
    "conversation:delete",
    async ({ conversationId }) => {

      try {

        await Conversation.findByIdAndUpdate(
          conversationId,
          {
            isDeleted: true,
            deletedAt: new Date()
          }
        );

        io.to(
          `conversation:${conversationId}`
        ).emit(
          "conversation:deleted",
          {
            conversationId
          }
        );

      } catch (err) {

        socket.emit(
          "conversation:error",
          {
            message: err.message
          }
        );

      }

    }
  );

};