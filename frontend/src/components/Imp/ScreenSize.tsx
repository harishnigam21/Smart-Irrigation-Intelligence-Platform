"use client";
import { setScreenSize } from "@/store/slices/LayoutSlice";
import { useAppDispatch } from "@/store/Store";
import { useEffect } from "react";

export default function ScreenSize() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(
        setScreenSize({ width: window.innerWidth, height: window.innerHeight }),
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
  return null;
}
