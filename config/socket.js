const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const onlineUsers = new Map();

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // AUTH MIDDLEWARE FOR SOCKET
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Unauthorized socket connection"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.user._id;

    onlineUsers.set(
    userId.toString(),
    socket.id
);

    console.log("User online:", userId);

    // JOIN PERSONAL ROOM
   socket.join(
    userId.toString()
);

    // MESSAGE SYSTEM
    socket.on("send_message", (data) => {
      const receiverSocketId = onlineUsers.get(data.to);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", data);
      }
    });

    // TYPING INDICATOR
    socket.on("typing", ({ to }) => {
      const receiverSocketId = onlineUsers.get(to);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", { from: userId });
      }
    });

    // DISCONNECT
    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      console.log("User offline:", userId);
    });
  });

  return io;
};

module.exports = initSocket;