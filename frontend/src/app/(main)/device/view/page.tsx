"use client";

import WireLeft from "@/components/device/WireLeft";
import WireRight from "@/components/device/WireRight";
import { DeviceInSummary } from "@/store/slices/SummarySlice";
import { useAppSelector } from "@/store/Store";
import { formatDateTime } from "@/utils/getDate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Loading from "./loading";
export default function MicrocontrollerTwin() {
  const MC = [
    {
      model_name: "ESP32 DOIT DevKit V1 (30-Pin)",
      parent_model: "ESP32 Classic Series",
      label: "ESP32-30PIN",
      dimensions: {
        length_mm: 51.8,
        width_mm: 27.9,
        unit: "mm",
      },
      features: [
        "Wi-Fi 4 (802.11 b/g/n)",
        "Bluetooth v4.2 BR/EDR and BLE",
        "Breadboard friendly narrow form factor",
        "Dual-mode power routing",
      ],
      hardware_info: {
        processor: "Xtensa Dual-Core 32-bit LX6",
        clock_speed_mhz: 240,
        sram_kb: 520,
        flash_mb: 4,
        operating_voltage: 3.3,
        input_voltage_usb: 5.0,
      },
      has_reset_button: true,
      has_boot_button: true,
      left_side_pins: [
        "GND",
        "3V3",
        "G36",
        "G37",
        "G38",
        "G39",
        "RST",
        "G34",
        "G35",
        "G32",
        "G33",
        "G25",
        "G26",
        "G27",
        "G14",
        "5V",
        "GND",
      ],
      right_side_pins: [
        "GND",
        "RX",
        "TX",
        "G21",
        "G22",
        "G19",
        "G23",
        "G18",
        "G5",
        "G10",
        "G9",
        "G4",
        "G0",
        "G2",
        "G15",
        "G13",
        "G12",
      ],
    },
    {
      model_name: "ESP32 NodeMCU-32S (38-Pin)",
      parent_model: "ESP32 Classic Series",
      label: "ESP32-38PIN",
      dimensions: {
        length_mm: 48.2,
        width_mm: 25.4,
        unit: "mm",
      },
      features: [
        "Full internal flash pin breakout",
        "Wi-Fi 4 (802.11 b/g/n)",
        "Bluetooth v4.2 BR/EDR and BLE",
        "Integrated CP2102 USB-to-UART bridge",
      ],
      hardware_info: {
        processor: "Xtensa Dual-Core 32-bit LX6",
        clock_speed_mhz: 240,
        sram_kb: 520,
        flash_mb: 4,
        operating_voltage: 3.3,
        input_voltage_usb: 5.0,
      },
      has_reset_button: true,
      has_boot_button: true,
      left_side_pins: [
        "3V3",
        "EN",
        "G36(VP)",
        "G39(VN)",
        "G34",
        "G35",
        "G32",
        "G33",
        "G25",
        "G26",
        "G27",
        "G14",
        "G12",
        "G13",
        "GND",
        "VCC(5V)",
        "G11(CMD)",
        "G6(CLK)",
        "G7(SD0)",
      ],
      right_side_pins: [
        "GND",
        "G1(TX0)",
        "G3(RX0)",
        "G22",
        "G21",
        "G17",
        "G16",
        "G19",
        "G18",
        "G5",
        "G4",
        "G2",
        "G15",
        "G8(SD1)",
        "G9(SD2)",
        "G10(SD3)",
        "G14(TMS)",
        "G13(TCK)",
        "G12(TDI)",
      ],
    },
    {
      model_name: "Arduino UNO R3",
      parent_model: "AVR Architecture",
      label: "ARD-UNO-R3",
      dimensions: {
        length_mm: 68.6,
        width_mm: 53.4,
        unit: "mm",
      },
      features: [
        "Removable DIP-28 microchip socket",
        "Standard expansion shield footprint",
        "Hardware overcurrent protection",
        "Automatic software reset on upload",
      ],
      hardware_info: {
        processor: "ATmega328P 8-bit AVR",
        clock_speed_mhz: 16,
        sram_kb: 2,
        flash_mb: 0.032,
        operating_voltage: 5.0,
        input_voltage_dc_jack: 7.0,
      },
      has_reset_button: true,
      has_boot_button: false,
      left_side_pins: [
        "NC",
        "IOREF",
        "RESET",
        "3.3V",
        "5V",
        "GND",
        "GND",
        "VIN",
        "A0",
        "A1",
        "A2",
        "A3",
        "A4/SDA",
        "A5/SCL",
      ],
      right_side_pins: [
        "D0(RX)",
        "D1(TX)",
        "D2",
        "D3(PWM)",
        "D4",
        "D5(PWM)",
        "D6(PWM)",
        "D7",
        "D8",
        "D9(PWM)",
        "D10(PWM/SS)",
        "D11(PWM/MOSI)",
        "D12(MISO)",
        "D13(SCK/LED)",
        "GND",
        "AREF",
        "SDA",
        "SCL",
      ],
    },
    {
      model_name: "Arduino Nano ESP32",
      parent_model: "ESP32-S3 Series",
      label: "ARD-NANO-ESP32",
      dimensions: {
        length_mm: 45.0,
        width_mm: 18.0,
        unit: "mm",
      },
      features: [
        "Native MicroPython support out-of-the-box",
        "Wi-Fi 4 & Bluetooth 5.0 LE mesh integration",
        "Hardware vector instructions for edge AI",
        "Timed multi-click mode recovery system",
      ],
      hardware_info: {
        processor: "Xtensa Dual-Core 32-bit LX7",
        clock_speed_mhz: 240,
        sram_kb: 512,
        flash_mb: 16,
        operating_voltage: 3.3,
        input_voltage_usb: 5.0,
      },
      has_reset_button: true,
      has_boot_button: false,
      left_side_pins: [
        "G44(D12/MISO)",
        "G43(D11/MOSI)",
        "G5(D10/SS)",
        "G6(D9/PWM)",
        "G7(D8)",
        "G8(D7)",
        "G9(D6/PWM)",
        "G10(D5/PWM)",
        "G11(D4)",
        "G12(D3/PWM)",
        "G13(D2)",
        "G14(GND)",
        "G21(RST)",
        "G44(RX0)",
        "G43(TX0)",
      ],
      right_side_pins: [
        "VBUS(5V)",
        "G3(D13/SCK)",
        "G4(A0)",
        "G1(A1)",
        "G2(A2)",
        "G17(A3)",
        "G18(A4/SDA)",
        "G19(A5/SCL)",
        "G20(A6)",
        "G38(A7)",
        "3V3",
        "GND",
        "G47(CHG)",
        "G48(D14)",
        "G26(D15)",
      ],
    },
  ];

  const summary = useAppSelector((store) => store.summary);

  const width = 700;
  const height = 300;
  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deviceIndex, setDeviceIndex] = useState<number>(0);
  const [selectedDevice, setSelectedDevice] = useState<DeviceInSummary | null>(
    null,
  );
  const [showSensor, setShowSensor] = useState<boolean>(false);
  const [selectedSensor, setSelectedSensor] = useState<any | null>(null);
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
  const deviceReference = useMemo(() => {
    if (!selectedDevice) return null;
    return (
      MC.find(
        (item) =>
          item.model_name.toLowerCase() ===
          selectedDevice.hardware.model.toLowerCase(),
      ) || null
    );
  }, [selectedDevice]);

  const pointIntervalRight = useMemo(() => {
    if (!deviceReference?.right_side_pins?.length) return 0;
    return (width - 20) / deviceReference.right_side_pins.length;
  }, [deviceReference]);

  const pointIntervalLeft = useMemo(() => {
    if (!deviceReference?.left_side_pins?.length) return 0;
    return (width - 20) / deviceReference.left_side_pins.length;
  }, [deviceReference]);

  const pinAssigned = useMemo(() => {
    if (selectedDevice) {
      return summary.sensor.filter(
        (item) => item.deviceId == selectedDevice._id,
      );
    } else {
      return [];
    }
  }, [selectedDevice]);
  return mounted && selectedDevice && deviceReference ? (
    <article className="relative w-full h-full flex flex-col justify-center items-center">
      <div className="flex items-center justify-center-safe text-text gap-3 absolute top-0 pt-5">
        {summary.device.length > 1 && deviceIndex !== 0 && !id && (
          <ChevronLeft
            onClick={() => {
              if (deviceIndex > 0) {
                setMounted(false);
                setDeviceIndex((prev) => prev - 1);
              }
            }}
          />
        )}
        <h1
          style={{ fontFamily: "Carrington", fontWeight: "lighter" }}
          className="text-3xl lg:text-4xl xl:text-5xl"
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
                  setDeviceIndex((prev) => prev + 1);
                }
              }}
            />
          )}
      </div>
      <div className="relative md:w-3/4 lg:w-1/2 h-auto flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={width}
          height={height}
          viewBox={`0 0 ${width + 100} ${height + 100}`}
          className="shrink rotate-90 overflow-visible w-full h-full scale-170 min-[450px]:scale-100"
        >
          <g
            style={{
              display: "inline",
              opacity: 1,
              cursor: "cell",
            }}
            transform="translate(256.253 85.92)"
          >
            <defs>
              <style>{`
      @keyframes signalFlow {
        0% { top: 0%; transform: translateY(0%); }
        100% { top: 100%; transform: translateY(-100%); }
      }
      @keyframes signalFlowOpp {
        0% { bottom: 0%; transform: translateY(0%); }
        100% { bottom: 100%; transform: translateY(-100%); }
      }
      .animate-signal-flow {
        position: absolute;
        animation: signalFlow 1.5s linear infinite;
      }
      .animate-signal-flow-opp {
        position: absolute;
        animation: signalFlowOpp 1.5s linear infinite;
      }
    `}</style>
            </defs>
            <rect
              width={680.829}
              height={386.662}
              x={-170.334}
              y={-85.42}
              ry={17.185}
              style={{
                opacity: 1,
                fill: "#1a1a1a",
                stroke: "#000",
                strokeWidth: 1,
              }}
            />

            {/* cpu left */}
            <g transform="translate(-321.293 235.48)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "1900ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__r)",
                }}
              />
            </g>
            <g transform="translate(-303.448 235.48)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "1800ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__s)",
                }}
              />
            </g>
            <g transform="translate(-285.603 235.48)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "1700ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__t)",
                }}
              />
            </g>
            <g transform="translate(-267.317 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "1600ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__r)",
                }}
              />
            </g>
            <g transform="translate(-249.473 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "1500ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__s)",
                }}
              />
            </g>
            <g transform="translate(-231.628 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "1400ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__t)",
                }}
              />
            </g>
            <g transform="translate(-213.783 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "1300ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__u)",
                }}
              />
            </g>
            <g transform="translate(-195.88 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "1200ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__r)",
                }}
              />
            </g>
            <g transform="translate(-178.035 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "1100ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__s)",
                }}
              />
            </g>
            <g transform="translate(-160.19 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "1000ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__t)",
                }}
              />
            </g>
            <g transform="translate(-142.346 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "900ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__u)",
                }}
              />
            </g>
            <g transform="translate(-124.442 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "800ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__r)",
                }}
              />
            </g>
            <g transform="translate(-106.598 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "700ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__s)",
                }}
              />
            </g>
            <g transform="translate(-88.753 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "600ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__t)",
                }}
              />
            </g>
            <g transform="translate(-70.908 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "500ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__u)",
                }}
              />
            </g>
            <g transform="translate(-53.005 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "400ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__r)",
                }}
              />
            </g>
            <g transform="translate(-35.16 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "300ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__s)",
                }}
              />
            </g>
            <g transform="translate(-17.316 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "200ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__t)",
                }}
              />
            </g>
            <g transform="translate(.53 234.95)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "100ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__u)",
                }}
              />
            </g>
            {/* cpu right */}
            <g transform="translate(-321.204)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "2000ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-303.36)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "2100ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-285.515)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "2200ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-267.67)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "2300ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-249.826)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "2400ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-231.98)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "2500ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-214.136)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "2600ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-196.292)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "2700ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-178.447)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "2800ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-160.602)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "2900ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-142.757)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "3000ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-124.913)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "3100ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-107.068)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "3200ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-89.223)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "3300ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-71.379)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "3400ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g transform="translate(-53.534)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "3500ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__n)",
                }}
              />
            </g>
            <g transform="translate(-35.69)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "3600ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__o)",
                }}
              />
            </g>
            <g transform="translate(-17.845)">
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "3700ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__p)",
                }}
              />
            </g>
            <g>
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "3800ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__q)",
                }}
              />
            </g>
            <path
              d="M-159.214-30.326h346.227V246.15h-346.227z"
              style={{
                opacity: 1,
                fill: "none",
                fillOpacity: 1,
                stroke: `${loading ? "orange" : "#6a7782"}`,
                strokeWidth: 1.5,
                strokeOpacity: 1,
              }}
            />

            {/* cpu down */}
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 -.79384 .79384 0 116.742 166.816)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "3900ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__d)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 -.79384 .79384 0 116.742 184.381)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "4000ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__e)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 -.79384 .79384 0 116.742 201.947)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "4100ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__f)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 -.79384 .79384 0 116.742 219.512)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "4200ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__g)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 -.79384 .79384 0 116.742 237.078)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "4300ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__h)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 -.79384 .79384 0 116.742 254.643)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "4400ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__i)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 -.79384 .79384 0 116.742 272.209)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "4500ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__j)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 -.79384 .79384 0 116.742 289.774)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "4600ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__k)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 -.79384 .79384 0 116.742 307.34)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "4700ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__l)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 -.79384 .79384 0 118.045 324.906)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationIterationCount: 1,
                  animationDuration: "4800ms",
                }}
                className={`${loading ? "animate-pulse fill-orange-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__m)",
                }}
              />
            </g>

            <rect
              width={257.269}
              height={228.459}
              x={-155}
              y={-8.033}
              ry={5.56}
              style={{
                fill: "#999",
                stroke: "#000",
                strokeWidth: 1,
              }}
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__v)",
              }}
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-1 0 0 1 434.306 0)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__w)",
              }}
              transform="matrix(-1 0 0 1 434.306 0)"
            />
            <rect
              width={21.712}
              height={11.437}
              x={206.681}
              y={209.904}
              ry={1.643}
              style={{
                fill: "#4d4d4d",
                stroke: "none",
                strokeWidth: 1.18118,
              }}
            />
            <path
              d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
              style={{
                fill: "#4d4d4d",
                stroke: "none",
                strokeWidth: ".264583px",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
              }}
            />
            <rect
              width={21.712}
              height={11.437}
              x={207.739}
              y={211.492}
              ry={1.643}
              style={{
                fill: "#d4aa00",
                stroke: "none",
                strokeWidth: 1.18118,
              }}
            />
            <path
              d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
              style={{
                fill: "#b3b3b3",
                strokeWidth: 1.18118,
              }}
            />
            <path
              d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
              style={{
                mixBlendMode: "normal",
                fill: "none",
                stroke: "#fff",
                strokeWidth: 1,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__x)",
              }}
              transform="matrix(-1 0 0 1 419.99 -.045)"
            />
            <path
              d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
              style={{
                fill: "none",
                stroke: "#fff",
                strokeWidth: 1,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__y)",
              }}
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="translate(-.632 -29.947)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__z)",
              }}
              transform="translate(-.632 -29.947)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-1 0 0 1 433.675 -29.947)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__A)",
              }}
              transform="matrix(-1 0 0 1 433.675 -29.947)"
            />
            <g transform="translate(-.632 -29.947)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#d4aa00",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__B)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__C)",
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="translate(49.912 -30.58)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__D)",
              }}
              transform="translate(49.912 -30.58)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-1 0 0 1 484.219 -30.58)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__E)",
              }}
              transform="matrix(-1 0 0 1 484.219 -30.58)"
            />
            <g transform="translate(49.912 -30.58)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#d4aa00",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__F)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__G)",
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 -.66529 .66529 0 160.991 319.142)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__H)",
              }}
              transform="matrix(0 -.66529 .66529 0 160.991 319.142)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 .66529 .66529 0 160.991 30.204)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__I)",
              }}
              transform="matrix(0 .66529 .66529 0 160.991 30.204)"
            />
            <g transform="matrix(0 -.66529 .66529 0 160.991 319.142)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#d4aa00",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__J)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__K)",
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 -.66529 .66529 0 173.248 319.292)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__L)",
              }}
              transform="matrix(0 -.66529 .66529 0 173.248 319.292)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 .66529 .66529 0 173.248 30.355)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__M)",
              }}
              transform="matrix(0 .66529 .66529 0 173.248 30.355)"
            />
            <g transform="matrix(0 -.66529 .66529 0 173.248 319.292)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#d4aa00",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__N)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__O)",
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 -.66529 .66529 0 186.895 319.545)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__P)",
              }}
              transform="matrix(0 -.66529 .66529 0 186.895 319.545)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 .66529 .66529 0 186.895 30.607)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__Q)",
              }}
              transform="matrix(0 .66529 .66529 0 186.895 30.607)"
            />
            <g transform="matrix(0 -.66529 .66529 0 186.895 319.545)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__R)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__S)",
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 -.66529 .66529 0 201.721 319.545)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__T)",
              }}
              transform="matrix(0 -.66529 .66529 0 201.721 319.545)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 .66529 .66529 0 201.721 30.607)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__U)",
              }}
              transform="matrix(0 .66529 .66529 0 201.721 30.607)"
            />
            <g transform="matrix(0 -.66529 .66529 0 201.721 319.545)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__V)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__W)",
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 -.66529 .66529 0 216.548 319.545)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__X)",
              }}
              transform="matrix(0 -.66529 .66529 0 216.548 319.545)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 .66529 .66529 0 216.548 30.607)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__Y)",
              }}
              transform="matrix(0 .66529 .66529 0 216.548 30.607)"
            />
            <g transform="matrix(0 -.66529 .66529 0 216.548 319.545)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__Z)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aa)",
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 -.66529 .66529 0 231.374 319.545)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__ab)",
              }}
              transform="matrix(0 -.66529 .66529 0 231.374 319.545)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 .66529 .66529 0 231.374 30.607)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__ac)",
              }}
              transform="matrix(0 .66529 .66529 0 231.374 30.607)"
            />
            <g transform="matrix(0 -.66529 .66529 0 231.374 319.545)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__ad)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__ae)",
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 -.58032 .58032 0 126.087 339.698)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__af)",
              }}
              transform="matrix(0 -.58032 .58032 0 126.087 339.698)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 .58032 .58032 0 126.087 87.66)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__ag)",
              }}
              transform="matrix(0 .58032 .58032 0 126.087 87.66)"
            />
            <g transform="matrix(0 -.58032 .58032 0 126.087 339.698)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#d4aa00",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__ah)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__ai)",
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 -.58032 .58032 0 154.411 339.25)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__aj)",
              }}
              transform="matrix(0 -.58032 .58032 0 154.411 339.25)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 .58032 .58032 0 154.411 87.213)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__ak)",
              }}
              transform="matrix(0 .58032 .58032 0 154.411 87.213)"
            />
            <g transform="matrix(0 -.58032 .58032 0 154.411 339.25)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#d4aa00",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__al)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__am)",
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="rotate(-90 239.972 101.029)scale(.58639)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__an)",
              }}
              transform="rotate(-90 239.972 101.029)scale(.58639)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 .5864 .5864 0 138.943 86.328)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__ao)",
              }}
              transform="matrix(0 .5864 .5864 0 138.943 86.328)"
            />
            <g transform="rotate(-90 239.972 101.029)scale(.58639)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__ap)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aq)",
                }}
              />
            </g>
            <g transform="matrix(.92228 0 0 .92228 125.8 17.446)">
              <path
                d="M199.27 208.494h11.954v13.36H199.27z"
                style={{
                  fill: "#b3b3b3",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.962076,
                }}
              />
              <path
                d="m203.406 210.732-.045 9.337"
                style={{
                  fill: "#ececec",
                  stroke: "#fff",
                  strokeWidth: 2,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__ar)",
                }}
              />
              <path
                d="M199.27 208.494h11.954v13.36H199.27z"
                style={{
                  fill: "#b3b3b3",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.962076,
                }}
                transform="matrix(-1 0 0 1 434.306 0)"
              />
              <path
                d="m203.406 210.732-.045 9.337"
                style={{
                  fill: "#ececec",
                  stroke: "#fff",
                  strokeWidth: 2,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__as)",
                }}
                transform="matrix(-1 0 0 1 434.306 0)"
              />
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#d4aa00",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__at)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__au)",
                }}
              />
              <ellipse
                cx={219.068}
                cy={216.842}
                rx={3.357}
                ry={3.459}
                style={{
                  fill: "none",
                  fillOpacity: 1,
                  stroke: "#fff",
                  strokeWidth: 1.08428,
                }}
              />
              <rect
                width={3.288}
                height={3.494}
                x={217.492}
                y={215.232}
                ry={0}
                style={{
                  fill: "#333",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 1.08428,
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="translate(238.224 88.282)scale(.58784)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__av)",
              }}
              transform="translate(238.224 88.282)scale(.58784)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-.58784 0 0 .58784 493.528 88.282)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__aw)",
              }}
              transform="matrix(-.58784 0 0 .58784 493.528 88.282)"
            />
            <g transform="translate(238.224 88.282)scale(.58784)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__ax)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__ay)",
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="rotate(-90 286.88 62.443)scale(.79179)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__az)",
              }}
              transform="rotate(-90 286.88 62.443)scale(.79179)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(0 .76695 .76695 0 229.602 1.809)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__aA)",
              }}
              transform="matrix(0 .76695 .76695 0 229.602 1.809)"
            />
            <g transform="rotate(-90 285.833 127.206)scale(1.10223)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(.54516 0 0 .54516 304.167 63.495)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__aB)",
              }}
              transform="matrix(.54516 0 0 .54516 304.167 63.495)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-.54516 0 0 .54516 540.936 63.495)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__aC)",
              }}
              transform="matrix(-.54516 0 0 .54516 540.936 63.495)"
            />
            <g transform="matrix(.54516 0 0 .54516 304.167 63.495)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#d4aa00",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aD)",
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aE)",
                }}
              />
            </g>
            {deviceReference.has_reset_button && (
              <>
                <g
                  style={{
                    display: "inline",
                    opacity: 0.873921,
                  }}
                >
                  <path
                    d="M199.27 208.494h11.954v13.36H199.27z"
                    style={{
                      fill: "#b3b3b3",
                      fillOpacity: 1,
                      stroke: "none",
                      strokeWidth: 0.962076,
                    }}
                    transform="matrix(1.81415 0 0 -1.64502 49.574 572.258)"
                  />
                  <path
                    d="m203.406 210.732-.045 9.337"
                    style={{
                      fill: "#ececec",
                      stroke: "#fff",
                      strokeWidth: 2,
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeOpacity: 1,
                      filter: "url(#1666364456Esp32_devkitc_v4_svg__aF)",
                    }}
                    transform="matrix(1.81415 0 0 -1.64502 49.574 572.258)"
                  />
                </g>
                <g
                  style={{
                    display: "inline",
                    opacity: 0.873921,
                  }}
                >
                  <path
                    d="M199.27 208.494h11.954v13.36H199.27z"
                    style={{
                      fill: "#b3b3b3",
                      fillOpacity: 1,
                      stroke: "none",
                      strokeWidth: 0.962076,
                    }}
                    transform="matrix(-1.81415 0 0 -1.64502 867.562 570.741)"
                  />
                  <path
                    d="m203.406 210.732-.045 9.337"
                    style={{
                      fill: "#ececec",
                      stroke: "#fff",
                      strokeWidth: 2,
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeOpacity: 1,
                      filter: "url(#1666364456Esp32_devkitc_v4_svg__aG)",
                    }}
                    transform="matrix(-1.81415 0 0 -1.64502 867.562 570.741)"
                  />
                </g>
                <path
                  d="M429.596 199.072v40.386h62.545v-40.743Z"
                  style={{
                    fill: "#4d4d4d",
                    stroke: "#000",
                    strokeWidth: ".264583px",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeOpacity: 1,
                  }}
                />
                <ellipse
                  cx={462.589}
                  cy={220.435}
                  rx={11.957}
                  ry={12.696}
                  style={{
                    fill: "#1a1a1a",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 0.106323,
                  }}
                />
                <path
                  d="m466.143 207.42-4.265.316 1.485 1.043zM470.81 230.315l-4.225.371 1.485 1.043z"
                  style={{
                    fill: "#1a1a1a",
                    stroke: "none",
                    strokeWidth: ".264583px",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeOpacity: 1,
                  }}
                />
                <ellipse
                  cx={466.293}
                  cy={219.377}
                  rx={11.246}
                  ry={11.941}
                  className="hover:fill-bgsecondary fill-[#333] cursor-pointer transition-all"
                  style={{
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 0.1,
                  }}
                >
                  <title>Reset Device</title>
                </ellipse>
              </>
            )}
            <rect
              width={21.355}
              height={28.145}
              x={198.715}
              y={135.723}
              ry={0}
              style={{
                fill: "#999",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.499999,
              }}
            />
            <path
              d="M204.523 135.455h11.169v14.385h-11.169z"
              style={{
                fill: "#666",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.499999,
              }}
            />
            <g transform="translate(31.97 -.126)">
              <rect
                width={21.355}
                height={28.145}
                x={198.715}
                y={135.723}
                ry={0}
                style={{
                  fill: "#999",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
              />
              <path
                d="M204.523 135.455h11.169v14.385h-11.169z"
                style={{
                  fill: "#666",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
              />
            </g>
            <g transform="translate(63.938 .355)">
              <rect
                width={21.355}
                height={28.145}
                x={198.715}
                y={135.723}
                ry={0}
                style={{
                  fill: "#999",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
              />
              <path
                d="M204.523 135.455h11.169v14.385h-11.169z"
                style={{
                  fill: "#666",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
              />
            </g>
            <rect
              width={52.181}
              height={28.949}
              x={215.684}
              y={48.964}
              ry={0}
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.499999,
              }}
            />
            <rect
              width={43.245}
              height={28.235}
              x={220.516}
              y={58.971}
              ry={0}
              style={{
                fill: "#999",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.499999,
              }}
            />
            <rect
              width={86.974}
              height={51.056}
              x={200.528}
              y={84.373}
              ry={1.75}
              style={{
                fill: "#1a1a1a",
                fillOpacity: 1,
                stroke: "#666",
                strokeWidth: 0.552625,
              }}
            />
            <rect
              width={82.023}
              height={44.318}
              x={203.004}
              y={89.708}
              ry={1.519}
              style={{
                fill: "#333",
                fillOpacity: 1,
                stroke: "#666",
                strokeWidth: 0.5,
              }}
            />
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 -.32734 374.456 68.141)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "100ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aH)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 -.32734 381.511 68.141)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "200ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aI)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 -.32734 388.567 68.141)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "300ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aJ)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 -.32734 395.622 68.141)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "400ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aK)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 -.32734 402.678 68.141)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "500ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aL)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 -.32734 409.733 68.141)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "600ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aM)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 -.32734 416.789 68.141)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "700ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aN)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 .32734 374.456 145.854)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "800ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aO)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 .32734 381.511 145.854)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "900ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aP)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 .32734 388.567 145.854)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "1000ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aQ)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 .32734 395.622 145.854)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "1100ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aR)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 .32734 402.678 145.854)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "1200ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aS)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 .32734 409.733 145.854)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "1300ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aT)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(-.32734 0 0 .32734 416.789 145.854)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "1400ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aU)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 .32734 0 377.494 71.09)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "1500ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 .32734 0 377.494 64.034)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "1600ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 .32734 0 377.494 56.979)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "1700ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 .32734 0 377.494 49.923)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "1800ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 .32734 0 377.494 42.867)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "1900ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 .32734 0 377.494 35.812)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "2000ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 .32734 0 377.494 28.756)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "2100ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 -.32734 0 300.84 71.09)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "2200ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aV)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 -.32734 0 300.84 64.034)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "2300ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aW)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 -.32734 0 300.84 56.979)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "2400ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aX)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 -.32734 0 300.84 49.923)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "2500ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aY)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 -.32734 0 300.84 42.867)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "2600ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__aZ)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 -.32734 0 300.84 35.812)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "2700ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__ba)",
                }}
              />
            </g>
            <g
              style={{
                display: "inline",
                opacity: 0.87404,
              }}
              transform="matrix(0 .32734 -.32734 0 300.84 28.756)"
            >
              <rect
                width={13.155}
                height={27.996}
                x={167.621}
                y={-23.946}
                ry={2.906}
                style={{
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.1,
                  animationDelay: "2800ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-blue-500" : "animate-none fill-[#4d4d4d]"}`}
              />
              <path
                d="m170.334 2.527 3.159-12.13 5.054 12.383z"
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                  filter: "url(#1666364456Esp32_devkitc_v4_svg__bb)",
                }}
              />
            </g>
            <path
              d="M304.505 73.625h71.48v68.264h-71.48z"
              style={{
                fill: "#000",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.499999,
              }}
            />
            <path
              d="M304.505 73.625h71.48v68.264h-71.48z"
              style={{
                fill: "#333",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.499999,
              }}
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="translate(277.126 -31.398)scale(.55941)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__bc)",
              }}
              transform="translate(277.126 -31.398)scale(.55941)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-.54186 0 0 .54186 522.65 -27.75)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__bd)",
              }}
              transform="matrix(-.54186 0 0 .54186 522.65 -27.75)"
            />
            <g transform="matrix(.77874 0 0 .77874 232.108 -78.953)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="translate(277.126 -11.686)scale(.55941)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__be)",
              }}
              transform="translate(277.126 -11.686)scale(.55941)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-.54186 0 0 .54186 522.65 -8.037)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__bf)",
              }}
              transform="matrix(-.54186 0 0 .54186 522.65 -8.037)"
            />
            <g transform="matrix(.77874 0 0 .77874 232.108 -59.24)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="translate(276.746 8.153)scale(.55941)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__bg)",
              }}
              transform="translate(276.746 8.153)scale(.55941)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-.54186 0 0 .54186 522.27 11.801)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__bh)",
              }}
              transform="matrix(-.54186 0 0 .54186 522.27 11.801)"
            />
            <g transform="matrix(.77874 0 0 .77874 231.729 -39.402)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
            </g>
            {deviceReference.has_boot_button && (
              <>
                <g
                  style={{
                    display: "inline",
                    opacity: 0.873921,
                  }}
                >
                  <path
                    d="M199.27 208.494h11.954v13.36H199.27z"
                    style={{
                      fill: "#b3b3b3",
                      fillOpacity: 1,
                      stroke: "none",
                      strokeWidth: 0.962076,
                    }}
                    transform="matrix(1.81415 0 0 -1.64502 49.574 345.774)"
                  />
                  <path
                    d="m203.406 210.732-.045 9.337"
                    style={{
                      fill: "#ececec",
                      stroke: "#fff",
                      strokeWidth: 2,
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeOpacity: 1,
                      filter: "url(#1666364456Esp32_devkitc_v4_svg__bi)",
                    }}
                    transform="matrix(1.81415 0 0 -1.64502 49.574 345.774)"
                  />
                </g>
                <g
                  style={{
                    display: "inline",
                    opacity: 0.873921,
                  }}
                >
                  <path
                    d="M199.27 208.494h11.954v13.36H199.27z"
                    style={{
                      fill: "#b3b3b3",
                      fillOpacity: 1,
                      stroke: "none",
                      strokeWidth: 0.962076,
                    }}
                    transform="matrix(-1.81415 0 0 -1.64502 867.562 344.258)"
                  />
                  <path
                    d="m203.406 210.732-.045 9.337"
                    style={{
                      fill: "#ececec",
                      stroke: "#fff",
                      strokeWidth: 2,
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeOpacity: 1,
                      filter: "url(#1666364456Esp32_devkitc_v4_svg__bj)",
                    }}
                    transform="matrix(-1.81415 0 0 -1.64502 867.562 344.258)"
                  />
                </g>
                <path
                  d="M429.596 199.072v40.386h62.545v-40.743Z"
                  style={{
                    fill: "#4d4d4d",
                    stroke: "#000",
                    strokeWidth: ".264583px",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeOpacity: 1,
                  }}
                  transform="translate(0 -226.483)"
                />
                <g transform="translate(0 -226.483)">
                  <ellipse
                    cx={462.589}
                    cy={220.435}
                    rx={11.957}
                    ry={12.696}
                    style={{
                      fill: "#1a1a1a",
                      fillOpacity: 1,
                      stroke: "none",
                      strokeWidth: 0.106323,
                    }}
                  />
                  <path
                    d="m466.143 207.42-4.265.316 1.485 1.043zM470.81 230.315l-4.225.371 1.485 1.043z"
                    style={{
                      fill: "#1a1a1a",
                      stroke: "none",
                      strokeWidth: ".264583px",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeOpacity: 1,
                    }}
                  />
                  <ellipse
                    cx={466.293}
                    cy={219.377}
                    rx={11.246}
                    ry={11.941}
                    className="hover:fill-bgsecondary fill-[#333] cursor-pointer transition-all"
                    style={{
                      fillOpacity: 1,
                      stroke: "none",
                      strokeWidth: 0.1,
                    }}
                  >
                    <title>Boot Device</title>
                  </ellipse>
                </g>
              </>
            )}
            <ellipse
              cx={432.531}
              cy={60.463}
              rx={12.004}
              ry={11.183}
              style={{
                opacity: 1,
                fill: "#ccc",
                fillOpacity: 0.854902,
                stroke: "none",
                strokeWidth: 0.499999,
              }}
            />
            <ellipse
              cx={432.531}
              cy={155.992}
              rx={12.004}
              ry={11.183}
              style={{
                opacity: 1,
                fill: "#ccc",
                fillOpacity: 0.854902,
                stroke: "none",
                strokeWidth: 0.499999,
              }}
            />
            <path
              d="m2004.596 208.023-339.053 4.053s0 49.98 9.457 59.436c9.456 9.455 21.611 5.404 21.611 5.404l67.815 1.35-.754 37-30.754 1.812.63 184.383 30.462 3.016-1.03 32.271s-77.174 2.223-85.279 10.328-9.455 13.508-9.455 13.508l2.701 48.629 334.371-5.484zm-129.34 50.319h30.9l.252 39.847h-36.217s-6.08-.336-6.08-6.416v-27.015c0-4.287 3.378-6.078 11.145-6.416m0 258h30.9l.252 39.85h-36.217s-6.08-.34-6.08-6.419v-27.015c0-4.287 3.378-6.079 11.145-6.416"
              style={{
                fill: "#000",
                stroke: "none",
                strokeWidth: ".999999px",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
              }}
              transform="scale(.26458)"
            />
            <g
              style={{
                fill: "#ccc",
                fillOpacity: 0.854902,
              }}
            >
              <rect
                width={28.431}
                height={3.033}
                x={426.339}
                y={88.579}
                ry={0}
                style={{
                  opacity: 1,
                  fillOpacity: 0.854902,
                  stroke: "none",
                  strokeWidth: 0.499999,
                  animationDelay: "100ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-green-500" : "animate-none fill=[#ccc]"}`}
              />
              <rect
                width={28.431}
                height={3.033}
                x={426.213}
                y={97.171}
                ry={0}
                style={{
                  opacity: 1,
                  fillOpacity: 0.854902,
                  stroke: "none",
                  strokeWidth: 0.499999,
                  animationDelay: "200ms",
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-green-500" : "animate-none fill=[#ccc]"}`}
              />
              <rect
                width={28.431}
                height={3.033}
                x={426.213}
                y={106.648}
                ry={0}
                style={{
                  opacity: 1,
                  animationDelay: "300ms",
                  fillOpacity: 0.854902,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-green-500" : "animate-none fill=[#ccc]"}`}
              />
              <rect
                width={28.431}
                height={3.033}
                x={425.708}
                y={115.241}
                ry={0}
                style={{
                  opacity: 1,
                  animationDelay: "400ms",
                  fillOpacity: 0.854902,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-green-500" : "animate-none fill=[#ccc]"}`}
              />
              <rect
                width={28.431}
                height={3.033}
                x={425.834}
                y={124.465}
                ry={0}
                style={{
                  opacity: 1,
                  animationDelay: "500ms",
                  fillOpacity: 0.854902,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
                className={`${selectedDevice.hardware.telemetrySummary.status === "online" ? "animate-pulse fill-green-500" : "animate-none fill=[#ccc]"}`}
              />
            </g>
            <path
              d="m444.788 73.415 22.05.21-.2 9.789-8.137.48.167 48.784 8.06.798-.273 8.539-20.15.393-.253-9.73 6.95.253-.253-49.028-7.33-.253z"
              style={{
                fill: "#333",
                stroke: "none",
                strokeWidth: ".264583px",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
              }}
            />
            <path
              d="m2004.596 208.023-339.053 4.053s0 49.98 9.457 59.436c9.456 9.455 21.611 5.404 21.611 5.404l67.815 1.35-.754 37-30.754 1.812.63 184.383 30.462 3.016-1.03 32.271s-77.174 2.223-85.279 10.328-9.455 13.508-9.455 13.508l2.701 48.629 334.371-5.484zm-129.34 50.319h30.9l.252 39.847h-36.217s-6.08-.336-6.08-6.416v-27.015c0-4.287 3.378-6.078 11.145-6.416m0 258h30.9l.252 39.85h-36.217s-6.08-.34-6.08-6.419v-27.015c0-4.287 3.378-6.079 11.145-6.416"
              style={{
                fill: "#ccc",
                stroke: "none",
                strokeWidth: ".999999px",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
              }}
              transform="scale(.26458)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(.451 0 0 .451 270.853 -58.256)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__bk)",
              }}
              transform="matrix(.451 0 0 .451 270.853 -58.256)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-.43685 0 0 .43685 468.792 -55.314)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__bl)",
              }}
              transform="matrix(-.43685 0 0 .43685 468.792 -55.314)"
            />
            <g transform="matrix(.62782 0 0 .62782 234.56 -96.594)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(.451 0 0 .451 271.21 -46.908)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__bm)",
              }}
              transform="matrix(.451 0 0 .451 271.21 -46.908)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-.43685 0 0 .43685 469.15 -43.967)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__bn)",
              }}
              transform="matrix(-.43685 0 0 .43685 469.15 -43.967)"
            />
            <g transform="matrix(.62782 0 0 .62782 234.917 -85.247)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
            </g>
            <g transform="matrix(0 -.42014 .42014 0 192.494 104.469)">
              <rect
                width={21.355}
                height={28.145}
                x={198.715}
                y={135.723}
                ry={0}
                style={{
                  fill: "#999",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
              />
              <path
                d="M204.523 135.455h11.169v14.385h-11.169z"
                style={{
                  fill: "#666",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
              />
              <g transform="translate(31.97 -.126)">
                <rect
                  width={21.355}
                  height={28.145}
                  x={198.715}
                  y={135.723}
                  ry={0}
                  style={{
                    fill: "#999",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 0.499999,
                  }}
                />
                <path
                  d="M204.523 135.455h11.169v14.385h-11.169z"
                  style={{
                    fill: "#666",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 0.499999,
                  }}
                />
              </g>
              <g transform="translate(63.938 .355)">
                <rect
                  width={21.355}
                  height={28.145}
                  x={198.715}
                  y={135.723}
                  ry={0}
                  style={{
                    fill: "#999",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 0.499999,
                  }}
                />
                <path
                  d="M204.523 135.455h11.169v14.385h-11.169z"
                  style={{
                    fill: "#666",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 0.499999,
                  }}
                />
              </g>
              <rect
                width={52.181}
                height={28.949}
                x={215.684}
                y={48.964}
                ry={0}
                style={{
                  fill: "#b3b3b3",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
              />
              <rect
                width={43.245}
                height={28.235}
                x={220.516}
                y={58.971}
                ry={0}
                style={{
                  fill: "#999",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
              />
              <rect
                width={86.974}
                height={51.056}
                x={200.528}
                y={84.373}
                ry={1.75}
                style={{
                  fill: "#1a1a1a",
                  fillOpacity: 1,
                  stroke: "#666",
                  strokeWidth: 0.552625,
                }}
              />
              <rect
                width={82.023}
                height={44.318}
                x={203.004}
                y={89.708}
                ry={1.519}
                style={{
                  fill: "#333",
                  fillOpacity: 1,
                  stroke: "#666",
                  strokeWidth: 0.5,
                }}
              />
            </g>
            <g transform="matrix(0 -.42014 -.42014 0 395.36 104.111)">
              <rect
                width={21.355}
                height={28.145}
                x={198.715}
                y={135.723}
                ry={0}
                style={{
                  fill: "#999",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
              />
              <path
                d="M204.523 135.455h11.169v14.385h-11.169z"
                style={{
                  fill: "#666",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
              />
              <g transform="translate(31.97 -.126)">
                <rect
                  width={21.355}
                  height={28.145}
                  x={198.715}
                  y={135.723}
                  ry={0}
                  style={{
                    fill: "#999",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 0.499999,
                  }}
                />
                <path
                  d="M204.523 135.455h11.169v14.385h-11.169z"
                  style={{
                    fill: "#666",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 0.499999,
                  }}
                />
              </g>
              <g transform="translate(63.938 .355)">
                <rect
                  width={21.355}
                  height={28.145}
                  x={198.715}
                  y={135.723}
                  ry={0}
                  style={{
                    fill: "#999",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 0.499999,
                  }}
                />
                <path
                  d="M204.523 135.455h11.169v14.385h-11.169z"
                  style={{
                    fill: "#666",
                    fillOpacity: 1,
                    stroke: "none",
                    strokeWidth: 0.499999,
                  }}
                />
              </g>
              <rect
                width={52.181}
                height={28.949}
                x={215.684}
                y={48.964}
                ry={0}
                style={{
                  fill: "#b3b3b3",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
              />
              <rect
                width={43.245}
                height={28.235}
                x={220.516}
                y={58.971}
                ry={0}
                style={{
                  fill: "#999",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 0.499999,
                }}
              />
              <rect
                width={86.974}
                height={51.056}
                x={200.528}
                y={84.373}
                ry={1.75}
                style={{
                  fill: "#1a1a1a",
                  fillOpacity: 1,
                  stroke: "#666",
                  strokeWidth: 0.552625,
                }}
              />
              <rect
                width={82.023}
                height={44.318}
                x={203.004}
                y={89.708}
                ry={1.519}
                style={{
                  fill: "#333",
                  fillOpacity: 1,
                  stroke: "#666",
                  strokeWidth: 0.5,
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(.451 0 0 .451 208.308 -58.256)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__bo)",
              }}
              transform="matrix(.451 0 0 .451 208.308 -58.256)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-.43685 0 0 .43685 406.247 -55.314)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__bp)",
              }}
              transform="matrix(-.43685 0 0 .43685 406.247 -55.314)"
            />
            <g transform="matrix(.62782 0 0 .62782 172.015 -96.594)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(.451 0 0 .451 208.665 -46.908)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__bq)",
              }}
              transform="matrix(.451 0 0 .451 208.665 -46.908)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-.43685 0 0 .43685 406.605 -43.967)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__br)",
              }}
              transform="matrix(-.43685 0 0 .43685 406.605 -43.967)"
            />
            <g transform="matrix(.62782 0 0 .62782 172.372 -85.247)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#333",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
            </g>
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(.54516 0 0 .54516 303.095 -84.469)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
              }}
              transform="matrix(.54516 0 0 .54516 303.095 -84.469)"
            />
            <path
              d="M199.27 208.494h11.954v13.36H199.27z"
              style={{
                fill: "#b3b3b3",
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.962076,
              }}
              transform="matrix(-.54516 0 0 .54516 539.864 -84.469)"
            />
            <path
              d="m203.406 210.732-.045 9.337"
              style={{
                fill: "#ececec",
                stroke: "#fff",
                strokeWidth: 2,
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
              }}
              transform="matrix(-.54516 0 0 .54516 539.864 -84.469)"
            />
            <g transform="matrix(.54516 0 0 .54516 303.095 -84.469)">
              <rect
                width={21.712}
                height={11.437}
                x={206.681}
                y={209.904}
                ry={1.643}
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="m228.04 210.5 1.043 1.588-1.603-.561zM207.991 222.204l-1.042-1.588 1.603.56z"
                style={{
                  fill: "#4d4d4d",
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <rect
                width={21.712}
                height={11.437}
                x={207.739}
                y={211.492}
                ry={1.643}
                style={{
                  fill: "#d4aa00",
                  stroke: "none",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.382 211.492h1.886c1.047 3.399 1.268 7.014-.044 11.437h-1.842a1.64 1.64 0 0 1-1.643-1.643v-8.151c0-.91.733-1.643 1.643-1.643M227.952 211.492h-1.887c-1.046 3.399-1.267 7.014.045 11.437h1.842a1.64 1.64 0 0 0 1.642-1.643v-8.151a1.64 1.64 0 0 0-1.642-1.643"
                style={{
                  fill: "#b3b3b3",
                  strokeWidth: 1.18118,
                }}
              />
              <path
                d="M209.705 213.279s1.295 2.368 1.072 4.155-.849 3.886-.849 3.886"
                style={{
                  mixBlendMode: "normal",
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
                transform="matrix(-1 0 0 1 419.99 -.045)"
              />
              <path
                d="M226.994 213.107s1.296 2.368 1.072 4.155-.848 3.887-.848 3.887"
                style={{
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 1,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
            </g>
            <path
              d="M209.794-22.695h56.469v50.751h-56.469z"
              style={{
                opacity: 1,
                fill: "none",
                fillOpacity: 0.854902,
                stroke: "#6a7782",
                strokeWidth: 1,
                strokeOpacity: 1,
              }}
            />
            <path
              d="M293.962 30.2h31.451v29.486h-31.451zM320.946-23.231h56.291v50.036h-56.291zM356.507 30.736h30.915v29.843h-30.915zM406.186 24.839h31.273v17.513h-31.273zM406.901 172.982h30.736v16.977h-30.736zM350.431 206.22h32.166v17.513h-32.166zM303.969 204.612h45.569v22.874h-45.569zM295.57 159.401h87.563v30.379H295.57zM241.782 198.715h45.926v30.379h-45.926zM194.426 203.718h44.139v22.695h-44.139zM194.605 174.59h43.782v22.338h-43.782zM244.462 173.875h44.675v22.516h-44.675z"
              style={{
                opacity: 1,
                fill: "none",
                fillOpacity: 1,
                stroke: "#6a7782",
                strokeWidth: 1,
                strokeOpacity: 1,
              }}
            />
            <path
              d="M210.516 77.332V44.48h62.675l.253 32.853h16.68v91.738h-97.298V77.332Z"
              style={{
                opacity: 1,
                fill: "none",
                stroke: "#6a7782",
              }}
            />

            {deviceReference.right_side_pins.map((item: any, i: number) => {
              const pin = item.split("(")[0].match(/^[GDgd][A-Za-z]*(\d+)$/);
              let isUsed = null;
              if (pin) {
                const find = pinAssigned.find(
                  (item) => item.pinNumber == Number(pin[1]),
                );
                if (find) {
                  isUsed = find;
                }
              }
              return (
                <g key={`device/leftpins/${i}`}>
                  <g transform={`translate(${i * pointIntervalRight})`}>
                    <path
                      d="M -145.2,-73.984 A 6 6 0 1 0 -145.199,-73.984 Z"
                      style={{
                        fill: `${isUsed && isUsed.status == "active" ? "greenyellow" : isUsed?.status == "error" ? "red" : "#a4a39b"}`,
                        fillOpacity: 1,
                        stroke: "none",
                        strokeWidth: 7.99999,
                        strokeOpacity: 1,
                      }}
                    />
                    <text
                      x="-145.2"
                      y="-58"
                      textAnchor="middle"
                      dominantBaseline="hanging"
                      className="text-xs fill-white font-medium"
                    >
                      {item.split("(")[0]}
                    </text>
                  </g>
                  {isUsed && (
                    <WireRight
                      isUsed={isUsed}
                      i={i}
                      pointIntervalRight={pointIntervalRight}
                      setSelectedSensor={setSelectedSensor}
                      setShowSensor={setShowSensor}
                    />
                  )}
                </g>
              );
            })}
            {deviceReference.left_side_pins.map((item: any, i: number) => {
              const pin = item.split("(")[0].match(/^[GDgd][A-Za-z]*(\d+)$/);
              let isUsed = null;
              if (pin) {
                const find = pinAssigned.find(
                  (item) => item.pinNumber == Number(pin[1]),
                );
                if (find) {
                  isUsed = find;
                }
              }
              return (
                <g key={`device/rightpins/${i}`}>
                  <g transform={`translate(${i * pointIntervalLeft} 352)`}>
                    <path
                      d="M -145.2,-73.984 A 6 6 0 1 0 -145.199,-73.984 Z"
                      style={{
                        fill: `${isUsed && isUsed.status == "active" ? "greenyellow" : isUsed?.status == "error" ? "red" : "#a4a39b"}`,
                        fillOpacity: 1,
                        stroke: "none",
                        strokeWidth: 7.99999,
                        strokeOpacity: 1,
                      }}
                    />
                    <text
                      x="-145.2"
                      y="-90"
                      textAnchor="middle"
                      dominantBaseline="hanging"
                      className="text-xs fill-white font-medium"
                    >
                      {item.split("(")[0]}
                    </text>
                  </g>
                  {isUsed && (
                    <WireLeft
                      isUsed={isUsed}
                      i={i}
                      pointIntervalLeft={pointIntervalLeft}
                      setSelectedSensor={setSelectedSensor}
                      setShowSensor={setShowSensor}
                    />
                  )}
                </g>
              );
            })}
            <text
              xmlSpace="preserve"
              x={-187.418}
              y={-102.315}
              style={{
                fontSize: "19.7338px",
                lineHeight: 0,
                fontFamily: "sans-serif",
                letterSpacing: "-.79375px",
                fill: "#e6e6e6",
                strokeWidth: 0.370009,
              }}
              transform="rotate(-90)"
            >
              <title>{deviceReference.model_name}</title>
              <tspan
                x={-187.418}
                y={-102.315}
                style={{
                  fontStyle: "normal",
                  fontVariant: "normal",
                  fontWeight: 400,
                  fontStretch: "normal",
                  fontFamily: "sans-serif",
                  fill: "#e6e6e6",
                  strokeWidth: 0.370009,
                }}
              >
                {deviceReference.model_name.slice(0, 15)}...
              </tspan>
            </text>
            <text
              xmlSpace="preserve"
              x={-177.53}
              y={-128.901}
              style={{
                fontSize: "22.7382px",
                lineHeight: 0,
                fontFamily: "sans-serif",
                letterSpacing: "-.9146px",
                fill: "#e6e6e6",
                strokeWidth: 0.426342,
              }}
              transform="rotate(-90)"
            >
              <title>{deviceReference.parent_model}</title>
              <tspan
                x={-177.53}
                y={-128.901}
                style={{
                  fontStyle: "normal",
                  fontVariant: "normal",
                  fontWeight: 700,
                  fontStretch: "normal",
                  fontFamily: "sans-serif",
                  fill: "#e6e6e6",
                  strokeWidth: 0.426342,
                }}
              >
                {(() => {
                  const a = deviceReference.parent_model.split(" ");
                  if (a.length > 1) {
                    let other = "";
                    a.forEach((item: string, i: number) => {
                      if (i > 0) {
                        other = other + item[0].toUpperCase();
                      }
                    });
                    return `${a[0] + " " + other}`;
                  }
                  return a[0];
                })()}
              </tspan>
            </text>
            <g transform="translate(-3.925 99.603)">
              <rect
                width={25.651}
                height={56.609}
                x={-75.184}
                y={46.501}
                ry={9.982}
                style={{
                  opacity: 1,
                  fill: "#ccc",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: 7.99999,
                  strokeOpacity: 1,
                }}
              />
              <path
                d="M-74.084 57.26c.758-5.434 2.233-7.262 4.269-8.678 1.556-1.083 9.9-1.973 13.29-.234 3.374 1.73 5.634 5.373 5.95 9.038s.088 15.75.088 15.75-2.11-3.557-5.521-3.367-10.103-.151-11.815 0c-6.567-1.613-6.607-9.442-6.261-12.51"
                style={{
                  display: "inline",
                  fill: "#999",
                  fillOpacity: 1,
                  stroke: "none",
                  strokeWidth: ".264583px",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeOpacity: 1,
                }}
              />
              <text
                xmlSpace="preserve"
                x={-100.322}
                y={-55.314}
                style={{
                  fontSize: "19.7338px",
                  lineHeight: 1.25,
                  fontFamily: "sans-serif",
                  display: "inline",
                  strokeWidth: 0.370009,
                }}
                transform="rotate(-90)"
              >
                <tspan
                  x={-100.322}
                  y={-55.314}
                  style={{
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 700,
                    fontStretch: "normal",
                    fontFamily: "sans-serif",
                    strokeWidth: 0.370009,
                  }}
                >
                  {"W"}
                </tspan>
              </text>
              <text
                xmlSpace="preserve"
                x={-77.671}
                y={-55.82}
                style={{
                  fontSize: "18.205px",
                  lineHeight: 1.25,
                  fontFamily: "sans-serif",
                  display: "inline",
                  strokeWidth: 0.341343,
                }}
                transform="rotate(-90)"
              >
                <tspan
                  x={-77.671}
                  y={-55.82}
                  style={{
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 700,
                    fontStretch: "normal",
                    fontFamily: "sans-serif",
                    strokeWidth: 0.341343,
                  }}
                >
                  {"i"}
                </tspan>
              </text>
              <text
                xmlSpace="preserve"
                x={-68.155}
                y={-55.772}
                style={{
                  fontSize: "19.7338px",
                  lineHeight: 1.25,
                  fontFamily: "sans-serif",
                  display: "inline",
                  strokeWidth: 0.370009,
                }}
                transform="rotate(-90)"
              >
                <tspan
                  x={-68.155}
                  y={-55.772}
                  style={{
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 700,
                    fontStretch: "normal",
                    fontFamily: "sans-serif",
                    strokeWidth: 0.370009,
                  }}
                >
                  {"F"}
                </tspan>
              </text>
              <text
                xmlSpace="preserve"
                x={-56.127}
                y={-55.117}
                style={{
                  fontSize: "19.7338px",
                  lineHeight: 1.25,
                  fontFamily: "sans-serif",
                  display: "inline",
                  strokeWidth: 0.370009,
                }}
                transform="rotate(-90)"
              >
                <tspan
                  x={-56.127}
                  y={-55.117}
                  style={{
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 700,
                    fontStretch: "normal",
                    fontFamily: "sans-serif",
                    strokeWidth: 0.370009,
                  }}
                >
                  {"i"}
                </tspan>
              </text>
            </g>
            <g
              style={{
                fill: "#f9f9f9",
              }}
            >
              <g
                fill="#000"
                style={{
                  fill: "#f9f9f9",
                }}
                transform="matrix(.3601 0 0 .3601 -15.851 -.263)"
              >
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={40}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={64}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={72}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={144}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={152}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={216}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={32}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={40}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={40}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={40}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={40}
                  y={136}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={40}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={40}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={40}
                  y={184}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={40}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={40}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={40}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={64}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={104}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={120}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={144}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={184}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={48}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={64}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={104}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={136}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={144}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={56}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={64}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={120}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={64}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={72}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={72}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={72}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={72}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={72}
                  y={152}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={72}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={72}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={40}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={64}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={72}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={144}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={216}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={80}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={88}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={88}
                  y={104}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={88}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={88}
                  y={120}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={88}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={88}
                  y={136}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={88}
                  y={152}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={88}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={88}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={88}
                  y={184}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={88}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={40}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={72}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={136}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={184}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={200}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={96}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={64}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={72}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={88}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={136}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={152}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={184}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={104}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={40}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={88}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={104}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={152}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={184}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={216}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={112}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={120}
                  y={72}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={120}
                  y={88}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={120}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={120}
                  y={144}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={120}
                  y={152}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={120}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={120}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={120}
                  y={216}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={120}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={72}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={104}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={120}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={144}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={184}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={128}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={136}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={136}
                  y={40}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={136}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={136}
                  y={104}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={136}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={136}
                  y={120}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={136}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={136}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={136}
                  y={184}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={136}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={136}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={136}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={40}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={88}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={104}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={152}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={216}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={144}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={40}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={72}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={88}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={144}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={184}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={216}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={152}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={40}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={152}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={160}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={168}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={168}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={168}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={168}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={168}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={168}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={168}
                  y={200}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={40}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={72}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={88}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={120}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={144}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={216}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={176}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={184}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={184}
                  y={64}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={184}
                  y={88}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={184}
                  y={104}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={184}
                  y={136}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={184}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={184}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={184}
                  y={200}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={184}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={184}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={88}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={200}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={216}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={192}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={120}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={144}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={152}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={184}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={200}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={40}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={64}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={72}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={104}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={136}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={184}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={208}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={216}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={216}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={216}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={216}
                  y={120}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={216}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={216}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={216}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={216}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={216}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={216}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={64}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={104}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={120}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={136}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={144}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={152}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={200}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={216}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={224}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={232}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={232}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={232}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={232}
                  y={64}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={232}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={232}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={232}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={232}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={232}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={232}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={232}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={232}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={240}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={240}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={240}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={240}
                  y={64}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={240}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={240}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={240}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={240}
                  y={160}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={240}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={240}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={240}
                  y={224}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={240}
                  y={256}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={96}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={112}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={128}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={144}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={176}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={184}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={192}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={208}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={216}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={240}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={248}
                  y={248}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={32}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={40}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={48}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={56}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={64}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={72}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={80}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={104}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={120}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={136}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={168}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={200}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
                <use
                  xlinkHref="#1666364456Esp32_devkitc_v4_svg__dD"
                  width="100%"
                  height="100%"
                  x={256}
                  y={232}
                  style={{
                    fill: "#f9f9f9",
                  }}
                />
              </g>
            </g>
            <path
              d="M-82.985 111.604v2.1a16.71 16.71 0 0 0 8.35 14.465 16.71 16.71 0 0 0 16.702 0 16.71 16.71 0 0 0 8.35-14.464v-2.101h-3.84a12.905 14.876 0 0 1-.947 5.554c-.81 2.864-2.576 5.383-5.12 7.037a12.905 14.876 0 0 1-.385.278 12.905 14.876 0 0 1-12.906 0 12.905 14.876 0 0 1-1.54-1.206 12.3 12.3 0 0 1-3.31-4.51 12.905 14.876 0 0 1-1.602-7.153zM-69.002 88.186v14.592a12.905 14.876 0 0 1-3.779-1.661 12.905 14.876 0 0 1-1.54-1.207 12.3 12.3 0 0 1-3.31-4.51 12.905 14.876 0 0 1-1.602-7.153h-3.752v2.101a16.71 16.71 0 0 0 8.35 14.464 16.71 16.71 0 0 0 16.702 0 16.71 16.71 0 0 0 8.35-14.464v-2.1h-3.84a12.905 14.876 0 0 1-.947 5.554c-.81 2.864-2.576 5.382-5.12 7.037a12.905 14.876 0 0 1-.385.278 12.905 14.876 0 0 1-4.81 1.864V88.186Z"
              style={{
                color: "#000",
                fill: "#ccc",
                strokeWidth: 0.525215,
              }}
            />
            <g
              style={{
                stroke: "#ccc",
                strokeOpacity: 1,
              }}
            >
              <path
                d="M-52.18-240.173s-29.328 7.874-28.593 41.816c.714 32.943 28.592 41.815 28.592 41.815"
                style={{
                  fill: "none",
                  stroke: "#ccc",
                  strokeWidth: 8,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeOpacity: 1,
                }}
                transform="rotate(-90 25.552 8.666)scale(.41929)"
              />
              <path
                d="M-36.455-231.953S-58.686-224.431-59.329-198c-.6 24.727 21.087 33.596 21.087 33.596"
                style={{
                  fill: "none",
                  stroke: "#ccc",
                  strokeWidth: 8,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeOpacity: 1,
                }}
                transform="rotate(-90 25.552 8.666)scale(.41929)"
              />
              <path
                d="M-23.231-222.125S-37.954-213.712-38.063-198c-.124 17.76 13.045 26.269 13.045 26.269M-10.007-212.117s-7.148 5.732-7.148 15.547c0 11.165 6.433 17.512 6.433 17.512"
                style={{
                  fill: "none",
                  stroke: "#ccc",
                  strokeWidth: 8,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeOpacity: 1,
                }}
                transform="rotate(-90 25.552 8.666)scale(.41929)"
              />
            </g>
            {deviceReference.has_reset_button && (
              <text
                xmlSpace="preserve"
                x={-228.868}
                y={400.178}
                style={{
                  fontSize: "17.6389px",
                  lineHeight: 1.25,
                  fontFamily: "sans-serif",
                  strokeWidth: 0.264583,
                }}
                transform="rotate(-90)"
              >
                <tspan
                  x={-234.868}
                  y={405.178}
                  style={{
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 400,
                    fontStretch: "normal",
                    fontSize: "17.6389px",
                    fontFamily: "sans-serif",
                    fill: "#b3b3b3",
                    strokeWidth: 0.264583,
                  }}
                >
                  {"RST"}
                </tspan>
              </text>
            )}
            {deviceReference.has_boot_button && (
              <text
                xmlSpace="preserve"
                x={-20.146}
                y={400.893}
                style={{
                  fontSize: "17.6389px",
                  lineHeight: 1.25,
                  fontFamily: "sans-serif",
                  strokeWidth: 0.264583,
                }}
                transform="rotate(-90)"
              >
                <tspan
                  x={-18}
                  y={405.893}
                  style={{
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: 400,
                    fontStretch: "normal",
                    fontSize: "17.6389px",
                    fontFamily: "sans-serif",
                    fill: "#b3b3b3",
                    strokeWidth: 0.264583,
                  }}
                >
                  {"BOOT"}
                </tspan>
              </text>
            )}
            <circle
              cx={327.686}
              cy={217.785}
              r={3}
              className="animate-pulse"
              style={{
                mixBlendMode: "normal",
                fill: `${selectedDevice.hardware.telemetrySummary.status == "online" ? "green" : "red"}`,
                stroke: `${selectedDevice.hardware.telemetrySummary.status == "online" ? "green" : "red"}`,
                strokeWidth: 1,
                filter: "url(#1666364456Esp32_devkitc_v4_svg__dE)",
              }}
              transform="matrix(2.57967 0 0 2.57967 -517.635 -344.649)"
            />
          </g>
        </svg>
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
    </article>
  ) : (
    <Loading/>
  );
}
