"use client";
import { setLoginStatus, setUser } from "@/store/slices/UserSlice";
import { useAppDispatch } from "@/store/Store";
import { User } from "@/types/user";
import { useEffect } from "react";

export default function UserInfo({ userInfo }: { userInfo: User | null }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(setLoginStatus("loading"));
      if (userInfo) {
        dispatch(setLoginStatus("authenticated"));
        dispatch(setUser(userInfo));
        if (userInfo._id) {
          dispatch({ type: "socket/connect", payload: userInfo._id });
        }
      } else {
        throw new Error("Failed to fetch user");
      }
    } catch (error) {
      dispatch(setLoginStatus("unauthenticated"));
      return;
    }

    return () => {
      dispatch({ type: "socket/disconnect" });
    };
  }, []);
  return null;
}
