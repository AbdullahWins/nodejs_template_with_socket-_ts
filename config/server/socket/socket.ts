import { Server as SocketIOServer } from "socket.io";

let ioInstance: SocketIOServer | undefined;

const setIoInstance = (io: SocketIOServer): void => {
  ioInstance = io;
};

const getIoInstance = (): SocketIOServer => {
  if (!ioInstance) {
    throw new Error("Socket.io instance not set!");
  }
  return ioInstance;
};

export { setIoInstance, getIoInstance };
