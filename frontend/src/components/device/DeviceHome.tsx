import { mediaList } from "@/assets/scripts/mediaList";
import DeviceFeatures from "@/components/device/DeviceFeatures";
import DeviceRoadMap from "@/components/device/DeviceRoadMap";
import YourDevices from "@/components/device/YourDevices";
import HorizontalBar from "@/components/Loading/HorizontalBar";
import { useElementHeight } from "@/hooks/useElementHeight";
import { useAppSelector } from "@/store/Store";
import { ChevronsDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DeviceHomeBGVideo from "./DeviceHomeBGVideo";
import { scrollToSection } from "@/hooks/useScrollToSection";

export default function DeviceHome({ secure }: { secure: boolean }) {
  const [videoRef, videoHeight] = useElementHeight();
  const screenWidth = useAppSelector((store) => store.layout.screenSize.width);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const pipelineParRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (screenWidth >= 640) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, [screenWidth]);

  return (
    <section className="relative text-textPri">
      <DeviceHomeBGVideo
        videoRef={videoRef}
        setVideoLoaded={setVideoLoaded}
        isDesktop={isDesktop}
        videoLoaded={videoLoaded}
      />
      {videoLoaded ? (
        <article
          ref={pipelineParRef}
          className="w-full h-screen overflow-x-hidden overflow-y-auto fixed top-0 z-2 scrollbar-none pt-15"
        >
          <article
            style={{ height: videoHeight - 60 }}
            className="bg-[#020711]/50 w-full flex flex-col gap-3 justify-center-safe items-center-safe max-h-full rounded-b-xl p-2 md:p-4 blueprint-grid"
          >
            <div className="sensor-flow-header">
              <h2>
                Wirelessly manage your device. <span>Effortlessly</span>
              </h2>
              <p>
                Control settings, transfer files, and sync configuration across
                all your hardware without a single cable.
              </p>
            </div>
            <div className="flex gap-3 items-center flex-wrap justify-center">
              <button
                className="px-4 py-2 font-bold rounded-full bg-borderhover/70 flex items-center cursor-pointer"
                onClick={() => scrollToSection("pipeline", pipelineParRef)}
              >
                PipeLine
                <ChevronsDown className="animate-bounce -mb-2 duration-1000 transition-all" />
              </button>
              <button
                className="px-4 py-2 font-bold rounded-full bg-pri/70 flex items-center cursor-pointer"
                onClick={() => scrollToSection("your_devices", pipelineParRef)}
              >
                Your Devices
              </button>
            </div>
          </article>
          {/* Features */}
          <DeviceFeatures />
          {/* List of Device */}
          {secure && <YourDevices />}
          <article
            id="pipeline"
            className="bg-bgprimary mt-20 w-full overflow-hidden"
          >
            <DeviceRoadMap />
          </article>
        </article>
      ) : (
        <div className="w-full h-full relative flex items-center justify-center">
          <HorizontalBar position="top-0 left-0 z-100" />
          <Image
            src={isDesktop ? mediaList.DLP : mediaList.DPP}
            alt="video fallback"
            className="w-full h-full"
          ></Image>
        </div>
      )}
    </section>
  );
}
