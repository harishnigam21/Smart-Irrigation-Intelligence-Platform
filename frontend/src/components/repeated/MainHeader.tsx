"use client";
import { mediaList } from "@/assets/scripts/mediaList";
import {
  CircleQuestionMark,
  Cpu,
  Grip,
  LandPlot,
  LayoutDashboard,
  Menu,
  RadioTower,
  Search,
  Settings,
  Siren,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export default function MainHeader({
  setSideBar,
  title = "",
  type = "",
  bgcolor = false,
}: {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  type?: string;
  bgcolor?: boolean;
}) {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <header
      className={`flex justify-between gap-4 items-center text-textPri p-3 ${bgcolor ? "bg-black/50" : "bg-transparent"} fixed top-0 left-0 w-full z-50 backdrop-blur-xl`}
    >
      <div className="flex gap-4 items-center">
        <Menu onClick={() => setSideBar((prev) => !prev)} />
        <div className="hidden min-[480px]:flex items-center gap-2">
          <Image
            onClick={() => {
              redirect("/");
            }}
            src={mediaList.shortLogo}
            alt="short logo"
            className="size-8 cursor-pointer"
          />
          <h2 className="text-lg text-text font-medium">{title}</h2>
        </div>
      </div>
      <div>
        <div className="bg-txlight/20 rounded-full flex items-center gap-3 p-2 min-w-50 md:w-100 xl:w-150">
          <Search size={20} />
          <input
            type="text"
            name="search"
            id="search"
            placeholder={`Search ${type}...`}
            className="border-none outline-none focus:outline-none text-sm text-white bg-transparent w-full"
          />
          <SlidersHorizontal size={20} />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <CircleQuestionMark size={20} className="hidden md:block" />
        <Settings size={20} className="hidden md:block" />
        <Grip size={20} onClick={() => setShowMore((prev) => !prev)} />
        <User size={20} className="hidden md:block" />
      </div>
      <div
        tabIndex={1}
        onTransitionStart={(e) => e.currentTarget.focus()}
        onBlur={(e) => {
          if (e.currentTarget.contains(e.relatedTarget)) {
            return;
          }
          setShowMore(false);
        }}
        className={`absolute z-50 ${showMore ? "p-2 opacity-100" : "h-0 overflow-hidden p-0 opacity-0"}  right-1 rounded-xl bg-bgsecondary top-14 gap-4 grid grid-cols-4 lg:grid-cols-5 transition-all duration-200`}
      >
        <Link
          href={"/dashboard"}
          className="flex flex-col items-center justify-center"
        >
          <LayoutDashboard className="size-6 sm:size-7" />
          <small className="text-[6px] sm:text-[8px]">Dashboard</small>
        </Link>
        <Link
          href={"/device"}
          className="flex flex-col items-center justify-center"
        >
          <Cpu className="size-6 sm:size-7" />
          <small className="text-[6px] sm:text-[8px]">Devices</small>
        </Link>
        <Link
          href={"/sensor"}
          className="flex flex-col items-center justify-center"
        >
          <RadioTower className="size-6 sm:size-7" />
          <small className="text-[6px] sm:text-[8px]">Sensors</small>
        </Link>
        <Link
          href={"/alerts"}
          className="flex flex-col items-center justify-center"
        >
          <Siren className="size-6 sm:size-7" />
          <small className="text-[6px] sm:text-[8px]">Alerts</small>
        </Link>
        <Link
          href={"/farm"}
          className="flex flex-col items-center justify-center"
        >
          <LandPlot className="size-6 sm:size-7" />
          <small className="text-[6px] sm:text-[8px]">Farms</small>
        </Link>
        <Link
          href={"/"}
          className="flex flex-col items-center justify-center md:hidden"
        >
          <CircleQuestionMark className="size-6 sm:size-7" />
          <small className="text-[6px] sm:text-[8px]">Help</small>
        </Link>
        <Link
          href={"/"}
          className="flex flex-col items-center justify-center md:hidden"
        >
          <Settings className="size-6 sm:size-7" />
          <small className="text-[6px] sm:text-[8px]">Setting</small>
        </Link>
        <Link
          href={"/"}
          className="flex flex-col items-center justify-center md:hidden"
        >
          <User className="size-6 sm:size-7" />
          <small className="text-[6px] sm:text-[8px]">You</small>
        </Link>
      </div>
    </header>
  );
}
