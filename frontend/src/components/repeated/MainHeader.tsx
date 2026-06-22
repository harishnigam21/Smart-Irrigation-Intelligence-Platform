import { mediaList } from "@/assets/scripts/mediaList";
import {
  CircleQuestionMark,
  Grip,
  Menu,
  Search,
  Settings,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default function MainHeader({
  setSideBar,
  title = "",
  type = "",
}: {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  type?: string;
}) {
  return (
    <header className="flex justify-between gap-4 items-center p-3 bg-transparent fixed top-0 left-0 w-full z-50 backdrop-blur-xl">
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
        <div className="bg-bgsecondary rounded-full flex items-center gap-3 p-2 min-w-50 md:w-100 xl:w-150">
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
        <Grip size={20} />
        <User size={20} className="hidden md:block" />
      </div>
    </header>
  );
}
