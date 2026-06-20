"use client";
import {
  setSelectedSidebarItem,
  setSwitchLoading,
} from "@/store/slices/AlertSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { BookMarked, Clock, Dot, Inbox, Star, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  return (
    <section className="w-full h-screen bg-bgprimary">
      <MainHeader setSideBar={setSideBar} title="Alerts" type="alert" />
      <article className="w-full h-full flex flex-nowrap gap-3 pt-15">
        {/* sidebar */}
        <article
          className={` max-h-full overflow-auto min-w-fit flex flex-col py-4`}
          onMouseOver={() => setSideBar(true)}
          onMouseOut={() => setSideBar(false)}
        >
          <div
            className={`flex items-center cursor-pointer mb-4 flex-nowrap py-1 px-3 rounded-full hover:bg-primary/20 ${selectedSidebarItem == "inbox" && "bg-primary/20"} overflow-hidden transition-all`}
            onClick={() => {
              dispatch(setSwitchLoading({ status: true, switch: "inbox" }));
            }}
          >
            <div className="relative">
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
            className={`flex items-center cursor-pointer mb-4 flex-nowrap py-1 px-3 rounded-full hover:bg-primary/20 ${selectedSidebarItem == "star" && "bg-primary/20"} overflow-hidden transition-all`}
            onClick={() => {
              dispatch(setSwitchLoading({ status: true, switch: "star" }));
            }}
          >
            <Star size={18} />
            <p
              className={`${sideBar ? "min-w-20 max-w-40 overflow-hidden opacity-100 pl-2" : "max-w-0 p-0 opacity-0"} transition-all duration-200`}
            >
              Starred
            </p>
          </div>
          <div className="flex items-center cursor-pointer mb-4 flex-nowrap py-1 px-3 rounded-full hover:bg-primary/20 overflow-hidden transition-all">
            <Clock size={18} />
            <p
              className={`${sideBar ? "min-w-20 max-w-40 overflow-hidden opacity-100 pl-2" : "max-w-0 p-0 opacity-0"} transition-all duration-200`}
            >
              Snoozed
            </p>
          </div>
          <div
            className={`flex items-center cursor-pointer mb-4 flex-nowrap py-1 px-3 rounded-full hover:bg-primary/20 ${selectedSidebarItem == "important" && "bg-primary/20"} overflow-hidden transition-all`}
            onClick={() => {
              dispatch(setSwitchLoading({ status: true, switch: "important" }));
            }}
          >
            <BookMarked size={18} />
            <p
              className={`${sideBar ? "min-w-20 max-w-40 overflow-hidden opacity-100 pl-2" : "max-w-0 p-0 opacity-0"} transition-all duration-200`}
            >
              Important
            </p>
          </div>
          <div
            className={`flex items-center cursor-pointer mb-4 flex-nowrap py-1 px-3 rounded-full hover:bg-primary/20 ${selectedSidebarItem == "trash" && "bg-primary/20"} overflow-hidden transition-all`}
            onClick={() => {
              dispatch(setSwitchLoading({ status: true, switch: "trash" }));
            }}
          >
            <Trash size={18} />
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
