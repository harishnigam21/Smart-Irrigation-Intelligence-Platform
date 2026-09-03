"use client";
import {
  setSelectedSidebarItem,
  setSwitchLoading,
} from "@/store/slices/AlertSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { BookMarked, Clock, Dot, Inbox, Star, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import MainHeader from "../repeated/MainHeader";

export default function AlertHeaderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBar, setSideBar] = useState<boolean>(false);
  const alerts = useAppSelector((store) => store.alert);
  const selectedSidebarItem = alerts.selectedSidebarItem;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const barRef = useRef<HTMLDivElement>(null);
  const screenWidth = useAppSelector((store) => store.layout.screenSize.width);
  useEffect(() => {
    if (alerts.switchLoading.switch.length > 2 && alerts.switchLoading.status) {
      switch (alerts.switchLoading.switch) {
        case "inbox":
          dispatch(setSelectedSidebarItem("inbox"));
          router.push("/alerts");
          break;
        case "star":
          dispatch(setSelectedSidebarItem("star"));
          router.push("/alerts?sr=1");
          break;
        case "important":
          dispatch(setSelectedSidebarItem("important"));
          router.push("/alerts?im=1");
          break;
        case "trash":
          dispatch(setSelectedSidebarItem("trash"));
          router.push("/alerts?tr=1");
          break;
        default:
          break;
      }
    }
  }, [alerts.switchLoading, router]);
  useEffect(() => {
    if (searchParams.get("sr") === "1")
      dispatch(setSelectedSidebarItem("star"));
    if (searchParams.get("tr") === "1")
      dispatch(setSelectedSidebarItem("trash"));
    if (searchParams.get("im") === "1")
      dispatch(setSelectedSidebarItem("important"));
  }, []);
  useEffect(() => {
    if (!barRef.current) return;
    if (sideBar && screenWidth <= 480) {
      barRef.current.classList.remove("w-0");
      barRef.current.classList.add(
        "fixed",
        "z-1",
        "left-0",
        "bg-bgprimary",
        "h-full",
        "px-2",
      );
    } else {
      barRef.current.classList.add("w-0");
      barRef.current.classList.remove(
        "fixed",
        "z-1",
        "left-0",
        "bg-bgprimary",
        "h-full",
        "px-2",
      );
    }
  }, [sideBar, screenWidth]);
  return (
    <section className="w-full h-screen bg-bgprimary text-textPri">
      <MainHeader
        setSideBar={setSideBar}
        title="Alerts"
        type="alerts"
        filterArray={["Read", "UnRead"]}
      />
      <article className="w-full h-full flex flex-nowrap pt-15">
        {/* sidebar */}
        <article
          ref={barRef}
          className={`max-h-full overflow-auto w-0 min-[480]:min-w-fit min-[480]:px-2 flex flex-col py-4 `}
          onMouseOver={() => setSideBar(true)}
          onMouseOut={() => setSideBar(false)}
        >
          <div
            className={`flex items-center cursor-pointer mb-4 flex-nowrap py-1 px-3 rounded-full hover:bg-pri/20 active:bg-pri/20  ${selectedSidebarItem == "inbox" && "bg-pri/20"} overflow-hidden transition-all`}
            onClick={() => {
              dispatch(setSwitchLoading({ status: true, switch: "inbox" }));
            }}
          >
            <div className={`relative`}>
              <Inbox size={18} />
              <Dot color="red" className="absolute -top-5 -right-5 size-10" />
            </div>
            <p
              className={`${sideBar ? "min-w-20 max-w-40 overflow-hidden opacity-100 pl-2" : "max-w-0 p-0 opacity-0"} transition-all duration-200`}
            >
              Inbox
            </p>
          </div>
          <div
            className={`flex items-center cursor-pointer mb-4 flex-nowrap py-1 px-3 rounded-full hover:bg-pri/20 active:bg-pri/20 ${selectedSidebarItem == "star" && "bg-pri/20"} overflow-hidden transition-all`}
            onClick={() => {
              dispatch(setSwitchLoading({ status: true, switch: "star" }));
            }}
          >
            <div className={`relative`}>
              <Star size={18} />
            </div>
            <p
              className={`${sideBar ? "min-w-20 max-w-40 overflow-hidden opacity-100 pl-2" : "max-w-0 p-0 opacity-0"} transition-all duration-200`}
            >
              Starred
            </p>
          </div>
          <div className="flex items-center cursor-pointer mb-4 flex-nowrap py-1 px-3 rounded-full hover:bg-pri/20 active:bg-pri/20 overflow-hidden transition-all">
            <div className={`relative`}>
              <Clock size={18} />
            </div>
            <p
              className={`${sideBar ? "min-w-20 max-w-40 overflow-hidden opacity-100 pl-2" : "max-w-0 p-0 opacity-0"} transition-all duration-200`}
            >
              Snoozed
            </p>
          </div>
          <div
            className={`flex items-center cursor-pointer mb-4 flex-nowrap py-1 px-3 rounded-full hover:bg-pri/20 active:bg-pri/20 ${selectedSidebarItem == "important" && "bg-pri/20"} overflow-hidden transition-all`}
            onClick={() => {
              dispatch(setSwitchLoading({ status: true, switch: "important" }));
            }}
          >
            <div className={`relative`}>
              <BookMarked size={18} />
            </div>
            <p
              className={`${sideBar ? "min-w-20 max-w-40 overflow-hidden opacity-100 pl-2" : "max-w-0 p-0 opacity-0"} transition-all duration-200`}
            >
              Important
            </p>
          </div>
          <div
            className={`flex items-center cursor-pointer mb-4 flex-nowrap py-1 px-3 rounded-full hover:bg-pri/20 active:bg-pri/20 ${selectedSidebarItem == "trash" && "bg-pri/20"} overflow-hidden transition-all`}
            onClick={() => {
              dispatch(setSwitchLoading({ status: true, switch: "trash" }));
            }}
          >
            <div className={`relative`}>
              <Trash size={18} />
            </div>
            <p
              className={`${sideBar ? "min-w-20 max-w-40 overflow-hidden opacity-100 pl-2" : "max-w-0 p-0 opacity-0"} transition-all duration-200`}
            >
              Trash
            </p>
          </div>
        </article>
        {children}
      </article>
    </section>
  );
}
