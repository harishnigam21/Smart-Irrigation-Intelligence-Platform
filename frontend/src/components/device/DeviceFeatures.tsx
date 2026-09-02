import {
  ChartSpline,
  Columns3Cog,
  GlobeCheck,
  Megaphone,
  MonitorSpeaker,
  MoveRight,
  RadioTower,
  Settings,
  Wallpaper,
  Workflow,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function DeviceFeatures() {
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
  return (
    <section
      id="deviceFeatures"
      className="w-full bg-bgprimary mt-20 p-4 blueprint-grid12"
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
        className="flex flex-nowrap gap-2 sm:gap-4 overflow-x-auto overflow-y-hidden scrollbar-none py-2"
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
          <FeatureCard
            key={`device/service/card/${i}`}
            item={item}
            i={i}
            isVisible={isVisible}
          />
        ))}
      </article>
    </section>
  );
}

const FeatureCard = ({
  item,
  i,
  isVisible,
}: {
  item: any;
  i: number;
  isVisible: boolean;
}) => {
  const [more, setMore] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => {
        setMore(true);
      }}
      onMouseLeave={() => {
        setMore(false);
      }}
      className={`box rounded-2xl bg-bgsecondary/40  backdrop-blur min-w-55 max-w-80 p-3 hover:scale-105 active:scale-105 border border-borderhover transition-all ${isVisible ? `animate` : ""}`}
      style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
    >
      <div className="mb-4 text-pri">{item.icon}</div>
      <h3 className={`text-lg font-semibold mb-2 ${!more && "line-clamp-1"}`}>
        {item.title}
      </h3>
      <p className={`text-textPri/80 text-sm ${!more && "line-clamp-2"}`}>
        {item.desc}
      </p>
      <small className="text-pri flex gap-1 items-center py-1 cursor-pointer">
        {item.readMore}
        <MoveRight className="size-3 mt-1" />
      </small>
    </div>
  );
};
