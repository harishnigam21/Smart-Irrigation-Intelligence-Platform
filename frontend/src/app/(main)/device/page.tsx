"use client";
import DeviceRoadMap from "@/components/device/DeviceRoadMap";
import { useElementHeight } from "@/hooks/useElementHeight";
import { useAppSelector } from "@/store/Store";
import {
  ChartSpline,
  CheckCircle,
  ChevronsDown,
  Columns3Cog,
  GlobeCheck,
  ListTodo,
  Megaphone,
  MonitorSpeaker,
  MoveRight,
  RadioTower,
  Settings,
  Wallpaper,
  Workflow,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function page() {
  const [videoRef, videoHeight] = useElementHeight();
  const screenWidth = useAppSelector((store) => store.layout.screenSize.width);
  const devices = useAppSelector((store) => store.summary.device);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    if (screenWidth >= 640) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, [screenWidth]);
  return (
    <section className="relative text-textPri">
      <div className="fixed top-0 left-0 z-1 w-full">
        <video
          key={isDesktop ? "desktop" : "mobile"}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          width="100%"
          height="auto"
          className="aspect-auto"
        >
          <source
            src={
              isDesktop ? "/device_front_land.mp4" : "/device_front_port.mp4"
            }
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <article className="w-full h-screen overflow-x-hidden overflow-y-auto fixed top-0 z-2 scrollbar-none pt-15">
        <article
          style={{ height: videoHeight - 60 }}
          className="bg-[#020711]/50 w-full flex flex-col gap-3 justify-center-safe items-center-safe max-h-full rounded-b-xl p-2 md:p-4"
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
          <button
            className="px-4 py-3 font-bold rounded-full bg-borderhover/70 flex items-center cursor-pointer"
            onClick={() => {
              const scrollExist = document.getElementById("scrollHere1");
              if (scrollExist) {
                scrollExist.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                });
              }
            }}
          >
            Scroll Down{" "}
            <ChevronsDown className="animate-bounce -mb-2 duration-1000 transition-all" />
          </button>
        </article>
        {/* Features */}
        <section
          id="scrollHere1"
          className="w-full bg-bgprimary mt-20 rounded-b-xl p-4 "
        >
          <div className="sensor-flow-header">
            <div className="eyebrow text-pri">
              <span className="live-dot " />
              <span className="text-pri">SMART IRRIGATION CONTROL</span>
            </div>
            <h2>
              How It Works —<span> Smart Device Management</span>
            </h2>
            <p>
              Explore the tools that help you monitor, configure, analyze, and
              manage your connected irrigation devices
            </p>
          </div>
          <article
            ref={sectionRef}
            className="flex flex-nowrap gap-2 sm:gap-4 overflow-x-auto overflow-y-hidden scrollbar-none py-4"
          >
            {[
              {
                icon: <GlobeCheck />,
                title: "Check Device Status",
                desc: "Monitor device connectivity, sensor health, and real-time operating status.",
                readMore: "View Devices",
              },
              {
                icon: <RadioTower />,
                title: "Simulate Sensor Data",
                desc: "Generate realistic sensor readings to test device behavior and dashboard responses.",
                readMore: "Simulate Data",
              },
              {
                icon: <MonitorSpeaker />,
                title: "Device Connectivity",
                desc: "Monitor communication between edge devices, sensors, and the central dashboard.",
                readMore: "Check connectivity",
              },
              {
                icon: <Columns3Cog />,
                title: "Sensor Calibration",
                desc: "Adjust sensor parameters to improve the accuracy and reliability of collected data.",
                readMore: "Calibrate sensors",
              },
              {
                icon: <Wallpaper />,
                title: "Data Visualization",
                desc: "Transform sensor readings into clear charts and insights for easier monitoring.",
                readMore: "View analytics",
              },
              {
                icon: <Megaphone />,
                title: "Alert Management",
                desc: "Configure conditions and thresholds to identify abnormal sensor readings.",
                readMore: "Manage alerts",
              },
              {
                icon: <ChartSpline />,
                title: "Performance Analytics",
                desc: "Analyze historical sensor and irrigation data to understand system performance.",
                readMore: "View analytics",
              },
              {
                icon: <Workflow />,
                title: "IoT Automation",
                desc: "Create automated actions based on sensor readings and predefined conditions.",
                readMore: "Explore automation",
              },
              {
                icon: <Settings />,
                title: "Manage Device Specification/Setting",
                desc: "Configure device parameters, sensor limits, and settings to match your farm requirements.",
                readMore: "Modify Settings",
              },
            ].map((item, i) => (
              <div
                key={`device/service/card/${i}`}
                className={`box rounded-2xl bg-bgsecondary/40 backdrop-blur min-w-55 max-w-80 p-3 hover:scale-105 border border-borderhover transition ${isVisible ? `animate` : ""}`}
                style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
              >
                <div className="mb-4 text-pri">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-textPri/80 text-sm line-clamp-2">
                  {item.desc}
                </p>
                <small className="text-pri flex gap-1 items-center py-1 cursor-pointer">
                  {item.readMore}
                  <MoveRight className="size-3 mt-1"/>
                </small>
              </div>
            ))}
          </article>
        </section>
        <article className="bg-bgprimary mt-20 w-full overflow-hidden">
          <DeviceRoadMap />
        </article>
      </article>
    </section>
  );
}
