import { Server } from "socket.io";
import envVariables from "../envConfig";

export let io: Server;
export const userSocketIds = new Map<string, Set<string>>();
export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: envVariables.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userID = socket.handshake.query.userID as string;
    console.log("User connected:", userID);
    if (!userID) return;
    if (!userSocketIds.has(userID)) {
      userSocketIds.set(userID, new Set());
    }
    userSocketIds.get(userID)!.add(socket.id);
    io.emit("getOnlineUsers", Object.keys(userSocketIds));
    socket.on("disconnect", () => {
      console.log("User disconnected:", userID);
      io.emit("getOfflineUsers", userID);
      userSocketIds.get(userID)?.delete(socket.id);
      io.emit("getOnlineUsers", Object.keys(userSocketIds));
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
};
