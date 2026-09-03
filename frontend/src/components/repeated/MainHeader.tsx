"use client";
import { mediaList } from "@/assets/scripts/mediaList";
import { setHideHeader } from "@/store/slices/LayoutSlice";
import { useAppSelector, useAppDispatch } from "@/store/Store";
import {
  ChevronDown,
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
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function MainHeader({
  setSideBar,
  title = "",
  type = "",
  bgcolor = false,
  targetID = null,
  filterArray = [],
}: {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  type?: string;
  bgcolor?: boolean;
  targetID?: string | null;
  filterArray?: string[];
}) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const hideHeader = useAppSelector((store) => store.layout.hideHeader);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const GripRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (showMore && GripRef.current) {
      GripRef.current.focus();
    }
  }, [showMore]);
  useEffect(() => {
    if (showFilter && filterRef.current) {
      filterRef.current.focus();
    }
  }, [showFilter]);
  useEffect(() => {
    if (hideHeader) {
      setShowMore(false);
    }
  }, [hideHeader]);
  useEffect(() => {
    if (!targetID) return;
    let cleanup: (() => void) | undefined;
    let frameId: number;
    const findTarget = () => {
      const target = document.getElementById(targetID);

      if (!target) {
        frameId = requestAnimationFrame(findTarget);
        return;
      }
      const header = headerRef.current;

      if (!header) {
        frameId = requestAnimationFrame(findTarget);
        return;
      }
      const scrollContainer = target.closest(
        ".overflow-y-auto",
      ) as HTMLElement | null;

      if (!scrollContainer) return;
      const checkOverlap = () => {
        const headerRect = header.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const isOverlapping = targetRect.top < headerRect.bottom;
        if (isOverlapping) {
          dispatch(setHideHeader(true));
        } else {
          dispatch(setHideHeader(false));
        }
      };
      scrollContainer.addEventListener("scroll", checkOverlap);
      checkOverlap();
      cleanup = () => {
        scrollContainer.removeEventListener("scroll", checkOverlap);
      };
    };
    findTarget();
    return () => {
      cancelAnimationFrame(frameId);
      cleanup?.();
    };
  }, [targetID]);

  return (
    <header className="z-50 fixed top-0 left-0 w-full flex flex-col">
      <div
        ref={headerRef}
        className={`flex justify-between gap-4 items-center text-textPri ${bgcolor ? "bg-black/50" : "bg-transparent"} ${hideHeader ? "max-h-0 p-0 overflow-hidden bg-black *:hidden cursor-pointer" : "max-h-15 p-3"} transition-all delay-100 backdrop-blur-xl`}
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
            <h2 className="text-lg text-textPri font-medium">{title}</h2>
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
              className="border-none outline-none active:outline-none text-sm text-white bg-transparent w-full"
            />
            {filterArray && filterArray.length > 0 && (
              <div className="relative">
                <SlidersHorizontal
                  size={20}
                  onClick={() => {
                    setShowFilter((prev) => !prev);
                  }}
                />
                {showFilter && (
                  <div
                    ref={filterRef}
                    tabIndex={0}
                    onBlur={() => setShowFilter(false)}
                    className="absolute -right-2 top-6.5 rounded-md overflow-hidden bg-bgprimary"
                  >
                    <div className="flex flex-col justify-center bg-txlight/20">
                      {filterArray.map((item, i) => (
                        <p
                          onClick={() => {
                            const params = new URLSearchParams(
                              searchParams.toString(),
                            );
                            if (params.has("filter")) {
                              params.set("filter", String(item.toLowerCase()));
                            } else {
                              params.append(
                                "filter",
                                String(item.toLowerCase()),
                              );
                            }
                            router.push(`/${type}?${params.toString()}`);
                          }}
                          key={`header/${type}/filter/${i}`}
                          className="py-1.5 px-3 hover:bg-txlight/10 cursor-pointer text-xs font-medium"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <CircleQuestionMark size={20} className="hidden md:block" />
          <Settings size={20} className="hidden md:block" />
          <Grip size={20} onClick={() => setShowMore((prev) => !prev)} />
          <User size={20} className="hidden md:block" />
        </div>
        <div
          ref={GripRef}
          tabIndex={0}
          onBlur={(e) => {
            if (e.currentTarget.contains(e.relatedTarget)) {
              return;
            }
            setShowMore(false);
          }}
          className={`absolute z-50 ${showMore ? "p-4 opacity-100" : "h-0 overflow-hidden p-0 opacity-0"}  right-0.5 rounded-b-md rounded-l-md bg-bgsecondary top-15 gap-1 grid grid-cols-3 transition-all duration-200`}
        >
          <Link
            prefetch={false}
            href={"/dashboard"}
            className="flex flex-col items-center justify-center hover:bg-bgprimary/60 active:bg-bgprimary/60 p-2 rounded-md"
          >
            <LayoutDashboard className="size-6 sm:size-7" />
            <small className="text-[6px] sm:text-[8px]">Dashboard</small>
          </Link>
          <Link
            prefetch={false}
            href={"/device"}
            className="flex flex-col items-center justify-center hover:bg-bgprimary/60 active:bg-bgprimary/60 p-2 rounded-md"
          >
            <Cpu className="size-6 sm:size-7" />
            <small className="text-[6px] sm:text-[8px]">Devices</small>
          </Link>
          <Link
            prefetch={false}
            href={"/sensor"}
            className="flex flex-col items-center justify-center hover:bg-bgprimary/60 active:bg-bgprimary/60 p-2 rounded-md"
          >
            <RadioTower className="size-6 sm:size-7" />
            <small className="text-[6px] sm:text-[8px]">Sensors</small>
          </Link>
          <Link
            prefetch={false}
            href={"/alerts"}
            className="flex flex-col items-center justify-center hover:bg-bgprimary/60 active:bg-bgprimary/60 p-2 rounded-md"
          >
            <Siren className="size-6 sm:size-7" />
            <small className="text-[6px] sm:text-[8px]">Alerts</small>
          </Link>
          <Link
            prefetch={false}
            href={"/farm"}
            className="flex flex-col items-center justify-center hover:bg-bgprimary/60 active:bg-bgprimary/60 p-2 rounded-md"
          >
            <LandPlot className="size-6 sm:size-7" />
            <small className="text-[6px] sm:text-[8px]">Farms</small>
          </Link>
          <Link
            prefetch={false}
            href={"/"}
            className="flex flex-col items-center justify-center hover:bg-bgprimary/60 active:bg-bgprimary/60 p-2 rounded-md md:hidden"
          >
            <CircleQuestionMark className="size-6 sm:size-7" />
            <small className="text-[6px] sm:text-[8px]">Help</small>
          </Link>
          <Link
            prefetch={false}
            href={"/"}
            className="flex flex-col items-center justify-center hover:bg-bgprimary/60 active:bg-bgprimary/60 p-2 rounded-md md:hidden"
          >
            <Settings className="size-6 sm:size-7" />
            <small className="text-[6px] sm:text-[8px]">Setting</small>
          </Link>
          <Link
            prefetch={false}
            href={"/"}
            className="flex flex-col items-center justify-center hover:bg-bgprimary/60 active:bg-bgprimary/60 p-2 rounded-md md:hidden"
          >
            <User className="size-6 sm:size-7" />
            <small className="text-[6px] sm:text-[8px]">You</small>
          </Link>
        </div>
      </div>
      <button
        type="button"
        tabIndex={hideHeader ? 0 : -1}
        onTransitionStart={(e) => e.currentTarget.focus()}
        onMouseOver={(e) => {
          dispatch(setHideHeader(false));
        }}
        onFocus={() => {
          dispatch(setHideHeader(false));
        }}
        onBlur={(e) => {
          if (e.currentTarget.contains(e.relatedTarget)) {
            return;
          }
          dispatch(setHideHeader(true));
        }}
        className={`bg-ter ${hideHeader ? "w-5" : "w-0"} self-start flex justify-center rounded-b-md z-50 cursor-pointer`}
      >
        <ChevronDown className="size-3 stroke-3 text-white" />
      </button>
    </header>
  );
}
