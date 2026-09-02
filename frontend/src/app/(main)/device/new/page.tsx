"use client";
import Input1New from "@/components/repeated/Input1New";
import Input2New from "@/components/repeated/Input2New";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { getCoordinates } from "@/utils/getCoordinates";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function page() {
  const [deviceInfo, setDeviceInfo] = useState<{
    farmId: string | null;
    nickName: string;
    macAddress: string;
    hardware: {
      model: string;
      firmwareVersion: string;
      powerSource: "solar" | "battery" | "grid";
      coordinates: [number, number] | null;
    };
  }>({
    farmId: null,
    nickName: "",
    macAddress: "",
    hardware: {
      model: "",
      firmwareVersion: "",
      powerSource: "battery",
      coordinates: null,
    },
  });
  const [tvIndc, setTvIndc] = useState<boolean>(false);
  const [errorMess, setErrorMess] = useState<Record<string, string> | null>(
    null,
  );
  const farms = useAppSelector((store) => store.summary.farms);
  const deviceValidation = (fields: { value: any; type: string }[]) => {
    for (const item of fields) {
      if (item.type == "nickName") {
        if (item.value.trim().length <= 3) {
          setErrorMess((prev) => ({
            ...prev,
            [item.type]: `Invalid ${item.type}`,
          }));
          return false;
        }
      }
      if (item.type == "model") {
        if (item.value.trim().length <= 3) {
          setErrorMess((prev) => ({
            ...prev,
            [item.type]: `Invalid ${item.type}`,
          }));
          return false;
        }
      }
      if (item.type == "powerSource") {
        if (!["solar", "battery", "grid"].includes(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            [item.type]: `Invalid ${item.type}`,
          }));
          return false;
        }
      }
      if (item.type == "macAddress") {
        if (!/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            [item.type]: `Invalid ${item.type}`,
          }));
          return false;
        }
      }
      if (item.type == "coordinates") {
        if (!item.value) {
          setErrorMess((prev) => ({
            ...prev,
            [item.type]: `Requires ${item.type}`,
          }));
          const getTarget = document.getElementById("deviceHead");
          if (getTarget) {
            getTarget.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          return false;
        }
        if (
          !(
            Number.isFinite(item.value[0]) &&
            Number.isFinite(item.value[1]) &&
            item.value[0] >= -90 &&
            item.value[0] <= 90 &&
            item.value[1] >= -180 &&
            item.value[1] <= 180
          )
        ) {
          setErrorMess((prev) => ({
            ...prev,
            [item.type]: `Invalid ${item.type}`,
          }));
          return false;
        }
      }
      if (item.type == "firmwareVersion") {
        if (!/^\d+\.\d+\.\d+$/.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            [item.type]: `Invalid ${item.type}`,
          }));
          return false;
        }
      }
      if (item.type == "farmId") {
        if (!farms || farms.length <= 0) {
          setErrorMess((prev) => ({
            ...prev,
            [item.type]: `First Add Farm and then proceed again.`,
          }));
          const getTarget = document.getElementById("deviceHead");
          if (getTarget) {
            getTarget.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          return false;
        }
        const existingFarmId = farms.map((item) => item._id);
        if (!existingFarmId.includes(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            [item.type]: `Please Select Farm.`,
          }));
          const getTarget = document.getElementById("deviceHead");
          if (getTarget) {
            getTarget.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          return false;
        }
      }
    }
    return true;
  };
  const [fetchCoords, setFetchCoords] = useState<boolean>(false);
  const { sendRequest, loading } = useApi();
  const dispatch = useAppDispatch();
  const warningRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (fetchCoords) {
      const coordsFunc = async () => {
        const getCoords = await getCoordinates();
        if (!getCoords.latitude || !getCoords.longitude) return;
        setDeviceInfo((prev) => ({
          ...prev,
          hardware: {
            ...prev.hardware,
            coordinates: [getCoords.latitude, getCoords.longitude],
          },
        }));
        setErrorMess((prev) => {
          if (prev && prev.coordinates) {
            const { coordinates, ...other } = prev;
            return other;
          }
          return prev;
        });
        setFetchCoords(false);
      };
      coordsFunc();
    }
  }, [fetchCoords]);
  const [trainAnime, setTrainAnime] = useState<number>(0);
  const sampleText =
    "Basic detail of Device is asked here, later you can modify, delete and add advanced setting of the device from device page.";
  useEffect(() => {
    const bar = warningRef.current;
    if (!bar) {
      return;
    }
    const barWidth = bar.clientWidth;
    const trainInt = setInterval(() => {
      setTrainAnime((prev) => {
        if (prev >= barWidth) {
          return 0;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(trainInt);
  }, []);

  return (
    <section className="flex min-h-screen flex-col blueprint-grid09">
      <article className="flex flex-col py-4 h-fit text-textPri">
        <article className="flex flex-col gap-8 w-full items-center-safe">
          <div
            id="deviceHead"
            className="max-w-212 text-center flex flex-col items-center mt-20"
          >
            <h2
              style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
              className="m-0 tracking-tighter leading-[1.05]"
            >
              New to farm —
              <span className="text-ter"> Add Device Specification</span>
            </h2>
            <p className="max-w-180 text-center mt-4"></p>
          </div>
          <article className="relative w-[95%] md:w-3/4 lg:w-1/2 rounded-xl bg-bgsecondary/70 border grid grid-cols-1 min-[480]:grid-cols-2 gap-3">
            <div className="flex flex-col justify-between gap-3 p-4 md:p-6">
              <div
                id="farmSide"
                className={`flex flex-col p-3 ${errorMess && errorMess.farmId && "border border-borderhover shadow-[0.1px_0.1px_10px_1px_inset] shadow-borderhover rounded-md animate-pulse"}`}
                style={{
                  animationDuration: "0.5s",
                  animationIterationCount: "3",
                }}
              >
                <p className="text-xl pb-4 font-medium after:content-['*'] after:pl-1 after:text-red-500">
                  Select Farm
                </p>
                <div className="flex flex-nowrap overflow-x-scroll gap-2 scrollbar-none">
                  {farms &&
                    farms.length > 0 &&
                    farms.map((item, i) => (
                      <p
                        key={`device/view/listed/${i}`}
                        className={`rounded-md py-0.5 px-3 cursor-pointer font-bold ${deviceInfo.farmId == item._id ? "border border-sec outline-1 outline-pri bg-borderhover/50" : "bg-borderhover"} whitespace-nowrap transition-all`}
                        onClick={() => {
                          setDeviceInfo((inthere) => ({
                            ...inthere,
                            farmId: item._id,
                          }));
                          setErrorMess((prev) => {
                            if (prev && prev.farmId) {
                              const { farmId, ...other } = prev;
                              return other;
                            }
                            return prev;
                          });
                        }}
                      >
                        {item.nickName}
                      </p>
                    ))}
                </div>
                {errorMess && errorMess.farmId && (
                  <small className="text-red-500 py-2">
                    {errorMess.farmId}
                  </small>
                )}
                <Link
                  href={`/farm/new`}
                  className="text-xs text-ter font-bold pt-4 cursor-pointer ml-2 w-fit"
                >
                  Add new Farm ?
                </Link>
              </div>
              <div className="ml-2" id="coordsSide">
                <p
                  style={{ animationDuration: "0.5s" }}
                  className={`font-bold text-sm w-fit cursor-pointer text-pri ${fetchCoords && "animate-pulse"} after:content-['*'] after:pl-1 after:text-red-500`}
                  onClick={() => {
                    setFetchCoords(true);
                  }}
                >
                  Get Current Coordinates ?
                </p>
                {errorMess && errorMess.coordinates && (
                  <small className="text-red-500 animate-pulse">
                    {errorMess.coordinates}
                  </small>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4 md:p-6">
              <Input1New
                errorMess={errorMess}
                setErrorMess={setErrorMess}
                fieldValue={deviceInfo.nickName}
                setfieldValue={(value) => {
                  setDeviceInfo((item) => ({ ...item, nickName: value }));
                }}
                handleNext={() => {
                  if (
                    !deviceValidation([
                      { value: deviceInfo.nickName, type: "nickName" },
                    ])
                  ) {
                    return;
                  }

                  const nextfield = document.getElementById("dmacAddress");
                  if (nextfield) {
                    nextfield.focus();
                  }
                }}
                type="text"
                name="dname"
                htmlFor="dname"
                id="dname"
                label="Name"
                errorKey="nickName"
                autoFocus={true}
                required={true}
              />
              <Input1New
                errorMess={errorMess}
                setErrorMess={setErrorMess}
                fieldValue={deviceInfo.macAddress}
                setfieldValue={(value) => {
                  setDeviceInfo((item) => ({ ...item, macAddress: value }));
                }}
                handleNext={() => {
                  if (
                    !deviceValidation([
                      { value: deviceInfo.macAddress, type: "macAddress" },
                    ])
                  ) {
                    return;
                  }

                  const nextfield = document.getElementById("dmodel");
                  if (nextfield) {
                    nextfield.focus();
                  }
                }}
                type="text"
                name="dmacAddress"
                htmlFor="dmacAddress"
                id="dmacAddress"
                label="MAC Address"
                errorKey="macAddress"
                autoFocus={false}
                required={true}
              />
              <div className="flex flex-wrap gap-4">
                <Input1New
                  errorMess={errorMess}
                  setErrorMess={setErrorMess}
                  fieldValue={deviceInfo.hardware.model}
                  setfieldValue={(value) => {
                    setDeviceInfo((item) => ({
                      ...item,
                      hardware: { ...item.hardware, model: value },
                    }));
                  }}
                  handleNext={() => {
                    if (
                      !deviceValidation([
                        {
                          value: deviceInfo.hardware.model,
                          type: "model",
                        },
                      ])
                    ) {
                      return;
                    }

                    const nextfield = document.getElementById("dpower");
                    if (nextfield) {
                      nextfield.focus();
                    }
                  }}
                  type="text"
                  name="dmodel"
                  htmlFor="dmodel"
                  id="dmodel"
                  label="Model"
                  errorKey="model"
                  autoFocus={false}
                  required={true}
                />
                <Input2New
                  errorMess={errorMess}
                  setErrorMess={setErrorMess}
                  fieldValue={deviceInfo.hardware.powerSource}
                  setfieldValue={(value) => {
                    setDeviceInfo((item) => ({
                      ...item,
                      hardware: { ...item.hardware, powerSource: value },
                    }));
                  }}
                  handleNext={() => {
                    if (
                      !deviceValidation([
                        {
                          value: deviceInfo.hardware.powerSource,
                          type: "powerSource",
                        },
                      ])
                    ) {
                      return;
                    }

                    const nextfield = document.getElementById("dversion");
                    if (nextfield) {
                      nextfield.focus();
                    }
                  }}
                  name="dpower"
                  htmlFor="dpower"
                  id="dpower"
                  label="Power Source"
                  errorKey="powerSource"
                  autoFocus={false}
                  required={false}
                  options={["solar", "battery", "grid"]}
                />
              </div>
              <div className="flex gap-2">
                <div className="relative max-h-full w-80 self-center rounded-md grid grid-cols-2 border-2 border-txlight">
                  <label
                    htmlFor="dcoords1"
                    className={`absolute left-3 mr-2 -top-2 bg-bgsecondary text-xs text-txlight cursor-text  px-1 transition-all after:content-['*'] after:pl-1 after:text-red-500 break-all line-clamp-1 `}
                  >
                    Coordinates
                  </label>
                  <div className="border-r border-r-txlight overflow-hidden flex items-center justify-center">
                    <input
                      type="number"
                      name="dcoords1"
                      id="dcoords1"
                      placeholder="X"
                      className="m-2 w-8/10 border-none focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      onChange={(e) => {
                        setErrorMess((prev) => {
                          if (prev && prev.coordinates) {
                            const { coordinates, ...other } = prev;
                            return other;
                          }
                          return prev;
                        });
                        setDeviceInfo((item) => ({
                          ...item,
                          hardware: {
                            ...item.hardware,
                            coordinates: [
                              Number(e.target.value),
                              item.hardware.coordinates
                                ? item.hardware.coordinates[1]
                                : 0,
                            ],
                          },
                        }));
                      }}
                      value={
                        deviceInfo.hardware.coordinates
                          ? deviceInfo.hardware.coordinates[0]
                          : "0"
                      }
                    />
                  </div>
                  <div className="border-r border-r-txlight overflow-hidden flex items-center justify-center">
                    <input
                      type="number"
                      name="dcoords2"
                      id="dcoords2"
                      placeholder="Y"
                      className="w-8/10 border-none focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      onChange={(e) => {
                        setErrorMess((prev) => {
                          if (prev && prev.coordinates) {
                            const { coordinates, ...other } = prev;
                            return other;
                          }
                          return prev;
                        });
                        setDeviceInfo((item) => ({
                          ...item,
                          hardware: {
                            ...item.hardware,
                            coordinates: [
                              item.hardware.coordinates
                                ? item.hardware.coordinates[0]
                                : 0,
                              Number(e.target.value),
                            ],
                          },
                        }));
                      }}
                      value={
                        deviceInfo.hardware.coordinates
                          ? deviceInfo.hardware.coordinates[1]
                          : "0"
                      }
                    />
                  </div>
                </div>
                <div className="self-center w-full">
                  <Input1New
                    errorMess={errorMess}
                    setErrorMess={setErrorMess}
                    fieldValue={deviceInfo.hardware.firmwareVersion}
                    setfieldValue={(value) => {
                      setDeviceInfo((item) => ({
                        ...item,
                        hardware: { ...item.hardware, firmwareVersion: value },
                      }));
                    }}
                    handleNext={() => {
                      if (
                        !deviceValidation([
                          {
                            value: deviceInfo.hardware.firmwareVersion,
                            type: "firmwareVersion",
                          },
                        ])
                      ) {
                        return;
                      }

                      const nextfield = document.getElementById("dcords");
                      if (nextfield) {
                        nextfield.focus();
                      }
                    }}
                    type="text"
                    name="dversion"
                    htmlFor="dversion"
                    id="dversion"
                    label="Version"
                    errorKey="firmwareVersion"
                    autoFocus={false}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div className="bg-bgprimary/40 min-[480]:col-span-2 rounded-b-xl outline-hidden overflow-hidden flex items-center whitespace-nowrap">
              <div
                style={{ transform: `translateX(-${trainAnime}px)` }}
                className="inline-flex py-2"
              >
                <small
                  ref={warningRef}
                  className="text-xs transition-all duration-100 pr-12"
                >
                  {sampleText}
                </small>
                <small className="text-xs transition-all duration-100">
                  {sampleText}
                </small>
              </div>
            </div>
            <ChevronDown className="absolute size-20 stroke-[0.3] -bottom-13 scale-x-125 left-3 min-[480]:left-10 font-extralight rotate-180" />
            <div className="absolute -bottom-3.5 rounded-b-md border border-white/80 left-[45%] sm:left-1/2 p-1 flex gap-1 flex-nowrap">
              <div
                style={{ animationDuration: "0.7s", animationDelay: "0.1s" }}
                className={`w-1 h-1 ${tvIndc && "animate-pulse bg-red-500"} bg-red-800 rounded-full`}
              ></div>
              <div
                style={{ animationDuration: "0.7s", animationDelay: "0.2s" }}
                className={`w-1 h-1 ${tvIndc && "animate-pulse bg-yellow-500"} bg-yellow-800 rounded-full`}
              ></div>
              <div
                style={{ animationDuration: "0.7s", animationDelay: "0.3s" }}
                className={`w-1 h-1 ${tvIndc && "animate-pulse bg-green-500"} bg-green-800 rounded-full`}
              ></div>
            </div>
            <ChevronDown className="absolute size-20 stroke-[0.3] -bottom-13 scale-x-125 right-3 min-[480]:right-10 font-extralight rotate-180" />
            {tvIndc && (
              <div className="spinner border-2 w-3 absolute top-2 left-1/2"></div>
            )}
          </article>
        </article>
      </article>
      <article className="sticky self-center -bottom-40 w-50 scale-x-90 scale-y-150 rotate-x-60 origin-bottom transition-all">
        <TVRemote
          onSubmit={() => {
            try {
              setTvIndc(true);
              if (
                !deviceValidation([
                  { value: deviceInfo.farmId, type: "farmId" },
                  { value: deviceInfo.nickName, type: "nickName" },
                  { value: deviceInfo.macAddress, type: "macAddress" },
                  { value: deviceInfo.hardware.model, type: "model" },
                  {
                    value: deviceInfo.hardware.powerSource,
                    type: "powerSource",
                  },
                  {
                    value: deviceInfo.hardware.coordinates,
                    type: "coordinates",
                  },
                  {
                    value: deviceInfo.hardware.firmwareVersion,
                    type: "firmwareVersion",
                  },
                ])
              ) {
                return false;
              }
              sendRequest("api/device", "POST", deviceInfo)
                .then((result) => {
                  const data = result.data as Data<DeviceInSummary> | undefined;
                  if (result && result.success) {
                    toast.success(
                      data?.message || "Device added Successfully.",
                    );
                    if (data && data.data) {
                      const newDevice = data.data;
                      setDeviceInfo({
                        farmId: null,
                        nickName: "",
                        macAddress: "",
                        hardware: {
                          model: "",
                          firmwareVersion: "",
                          powerSource: "battery",
                          coordinates: null,
                        },
                      });
                      dispatch(addDevice(newDevice));
                    }
                  } else {
                    if (data && data.errors) {
                      setErrorMess((prev) => ({ ...prev, ...data.errors }));
                    }
                  }
                })
                .catch((error) => {
                  throw new Error("Failed to add new Device");
                });
            } catch (error) {
              if (error instanceof Error)
                toast.error(error?.message || "Failed to add new Device");
            } finally {
              setTvIndc(false);
            }
          }}
          setDeviceInfo={setDeviceInfo}
          tvIndc={tvIndc}
        />
      </article>
    </section>
  );
}
import {
  ArrowLeft,
  ChevronDown,
  Home,
  Menu,
  Mic,
  Power,
  RotateCcw,
  Volume2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import { addDevice, DeviceInSummary } from "@/store/slices/SummarySlice";
import { Data } from "@/types/data";
import toast from "react-hot-toast";

type TVRemoteProps = {
  onSubmit: () => void;
  onButtonPress?: (button: string) => void;
  tvIndc: boolean;
  setDeviceInfo: React.Dispatch<
    React.SetStateAction<{
      farmId: string | null;
      nickName: string;
      macAddress: string;
      hardware: {
        model: string;
        firmwareVersion: string;
        powerSource: "solar" | "battery" | "grid";
        coordinates: [number, number] | null;
      };
    }>
  >;
};

export function TVRemote({
  onSubmit,
  onButtonPress,
  setDeviceInfo,
  tvIndc,
}: TVRemoteProps) {
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const press = (button: string) => {
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
    }, 200);
    onButtonPress?.(button);
  };
  const router = useRouter();
  const buttonClass =
    "flex items-center justify-center rounded-full bg-zinc-800 text-zinc-200 shadow-[inset_0_1px_1px_rgba(255,255,255,.08),0_2px_4px_rgba(0,0,0,.5)] transition-all duration-100 hover:bg-zinc-700 active:bg-zinc-700 hover:scale-90 active:scale-90";

  return (
    <div
      className="
          relative
          overflow-hidden
          rounded-[42px]
          border
          border-zinc-700
          bg-linear-to-b
          from-zinc-800
          via-zinc-900
          to-black
          px-7
          pb-8
          pt-6
          shadow-[0_30px_70px_rgba(0,0,0,.7),inset_0_1px_1px_rgba(255,255,255,.1)]
        "
    >
      {/* Top highlight */}
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/10" />
      {/* Power / microphone */}
      <div className="mb-7 flex items-center justify-between px-2">
        <button
          type="button"
          onClick={() => {
            press("power");
            setDeviceInfo({
              farmId: null,
              nickName: "",
              macAddress: "",
              hardware: {
                model: "",
                firmwareVersion: "",
                powerSource: "battery",
                coordinates: null,
              },
            });
          }}
          className="
              flex h-11 w-11 items-center justify-center
              rounded-full
              bg-red-600
              text-white
              shadow-[0_3px_8px_rgba(0,0,0,.6)]
              transition
              hover:bg-red-500 active:bg-red-500
              active:scale-90
            "
        >
          <Power size={19} strokeWidth={2.5} />
        </button>

        {/* IR / LED */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative flex items-center justify-center">
            <div
              className={`h-2 w-2 rounded-full ${buttonClicked ? "bg-red-500" : "bg-red-800"}  shadow-[0_0_8px_rgba(239,68,68,.8)] transition-all`}
            />
          </div>
          {tvIndc && <div className="spinner border-3 w-3 absolute"></div>}
        </div>

        <button
          type="button"
          onClick={() => press("voice")}
          className={`${buttonClass} h-11 w-11`}
        >
          <Mic size={17} />
        </button>
      </div>
      {/* Submit */}
      <button
        disabled={tvIndc}
        type="button"
        onClick={() => {
          press("submit");
          onSubmit();
        }}
        className={`flex h-15 w-full mb-8 items-center justify-center border rounded-full border-zinc-500 bg-linear-to-b from-borderhover to-borderhover/40 text-lg text-white font-bold shadow-[0_3px_8px_rgba(0,0,0,.7),inset_0_1px_2px_rgba(255,255,255,.8)] transition hover:scale-95 active:scale-95 cursor-pointer ${tvIndc && "animate-pulse"}`}
      >
        Submit
      </button>

      {/* Navigation buttons */}
      <div className="mb-6 flex justify-center gap-7">
        <button
          type="button"
          onClick={() => {
            press("back");
            router.back();
          }}
          className={`${buttonClass} h-10 w-10`}
        >
          <ArrowLeft size={16} />
        </button>

        <button
          type="button"
          onClick={() => {
            press("home");
            router.push("/device");
          }}
          className={`${buttonClass} h-10 w-10`}
        >
          <Home size={16} />
        </button>

        <button
          type="button"
          onClick={() => press("menu")}
          className={`${buttonClass} h-10 w-10`}
        >
          <Menu size={16} />
        </button>
      </div>

      {/* Bottom controls */}
      <div className="flex justify-center gap-8">
        <button
          type="button"
          onClick={() => {
            press("rewind");
            window.location.reload();
          }}
          className={`${buttonClass} h-9 w-9`}
        >
          <RotateCcw size={14} />
        </button>

        <button
          type="button"
          onClick={() => press("volume")}
          className={`${buttonClass} h-9 w-9`}
        >
          <Volume2 size={14} />
        </button>
      </div>
    </div>
  );
}
