"use client";
import { useHorzSlider } from "@/hooks/useHorzSlider";
import { useAppSelector } from "@/store/Store";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  LandPlot,
  RadioTower,
  Siren,
  Thermometer,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SummarySlider() {
  const [
    summarySliderRef,
    {
      showLeftArrow: summaryLeft,
      showRightArrow: summaryRight,
      scroll: summaryScroll,
    },
  ] = useHorzSlider();
  const summary = useAppSelector((store) => store.summary);
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const handleViewToAlert = () => {
    alertRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };
  const alertAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!alertAudioRef.current) {
      alertAudioRef.current = new Audio("/alert.mp3");
      alertAudioRef.current.loop = true;
    }
    const audio = alertAudioRef.current;
    const hasAlerts = summary.alerts.length > 0;
    const handleUserInteraction = () => {
      if (summary.alerts.length > 0) {
        audio
          .play()
          .then(() => removeInteractionListeners())
          .catch((err) => console.log("Playback retry failed:", err.message));
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };

    if (hasAlerts) {
      audio.play().catch((err) => {
        console.log("Autoplay blocked. Waiting for user interaction...");
        window.addEventListener("click", handleUserInteraction);
        window.addEventListener("keydown", handleUserInteraction);
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
      removeInteractionListeners();
    }

    return () => {
      audio.pause();
      removeInteractionListeners();
    };
  }, [summary.alerts]);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <>
      {summary && (
        <div
          ref={summarySliderRef}
          className="flex justify-start relative flex-nowrap overflow-x-auto scrollbar-none gap-4 mb-4"
        >
          {summaryLeft && (
            <div className="z-10 sticky left-0 flex items-center min-h-full rounded-r-md shadow-[0.1px_0.1px_10px_10px] bg-bgprimary shadow-bgprimary text-text cursor-pointer transition-colors">
              <button
                onClick={() => summaryScroll("left")}
                className="py-4 cursor-pointer"
              >
                <ChevronLeft
                  size={18}
                  strokeWidth={"3px"}
                  className="scale-y-150"
                />
              </button>
            </div>
          )}
          {/* Average Readings */}
          <div
            className="rounded-lg border border-border hover:bg-bgsecondary transition-all p-2 sm:p-3 lg:px-4 lg:py-2 cursor-pointer"
            onClick={() => {
              const target = document.getElementById("homeReadingRef");
              if (target) {
                target.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "center",
                });
              }
            }}
          >
            <p className="font-medium">Average Readings</p>
            <div className="flex flex-nowrap gap-4 justify-around items-center p-2">
              {/* //farm */}
              <div className="flex items-center gap-1">
                <div className="relative">
                  <LandPlot
                    className="size-4 md:size-6 lg:size-8"
                    color="green"
                  />
                  <small
                    style={{ color: "green" }}
                    className="absolute bottom-0 right-0 text-[8px] -mb-2"
                  >
                    Farm
                  </small>
                </div>
                {summary.farms.length}
              </div>
              {/* //tempearture */}
              <div className="flex items-center gap-1">
                <div className="relative">
                  <Thermometer
                    className="size-4 md:size-6 lg:size-8"
                    color="yellow"
                  />
                  <small
                    style={{ color: "yellow" }}
                    className="absolute bottom-0 right-0 text-[8px] -mb-2"
                  >
                    Temp.
                  </small>
                </div>
                {summary.reading.temperature}°
              </div>
              {/* //Soil Moisture */}
              <div className="flex items-center gap-1">
                <div className="relative">
                  <svg
                    className="size-4 md:size-6 lg:size-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://w3.org"
                  >
                    <path
                      d="M2 22C2 19.5 5 19 12 19C19 19 22 19.5 22 22"
                      stroke={"brown"}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    <path
                      d="M6 21H18"
                      stroke={"blue"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="1 3"
                    />
                    <path
                      d="M10 22H14"
                      stroke={"brown"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />

                    <path
                      d="M12 19V4C12 2 14 2 16 2"
                      stroke={"green"}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    <path
                      d="M12 15C9 15 8 13 8 11C10 11 12 12.5 12 15Z"
                      fill={"green"}
                    />

                    <path
                      d="M12 11C15 11 16 9 16 7C14 7 12 8.5 12 11Z"
                      fill={"green"}
                    />

                    <path
                      d="M12 7C10 7 9 5.5 9 4C10.5 4 12 5 12 7Z"
                      fill={"green"}
                    />
                  </svg>
                  <small
                    style={{ color: "brown" }}
                    className="absolute bottom-0 right-0 text-[8px] -mb-2 whitespace-nowrap"
                  >
                    Soil
                  </small>
                </div>
                {summary.reading.soilMoisture}%
              </div>
              {/* //Water Flow */}
              <div className="flex items-center gap-1 whitespace-nowrap">
                <div className="relative">
                  <svg
                    className="size-4 md:size-6 lg:size-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://w3.org"
                  >
                    {/* Top Wave Stream */}
                    <path
                      d="M2 6C5 4 7 8 10 6C13 4 15 8 18 6C20 4 21 5 22 6"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Middle Wave Stream (Primary Flow) */}
                    <path
                      d="M2 12C5 10 7 14 10 12C13 10 15 14 18 12C21 10 22 11 22 12"
                      stroke="#2563EB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Bottom Wave Stream */}
                    <path
                      d="M2 18C5 16 7 20 10 18C13 16 15 20 18 18C20 16 21 17 22 18"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Small Flow / Motion Droplet 1 */}
                    <path
                      d="M6 9C7.5 9 7.5 10 9 10"
                      stroke="#60A5FA"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />

                    {/* Small Flow / Motion Droplet 2 */}
                    <path
                      d="M14 15C15.5 15 15.5 16 17 16"
                      stroke="#60A5FA"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <small
                    style={{ color: "blue" }}
                    className="absolute bottom-0 right-0 text-[8px] -mb-2 whitespace-nowrap"
                  >
                    Flow
                  </small>
                </div>
                {summary.reading.soilMoisture} L/s
              </div>
            </div>
          </div>
          {/* devices */}
          <div
            className="rounded-lg border border-border hover:bg-bgsecondary transition-all p-2 sm:p-3 lg:px-4 lg:py-2 cursor-pointer"
            onClick={() => {
              router.push("/device");
            }}
          >
            <p className="font-medium">Devices</p>
            <div className="flex flex-nowrap gap-4 justify-around items-center p-2">
              {/* //total */}
              <div className="flex items-center gap-1">
                <div className="relative">
                  <Cpu className="size-4 md:size-6 lg:size-8" color="orange" />
                  <small className="absolute bottom-0 right-0 text-[#ffa500] text-[8px] -mb-2">
                    Total
                  </small>
                </div>
                {summary.device.length}
              </div>
              {/* //active */}
              <div className="flex items-center gap-1">
                <div className="relative">
                  <Cpu className="size-4 md:size-6 lg:size-8" color="green" />
                  <small className="absolute bottom-0 right-0 text-[#017a01] text-[8px] -mb-2">
                    Active
                  </small>
                </div>
                {
                  summary.device.filter(
                    (item) => item.hardware.telemetrySummary.status == "online",
                  ).length
                }
              </div>
              {/* inactive can be judge, from total and active so no need of this */}
              {/* //error */}
              {(() => {
                const errorDevice = summary.device.filter(
                  (item) => item.hardware.telemetrySummary.status == "error",
                ).length;
                return (
                  <div className="flex items-center gap-1">
                    <div className="relative flex justify-center">
                      <small
                        className={`text-red-500 font-bold absolute top-0 -mt-3 ${errorDevice > 0 ? "animate-pulse" : "animate-none"}`}
                      >
                        !
                      </small>
                      <Cpu className="size-4 md:size-6 lg:size-8" color="red" />
                      <small className="absolute bottom-0 right-0 text-red-500 text-[8px] -mb-2">
                        Error
                      </small>
                    </div>
                    {errorDevice}
                  </div>
                );
              })()}
            </div>
          </div>
          {/* sensors */}
          <div className="rounded-lg border border-border hover:bg-bgsecondary transition-all p-2 sm:p-3 lg:px-4 lg:py-2 cursor-pointer">
            <p className="font-medium">Sensors</p>
            <div className="flex flex-nowrap gap-4 justify-around items-center p-2">
              {/* //total */}
              <div className="flex items-center gap-1">
                <div className="relative">
                  <RadioTower
                    className="size-4 md:size-6 lg:size-8"
                    color="orange"
                  />
                  <small className="absolute bottom-0 right-0 text-[#ffa500] text-[8px] -mb-2">
                    Total
                  </small>
                </div>
                {summary.sensor.length}
              </div>
              {/* //active */}
              <div className="flex items-center gap-1">
                <div className="relative">
                  <RadioTower
                    className="size-4 md:size-6 lg:size-8"
                    color="green"
                  />
                  <small className="absolute bottom-0 right-0 text-[#017a01] text-[8px] -mb-2">
                    Active
                  </small>
                </div>
                {
                  summary.sensor.filter((item) => item.status == "active")
                    .length
                }
              </div>
              {/* inactive can be judge, from total and active so no need of this */}
              {/* //error */}
              {(() => {
                const errorSensors = summary.sensor.filter(
                  (item) => item.status == "error",
                ).length;
                return (
                  <div className="flex items-center gap-1">
                    <div className="relative flex justify-center">
                      <small
                        className={`text-red-500 font-bold absolute top-0 -mt-3 ${errorSensors > 0 ? "animate-pulse" : "animate-none"}`}
                      >
                        !
                      </small>
                      <RadioTower
                        className="size-4 md:size-6 lg:size-8"
                        color="red"
                      />
                      <small className="absolute bottom-0 right-0 text-red-500 text-[8px] -mb-2">
                        Error
                      </small>
                    </div>
                    {errorSensors}
                  </div>
                );
              })()}
            </div>
          </div>
          {/* Alerts */}
          <div
            className={`rounded-lg border ${summary.alerts.length > 0 ? "border-red-500 shadow-red-500 shadow-[0.1px_0.1px_30px_5px_inset] animate-pulse" : "border-border animate-none"} hover:bg-bgsecondary transition-all p-2 sm:p-3 lg:px-4 lg:py-2 cursor-pointer`}
            ref={alertRef}
            onClick={() => {
              router.push("/alerts");
            }}
          >
            <p className="font-medium">Alerts</p>
            <div className="flex flex-nowrap gap-4 justify-around items-center p-2">
              {/* //total */}
              <div className="flex items-center gap-1">
                <div className="relative">
                  <Siren className={`size-4 md:size-6 lg:size-8`} color="red" />
                  <small className="absolute bottom-0 right-0 text-green-500 text-[8px] -mb-2">
                    Active
                  </small>
                </div>
                {summary.alerts.length}
              </div>
            </div>
          </div>
          {summaryRight && (
            <div className="z-10 sticky right-0 flex items-center min-h-full rounded-r-md shadow-[0.1px_0.1px_10px_10px] bg-bgprimary shadow-bgprimary text-text cursor-pointer transition-colors">
              <button
                onClick={() => summaryScroll("right")}
                className="py-4 cursor-pointer"
              >
                <ChevronRight
                  size={18}
                  strokeWidth={"3px"}
                  className="scale-y-150"
                />
              </button>
            </div>
          )}
        </div>
      )}
      {alertAudioRef.current && summary.alerts.length > 0 && (
        <div
          className="fixed m-0 bottom-2 right-2 z-50 bg-red-500 animate-pulse p-2 rounded-full cursor-pointer"
          onClick={() => {
            alertAudioRef.current?.pause();
            handleViewToAlert();
          }}
        >
          <Siren className="size-8" />
        </div>
      )}
    </>
  );
}
