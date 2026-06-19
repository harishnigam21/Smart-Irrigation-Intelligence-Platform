import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import UserSlice from "./slices/UserSlice";
import SocketSlice from "./slices/SocketSlice";
import AlertSlice from "./slices/AlertSlice";
import LayoutSlice from "./slices/LayoutSlice";
import SummarySlice from "./slices/SummarySlice";
import { socketMiddleware } from "./socketMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
enableMapSet();
export const store = configureStore({
  reducer: {
    user: UserSlice,
    socket: SocketSlice,
    alert: AlertSlice,
    layout: LayoutSlice,
    summary: SummarySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
