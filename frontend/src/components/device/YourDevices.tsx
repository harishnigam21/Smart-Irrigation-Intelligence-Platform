import { setHideHeader } from "@/store/slices/LayoutSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function YourDevices() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const devices = useAppSelector((store) => store.summary.device);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px 30% 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <section
      id="your_devices"
      className="w-full bg-bgprimary pt-14 rounded-b-xl p-4 blueprint-grid12"
    >
      <div className="relative sensor-flow-header">
        <div className="eyebrow text-pri">
          <span className="live-dot " />
          <span className="text-pri">List of Devices</span>
        </div>
        <h2>
          Your<span> Devices</span>
        </h2>
      </div>
      {devices && devices.length > 0 ? (
        <article ref={sectionRef} className="relative max-w-fit">
          <div className=" flex flex-nowrap gap-2 sm:gap-4 overflow-x-auto overflow-y-hidden scrollbar-none py-2 px-3 sm:mr-30">
            {devices.map((item, i) => (
              <div
                key={`device/card/${i}`}
                className={`box rounded-2xl bg-bgsecondary/40 backdrop-blur min-w-55 max-w-80 p-3 hover:scale-105 active:scale-105 border border-borderhover transition ${isVisible ? `animate` : ""}`}
                style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
              >
                <h3 className="text-lg font-semibold mb-2 text-pri line-clamp-1">
                  {item.nickName}
                </h3>
                <p className="text-textPri/80 text-sm line-clamp-2">
                  {item.hardware.model}
                </p>
                <div
                  className={`${item.hardware.telemetrySummary.status == "online" ? "bg-green-500" : "bg-red-500"} w-4 h-4 animate-pulse absolute top-2 right-2 rounded-full flex justify-center items-center`}
                >
                  <div
                    className={`w-2 h-2 animate-ping rounded-full ${item.hardware.telemetrySummary.status == "online" ? "bg-green-600" : "bg-red-600"}`}
                    style={{ animationDuration: "1s" }}
                  ></div>
                </div>

                <small
                  className="text-pri text-xs flex gap-1 items-center py-1 cursor-pointer"
                  onClick={() => {
                    dispatch(setHideHeader(false));
                    router.push(`/device/view?v=${item._id}`);
                  }}
                >
                  View it
                  <MoveRight className="size-3 mt-1" />
                </small>
              </div>
            ))}
            <button
              onClick={() => {
                dispatch(setHideHeader(false));
                router.push("/device/view");
              }}
              className="absolute max-[640px]:-top-8 right-0 sm:py-1 sm:px-3 sm:w-28 cursor-pointer justify-self-center self-center rounded-full sm:bg-borderhover whitespace-nowrap text-ter text-xs sm:text-base sm:text-black font-bold flex items-center gap-1 justify-center"
            >
              View All <MoveRight className="size-3 animate-pulse" />
            </button>
          </div>
        </article>
      ) : (
        <div className="flex justify-center flex-col items-center gap-3 w-full">
          <p className="text-red-500 font-bold text-sm text-center animate-pulse">
            No device found !
          </p>
          <button
            onClick={() => {
              router.push("/device/new");
            }}
            className="py-1 px-3 rounded-full bg-borderhover hover:scale-95 active:scale-95 text-sm font-bold cursor-pointer transition-all"
          >
            Add Device
          </button>
        </div>
      )}
    </section>
  );
}
