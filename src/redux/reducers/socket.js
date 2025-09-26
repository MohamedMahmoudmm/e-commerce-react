// socket.js
import { io } from "socket.io-client";

let socket;

export const initSocket = (myId, myRole) => {
  socket = io("http://127.0.0.1:3000");
  socket.emit("user-online", { userId: myId, role: myRole });
  return socket;
};

export const getSocket = () => socket;
