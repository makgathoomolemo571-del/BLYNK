const EVENTS = require("./signaling.events");

module.exports = function registerWatchPartySignaling(io) {

  io.on(EVENTS.CONNECTION, (socket) => {

    console.log(`Socket connected: ${socket.id}`);

    socket.on(EVENTS.JOIN_WATCHPARTY, ({ watchPartyId, userId }) => {

      socket.join(watchPartyId);

      const room = io.sockets.adapter.rooms.get(watchPartyId);

      io.to(watchPartyId).emit(
        EVENTS.VIEWER_COUNT,
        room ? room.size : 0
      );

    });

    socket.on(EVENTS.LEAVE_WATCHPARTY, ({ watchPartyId }) => {

      socket.leave(watchPartyId);

      const room = io.sockets.adapter.rooms.get(watchPartyId);

      io.to(watchPartyId).emit(
        EVENTS.VIEWER_COUNT,
        room ? room.size : 0
      );

    });

    socket.on(EVENTS.OFFER, ({ roomId, offer }) => {

      socket.to(roomId).emit(EVENTS.OFFER, {
        socketId: socket.id,
        offer
      });

    });

    socket.on(EVENTS.ANSWER, ({ roomId, answer }) => {

      socket.to(roomId).emit(EVENTS.ANSWER, {
        socketId: socket.id,
        answer
      });

    });

    socket.on(EVENTS.ICE_CANDIDATE, ({ roomId, candidate }) => {

      socket.to(roomId).emit(EVENTS.ICE_CANDIDATE, {
        socketId: socket.id,
        candidate
      });

    });

    socket.on(EVENTS.CHAT_MESSAGE, (payload) => {

      io.to(payload.watchPartyId).emit(
        EVENTS.CHAT_MESSAGE,
        payload
      );

    });

    socket.on(EVENTS.START_STREAM, ({ watchPartyId }) => {

      io.to(watchPartyId).emit(EVENTS.START_STREAM);

    });

    socket.on(EVENTS.STOP_STREAM, ({ watchPartyId }) => {

      io.to(watchPartyId).emit(EVENTS.STOP_STREAM);

    });

    socket.on(EVENTS.DISCONNECT, () => {

      console.log(`Socket disconnected: ${socket.id}`);

    });

  });

};