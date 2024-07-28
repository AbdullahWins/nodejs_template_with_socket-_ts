import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { allowedOrigins } from "../../cors";
// import { handleIndividualMessage } from "../../../src/chats/IndividualChatModule";
// import { handleGroupMessage } from "../../../src/chats/GroupChatModule";
import { setIoInstance } from "./socket";

// Define the type for the Socket.IO instance
let io: SocketIOServer | undefined;

const initializeSocket = (server: HTTPServer): SocketIOServer => {
  // Initialize Socket.IO with the HTTP server
  io = new SocketIOServer(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
    },
  });

  // Set up Socket.IO event handlers
  io.on("connection", (socket: Socket) => {
    // Get the user id from the query
    const { userId } = socket.handshake.query;
    console.log("A user connected with User ID:", userId);
    socket.join(userId as string);

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected with User ID:", userId);
    });

    // Handle individual chat messages
    // socket.on("individual", (data) => handleIndividualMessage(io, data));

    // Handle group chat messages
    // socket.on("group", (data) => handleGroupMessage(io, data));
  });

  // Set the Socket.IO instance
  setIoInstance(io);

  return io;
};

export { initializeSocket };
