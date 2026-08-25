"use client";

import { DeviceInSummary } from "@/store/slices/SummarySlice";
import { useAppSelector } from "@/store/Store";
import { formatDateTime } from "@/utils/getDate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Loading from "./loading";
import DeviceLayout from "@/components/device/DeviceLayout";
import SimulationReading from "@/components/device/SimulationReading";
import HorizontalBar from "@/components/Loading/HorizontalBar";
import DeviceViewLoading from "@/components/device/DeviceViewLoading";
export default function MicrocontrollerTwin() {
  const summary = useAppSelector((store) => store.summary);

  const [mounted, setMounted] = useState<boolean>(false);
  const [deviceIndex, setDeviceIndex] = useState<number>(0);
  const [selectedDevice, setSelectedDevice] = useState<DeviceInSummary | null>(
    null,
  );
  const [showSensor, setShowSensor] = useState<boolean>(false);
  const [selectedSensor, setSelectedSensor] = useState<any | null>(null);
  const [moreOptions, setMoreOptions] = useState<boolean>(false);
  const [simulation, setSimulation] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("v");
  useEffect(() => {
    setMounted(true);
    if (summary?.device) {
      if (id) {
        setSelectedDevice(
          summary.device?.find((item) => item._id == id) || null,
        );
      } else {
        setSelectedDevice(() => {
          if (summary.device.length > 0) {
            return summary.device[deviceIndex];
          } else {
            return null;
          }
        });
      }
    }
  }, [summary, deviceIndex]);
  if (!mounted) {
    return <DeviceViewLoading />;
  }
  return mounted && selectedDevice ? (
    <article
      className={`relative w-full h-full flex flex-col justify-center items-center bg-bgprimary blueprint-grid text-textPri`}
    >
      <div className="flex items-center justify-center-safe text-textPri gap-3 absolute top-0 z-10 mt-20">
        {summary.device.length > 1 && deviceIndex !== 0 && !id && (
          <ChevronLeft
            onClick={() => {
              if (deviceIndex > 0) {
                setMounted(false);
                setSimulation(false);
                setDeviceIndex((prev) => prev - 1);
              }
            }}
          />
        )}
        <h1
          style={{ fontFamily: "Carrington", fontWeight: "lighter" }}
          className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-borderhover"
        >
          {selectedDevice.nickName}
        </h1>
        {summary.device.length > 1 &&
          deviceIndex !== summary.device.length - 1 &&
          !id && (
            <ChevronRight
              onClick={() => {
                if (deviceIndex < summary.device.length - 1) {
                  setMounted(false);
                  setSimulation(false);
                  setDeviceIndex((prev) => prev + 1);
                }
              }}
            />
          )}
      </div>
      <div className="relative w-9/10 md:w-3/4 lg:w-1/2 h-auto flex flex-col items-center mt-4">
        <DeviceLayout
          selectedDevice={selectedDevice}
          setShowSensor={setShowSensor}
          setSelectedSensor={setSelectedSensor}
        />
        <div
          className={`absolute top-0 ${showSensor && selectedSensor ? "max-h-20 md:max-h-30 lg:max-h-40 p-2 opacity-100" : "max-h-0 p-0 opacity-0"} max-w-20 md:max-w-30 lg:max-w-40 bg-bgsecondary overflow-hidden rounded-md flex flex-col gap-0 md:gap-1 transition-all duration-200 text-[8px] md:text-xs lg:text-base border shadow-[0.1px_0.1px_100px_0.05px] shadow-text`}
        >
          <h3 className="self-center text-xs md:text-sm lg:text-2xl font-medium">
            {selectedSensor?.sensorType}
          </h3>
          <p className="font-medium">
            Pin :{" "}
            <span className="font-light">{selectedSensor?.pinNumber}</span>
          </p>
          <p className="font-medium">
            Status :{" "}
            <span className="font-light">{selectedSensor?.status}</span>
          </p>
          <p className="font-medium">
            Last Seen :{" "}
            <span className="font-light">
              {formatDateTime(selectedSensor?.lastSeen)}
            </span>
          </p>
          <div className="grow bg-bgprimary rounded-md mt-2"></div>
        </div>
      </div>
      <div
        className="fixed left-1 top-1/2 -translate-y-1/2"
        onClick={() => setMoreOptions(true)}
        onMouseOver={() => setMoreOptions(true)}
        onMouseOut={() => setMoreOptions(false)}
      >
        <div className="flex flex-col items-center gap-5">
          {/* Top */}
          <div
            className={`relative
        whitespace-nowrap
        overflow-hidden
        max-w-0
        opacity-0
        -translate-x-4
        ${moreOptions && "max-w-40 opacity-100 translate-x-0"}
        transition-all
        duration-500
        ease-out cursor-pointer hover:bg-borderhover/50 hover:rounded-full hover:py-1 hover:px-3
      `}
            onClick={() => {
              setMoreOptions(false);
              setSimulation((prev) => !prev);
            }}
          >
            {simulation && <HorizontalBar position="top-0" />}
            Simulation
          </div>

          {/* Middle */}
          <div className="flex items-center gap-3">
            <p
              className={`
                whitespace-nowrap
                overflow-hidden
                max-w-0
                opacity-0
                -translate-x-4
                ${moreOptions && "max-w-24 opacity-100 translate-x-0"}
                transition-all
                duration-500
                ease-out cursor-pointer hover:bg-borderhover/50 hover:rounded-full hover:py-1 hover:px-3
                `}
            >
              Add Device
            </p>

            <div
              title="more options"
              className="
          rounded-full
          size-8
          bg-borderhover/50
          cursor-pointer
          flex
          items-center
          justify-center
          transition-transform
          duration-300
          group-hover:scale-110
        "
            >
              <div className="size-5 rounded-full bg-bgprimary/50"></div>
            </div>

            <p
              className={`
                whitespace-nowrap
                overflow-hidden
                max-w-0
                opacity-0
                translate-x-4
                ${moreOptions && "translate-x-0 opacity-100 max-w-24"}
                transition-all
                duration-500
                ease-out cursor-pointer hover:bg-borderhover/50 hover:rounded-full hover:py-1 hover:px-3
                `}
            >
              Option 3
            </p>
          </div>

          {/* Bottom */}
          <p
            className={`
              whitespace-nowrap
              overflow-hidden
              max-w-0
              opacity-0
              -translate-x-4
              ${moreOptions && "max-w-40 opacity-100 translate-x-0"}
              transition-all
              duration-500
              ease-out cursor-pointer hover:bg-borderhover/50 hover:rounded-full hover:py-1 hover:px-3
              `}
          >
            Option 4
          </p>
        </div>
      </div>
      {simulation && (
        <SimulationReading
          simulation={simulation}
          id={selectedDevice._id}
          status={selectedDevice.hardware.telemetrySummary.status}
          setSimulation={setSimulation}
        />
      )}
    </article>
  ) : (
    <Loading />
  );
}
