import { io, Socket } from "socket.io-client";
import { Dispatch } from "redux";
import { addMessage } from "../redux/chatSlice";
import { Message } from "../types";

const socketUrl = "ws://localhost:8080";

let socket: Socket;

export const initSocket = (dispatch: Dispatch) => {
  socket = io(socketUrl, {
    transports: ["websocket"],
    withCredentials: true,
  });

  socket.on("connect", () => {});

  socket.on("message", (message: Message) => {
    dispatch(addMessage(message));
  });

  socket.on("disconnect", () => {});
};

export const sendMessage = (message: Message) => {
  if (socket && socket.connected) {
    socket.emit("sendMessage", message);
  } else {
    console.error("Socket is not connected");
  }
};

export const closeSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
  }
};
