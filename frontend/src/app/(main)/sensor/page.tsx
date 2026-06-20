"use client";

import HorizontalBar from "@/components/Loading/HorizontalBar";
import Input1 from "@/components/repeated/Input1";
import Input2 from "@/components/repeated/Input2";
import useApi from "@/hooks/useApi";
import { addSensor, SensorInSummary } from "@/store/slices/SummarySlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { Data } from "@/types/data";
import { Info, MoveDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const sensorTypeShortcut: Record<string, string> = {
  soil: "SL",
  temperature: "TMP",
  water_flow: "WF",
};

export default function Sensor() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<number>(1);
  const [errorMess, setErrorMess] = useState<Record<string, string> | null>(
    null,
  );
  const [deviceSelected, setDeviceSelected] = useState<{
    _id: string;
    nickName: string;
  } | null>(null);
  const [sensorType, setSensorType] = useState<
    "soil" | "temperature" | "water_flow"
  >("soil");
  const [pinNumber, setPinNumber] = useState<number>(0);
  const { sendRequest: addSensorRequest } = useApi();
  const summary = useAppSelector((store) => store.summary);
  const devices = summary.device.map((item) => ({
    ...item,
    farmId: summary.farms.find((fi) => fi._id == item.farmId),
    hardware: {
      ...item.hardware,
      pinConfiguration: summary.sensor
        .filter((si) => si.deviceId == item._id)
        .map((sensorItem) => ({ sensors: sensorItem })),
    },
  }));

  const handleSensorSubmit = async () => {
    setLoading(true);
    try {
      if (!deviceSelected || !deviceSelected._id) {
        setStep(1);
        setErrorMess((prev) => ({ ...prev, DeviceId: "Missing Device" }));
        return;
      }
      if (!["soil", "temperature", "water_flow"].includes(sensorType)) {
        setErrorMess((prev) => ({
          ...prev,
          Sensor_Type: "Invalid Sensor Type",
        }));
        return;
      }
      if (!pinNumber || pinNumber <= 0 || pinNumber > 50) {
        setErrorMess((prev) => ({ ...prev, Pin_Number: "Invalid Pin Number" }));
        return;
      }
      await addSensorRequest("api/sensor", "POST", {
        sensorType,
        pinNumber,
        deviceId: deviceSelected._id,
      }).then((result) => {
        const data = result?.data as Data<SensorInSummary> | undefined;
        if (result && result.success && data && data.data) {
          toast.success(data?.message || "Sensor added Successfully.");
          dispatch(addSensor(data.data));
          setErrorMess(null);
          setPinNumber(0);
          setSensorType("soil");
        } else {
          if (data?.errors) {
            if (data.errors.DeviceId) {
              setStep(1);
            }
            setErrorMess(data.errors);
          } else {
            throw new Error(data?.message || "Failed to add Sensor");
          }
        }
      });
    } catch (error) {
      if (error instanceof Error)
        setErrorMess((prev) => ({ ...prev, message: error.message }));
      setTimeout(() => {
        setErrorMess(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section className="w-screen h-screen fixed top-0 left-0 m-auto bg-bgsecondary z-100 p-4 flex justify-center-safe items-center-safe text-text">
      <article className="relative w-full max-h-full md:w-[75%] p-8 rounded-4xl bg-bgprimary overflow-x-hidden">
        {(loading || !mounted) && <HorizontalBar position="top-0 left-0" />}
        {mounted ? (
          step == 1 ? (
            <div>
              <h2 className="text-2xl lg:text-3xl font-medium mb-3">
                Select Device
              </h2>
              {devices && devices.length > 0 ? (
                <div className="flex flex-wrap gap-4 p-2 max-h-100 overflow-x-hidden overflow-y-auto">
                  {devices.map((item, index) => {
                    const status = item.hardware.telemetrySummary.status;
                    return (
                      <div
                        key={`show/device/${index}`}
                        className={`p-2 rounded-xl flex flex-col border ${deviceSelected?._id == item._id ? "border-tertiary" : "border-border"} hover:scale-103 hover:border-tertiary cursor-pointer transition-all w-50 max-w-80 grow`}
                        onClick={() => {
                          setLoading(true);
                          setDeviceSelected({
                            _id: item._id,
                            nickName: item.nickName,
                          });
                          setTimeout(() => {
                            setStep(2);
                            setLoading(false);
                          }, 1000);
                        }}
                      >
                        <div className="flex gap-2 flex-nowrap items-center justify-between">
                          <h3>{item.nickName}</h3>
                          <div
                            className={`w-3 h-3 ${status == "online" ? "bg-green-500" : status == "offline" ? "bg-gray-400" : status == "error" ? "bg-red-500" : "hidden"} rounded-full`}
                          ></div>
                        </div>
                        <small className="text-txlight opacity-60">
                          Status : {status}
                        </small>
                        {/* <small className="text-txlight opacity-60">
                        Model : {item.hardware.model}
                      </small> */}
                        <small className="text-txlight opacity-60">
                          Deployed At :{" "}
                          <span className="text-green-500">
                            {item.farmId?.nickName}
                          </span>
                        </small>
                        <small className="text-txlight opacity-60">
                          MacAddress : {item.macAddress}
                        </small>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <strong className="text-red-500">no devices...</strong>
                  <button
                    className="py-1 px-3 rounded-full bg-primary cursor-pointer text-sm hover:bg-primary/75 transition-all"
                    onClick={() => router.push("/device")}
                  >
                    Add Device
                  </button>
                </div>
              )}
              {errorMess && errorMess["DeviceId"] && (
                <small className="text-red-500 flex mt-1 gap-2 items-center">
                  <Info color="red" size={15} />
                  {errorMess["DeviceId"]}
                </small>
              )}
            </div>
          ) : step == 2 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full flex flex-col gap-1">
                <h3 className="text-2xl lg:text-3xl font-medium">
                  Sensor Type & Pin Number
                </h3>
                <small>
                  Choose sensor type and add pin number of device where sensor
                  is attached
                </small>
                {devices && devices.length > 0 && deviceSelected && (
                  <div className="flex w-full">
                    <div className="relative flex w-full flex-col items-center justify-center my-4">
                      <small
                        title="Click me to change"
                        className="border rounded-full bg-tertiary text-black p-1 font-medium w-fit px-2 cursor-pointer"
                        onClick={() => {
                          setDeviceSelected(null);
                          setStep(1);
                        }}
                      >
                        {deviceSelected.nickName}
                      </small>
                      <MoveDown className="" />
                      <div className="flex w-full overflow-x-auto scrollbar-none gap-2">
                        {devices
                          .find((item) => item._id == deviceSelected._id)
                          ?.hardware.pinConfiguration.map((item, index) => {
                            return (
                              <small
                                key={`selectedDevice/listed/sensor/${index}`}
                                className="border rounded-full bg-green-500 text-black p-1 font-medium w-fit px-2 cursor-pointer"
                              >
                                {sensorTypeShortcut[item.sensors.sensorType]}-
                                {item.sensors.pinNumber}
                              </small>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <Input2
                  errorMess={errorMess}
                  setErrorMess={setErrorMess}
                  fieldValue={sensorType}
                  setfieldValue={setSensorType}
                  handleNext={() => {
                    const nextfield = document.getElementById("pinNumber");
                    if (nextfield) {
                      nextfield.focus();
                    }
                  }}
                  name="sensorType"
                  htmlFor="sensorType"
                  id="sensorType"
                  label="Sensor Type"
                  options={["soil", "temperature", "water_flow"]}
                  autoFocus={false}
                  required={true}
                  errorKey="Sensor_Type"
                />
                <Input1
                  errorMess={errorMess}
                  setErrorMess={setErrorMess}
                  fieldValue={pinNumber}
                  setfieldValue={setPinNumber}
                  handleNext={handleSensorSubmit}
                  type="number"
                  name="pinNumber"
                  htmlFor="pinNumber"
                  id="pinNumber"
                  label="Pin Number"
                  autoFocus={false}
                  required={true}
                  errorKey="Pin_Number"
                  min={1}
                  max={31}
                />
                {errorMess && errorMess["message"] && (
                  <small className="text-red-500 flex mt-1 gap-2 items-center">
                    <Info color="red" size={15} />
                    {errorMess["message"]}
                  </small>
                )}
                <button
                  onClick={handleSensorSubmit}
                  className="self-end rounded-full mt-6 font-medium py-2 px-5 cursor-pointer bg-tertiary hover:bg-tertiary/80 text-black"
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <></>
          )
        ) : (
          <div className="w-full flex flex-wrap items-center gap-4">
            <div className="h-9 w-1/2 bg-bgsecondary/75 animate-pulse basis-full rounded-md"></div>
            {Array.from({ length: 4 }).map((item, i) => (
              <div
                className="w-80 h-25 rounded-xl bg-bgsecondary/75 animate-pulse"
                key={`sensor/device.skeleton/${i}`}
              ></div>
            ))}
          </div>
        )}
      </article>
    </section>
  );
}
