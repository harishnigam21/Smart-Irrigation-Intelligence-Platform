import { Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import envVariables from "../../envConfig";
import { setConnectionStatus } from "./slices/SocketSlice";
import { addAlertWS, Alert } from "./slices/AlertSlice";
import { addReading, ReadingData, setAlertID } from "./slices/SummarySlice";

let socket: Socket | null = null;

export const socketMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    if (action.type === "socket/connect") {
      const userId = action.payload;
      if (!socket && userId) {
        socket = io(envVariables.BACKEND_HOST, {
          query: { userID: userId },
          autoConnect: true,
        });

        socket.on("connect", () => {
          store.dispatch(setConnectionStatus(true));
        });

        socket.on("disconnect", () => {
          store.dispatch(setConnectionStatus(false));
        });
        socket.on("newAlert", (payload: Alert) => {
          store.dispatch(addAlertWS(payload));
          store.dispatch(setAlertID(payload._id));
        });
        socket.on("newReading", (payload: ReadingData) => {
          store.dispatch(addReading(payload));
        });
      }
    }

    if (action.type === "socket/disconnect" && socket) {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("newAlert");
      socket.off("newReading");
      socket.disconnect();
      socket = null;
    }

    return next(action);
  };
