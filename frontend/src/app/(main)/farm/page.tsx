"use client";
import { useEffect, useState } from "react";
import { Data } from "@/types/data";
import HorizontalBar from "@/components/Loading/HorizontalBar";
import Image from "next/image";
import { mediaList } from "@/assets/scripts/mediaList";
import Input1 from "@/components/repeated/Input1";
import { coordinateType, getCoordinates } from "@/utils/getCoordinates";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import Input2 from "@/components/repeated/Input2";
import { Info } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { addFarm, FarmInSummary } from "@/store/slices/SummarySlice";

export default function Farm() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMess, setErrorMess] = useState<Record<string, string> | null>(
    null,
  );
  const farm = useAppSelector((store) => store.summary.farms);
  const [farmName, setFarmName] = useState<string>("");
  const VALID_SOIL_TYPES = [
    "NA",
    "alluvial soil",
    "red soil",
    "black soil (regur)",
    "forest & mountain soil",
    "arid & desert soil",
    "laterite soil",
    "saline & alkaline soil",
    "peaty & marshy soil",
  ];
  type soilType = (typeof VALID_SOIL_TYPES)[number];
  const [soil, setSoil] = useState<soilType>("NA");
  const vertex = ["A", "B", "C", "D"] as const;
  const [coordinateSelected, setCoordinatedSelected] =
    useState<(typeof vertex)[number]>("A");
  const [coordinateCollection, setCoordinateCollection] = useState<{
    A: [number, number];
    B: [number, number];
    C: [number, number];
    D: [number, number];
  }>({ A: [0, 0], B: [0, 0], C: [0, 0], D: [0, 0] });
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const searchParams = useSearchParams();
  const message: string | null = searchParams.get("message");
  useEffect(() => {
    if (coordinateSelected == "A") {
      setLatitude(coordinateCollection.A[0]);
      setLongitude(coordinateCollection.A[1]);
    }
    if (coordinateSelected == "B") {
      setLatitude(coordinateCollection.B[0]);
      setLongitude(coordinateCollection.B[1]);
    }
    if (coordinateSelected == "C") {
      setLatitude(coordinateCollection.C[0]);
      setLongitude(coordinateCollection.C[1]);
    }
    if (coordinateSelected == "D") {
      setLatitude(coordinateCollection.D[0]);
      setLongitude(coordinateCollection.D[1]);
    }
  }, [coordinateSelected]);
  useEffect(() => {
    if (coordinateSelected == "A") {
      setCoordinateCollection((prev) => ({
        ...prev,
        A: [latitude, longitude],
      }));
    }
    if (coordinateSelected == "B") {
      setCoordinateCollection((prev) => ({
        ...prev,
        B: [latitude, longitude],
      }));
    }
    if (coordinateSelected == "C") {
      setCoordinateCollection((prev) => ({
        ...prev,
        C: [latitude, longitude],
      }));
    }
    if (coordinateSelected == "D") {
      setCoordinateCollection((prev) => ({
        ...prev,
        D: [latitude, longitude],
      }));
    }
  }, [latitude, longitude]);
  const { sendRequest: addFarmRequest } = useApi();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!farmName || farmName.trim().length == 0) {
        setErrorMess({ farm: "Invalid Name" });
        return;
      }
      if (!VALID_SOIL_TYPES.includes(soil)) {
        setErrorMess({ farm_soil_type: "Invalid Soil Type" });
        return;
      }
      const checkCoordinates = (coordinates: number[][]) => {
        if (coordinates.length == 4) {
          for (let i = 0; i < coordinates.length; i++) {
            {
              if (coordinates[i].length !== 2) {
                return false;
              }
              const deepCheck =
                coordinates[i][0] >= -90 &&
                coordinates[i][0] <= 90 &&
                coordinates[i][0] != 0 &&
                coordinates[i][1] >= -180 &&
                coordinates[i][1] <= 180 &&
                coordinates[i][1] != 0;
              return deepCheck;
            }
          }

          return true;
        } else {
          return false;
        }
      };
      const extractCoordinates = Object.values(coordinateCollection);
      if (!checkCoordinates(extractCoordinates)) {
        setErrorMess({ farm_coordinates: "Invalid Coordinates" });
        return;
      }
      await addFarmRequest("api/farm", "POST", {
        nickName: farmName,
        soilType: soil,
        coordinates: extractCoordinates,
      }).then((result) => {
        const data = result.data as Data<FarmInSummary> | undefined;
        if (result && result.success) {
          toast.success(data?.message || "Farm added Successfully.");
          if (data && data.data) {
            const newFarm = data.data;
            setFarmName("");
            setSoil("na");
            setCoordinateCollection({
              A: [0, 0],
              B: [0, 0],
              C: [0, 0],
              D: [0, 0],
            });
            dispatch(addFarm(newFarm));
            const target = document.getElementById("farmname");
            if (target) {
              target.focus();
            }
          }
        } else {
          if (data?.errors) {
            setErrorMess(data.errors);
          } else {
            throw new Error(data?.message || "Failed to add farm");
          }
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMess({ message: error.message });
      }
    } finally {
      setLoading(false);
    }
  };
  const getLocation = async () => {
    try {
      setLoading(true);
      const result: coordinateType = await getCoordinates();
      setLatitude(result.latitude);
      setLongitude(result.longitude);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
    setMounted(true);
  }, []);
  return (
    <section className="w-screen h-screen fixed top-0 left-0 m-auto bg-bgsecondary z-100 p-4 flex justify-center-safe items-center-safe text-text">
      <article className="relative max-h-full w-full md:w-[75%] p-8 rounded-4xl bg-bgprimary overflow-x-hidden overflow-y-auto">
        {(loading || !mounted) && <HorizontalBar position="top-0 left-0" />}
        <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-2xl md:text-3xl">Add Farms Details</h3>
              {mounted ? (
                farm.length > 0 ? (
                  <div className="flex flex-col gap-2 mb-6">
                    <strong className="text-tertiary">Existing Farms : </strong>
                    <div className="flex flex-nowrap overflow-x-auto scrollbar-none gap-2">
                      {farm.map((item, index) => (
                        <small
                          title="click to update"
                          className="py-1 px-3 rounded-full border border-border whitespace-nowrap cursor-pointer"
                          key={`existingFarm/${index}`}
                        >
                          {item.nickName}
                        </small>
                      ))}
                    </div>
                    <small className="mt-4">
                      Want to add{" "}
                      <span
                        className="text-tertiary font-medium cursor-pointer"
                        onClick={() => router.push("/sensor")}
                      >
                        Sensor
                      </span>
                      ?
                    </small>
                  </div>
                ) : (
                  <p className="text-red-500">
                    Currently you don't have any Farm
                  </p>
                )
              ) : (
                <div className="flex flex-col gap-2 mb-6">
                  <strong className="text-tertiary max-w-30 h-7 rounded-md bg-bgsecondary/80 animate-pulse">
                    {" "}
                  </strong>
                  <div className="flex flex-nowrap overflow-x-auto scrollbar-none gap-2">
                    {Array.from({ length: 5 }).map((item, index) => (
                      <small
                        title="click to update"
                        className="py-1 px-3 rounded-full whitespace-nowrap cursor-pointer min-w-20 h-5 bg-bgsecondary/80 animate-pulse"
                        key={`existingFarm/skeleton/${index}`}
                      ></small>
                    ))}
                  </div>
                  <small className="mt-4 max-w-30 h-4 rounded-md bg-bgsecondary/80 animate-pulse"></small>
                </div>
              )}
            </div>
            <div className="xl:basis-full">
              <div className="relative w-50 h-50 border skew-y-1 skew-x-2">
                <div className="absolute -top-2 -left-2 flex">
                  <div
                    className={`w-6 h-6 flex items-center justify-center ${coordinateSelected == "A" ? "bg-tertiary text-black" : "bg-bgsecondary text-white"} rounded-full p-2 overflow-hidden text-xs font-extrabold `}
                  >
                    A
                  </div>
                  <div className="flex flex-col items-start -mt-5">
                    <small
                      className={`${coordinateSelected == "A" ? "text-tertiary" : "text-green-500"}`}
                    >{`(${coordinateCollection.A[0].toString().slice(0, 2)}...${coordinateCollection.A[0].toString().slice(-3)},${coordinateCollection.A[1].toString().slice(0, 2)}...${coordinateCollection.A[1].toString().slice(-3)})`}</small>
                    {coordinateSelected == "A" && (
                      <div className="-scale-x-100 mt-2">🚶</div>
                    )}
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 flex flex-col">
                  <div
                    className={`w-6 h-6 flex items-center justify-center ${coordinateSelected == "B" ? "bg-tertiary text-black" : "bg-bgsecondary text-white"} rounded-full p-2 overflow-hidden text-xs font-extrabold self-end`}
                  >
                    B
                  </div>
                  <div className="flex">
                    <small
                      className={`${coordinateSelected == "B" ? "text-tertiary" : "text-green-500"}`}
                    >{`(${coordinateCollection.B[0].toString().slice(0, 2)}...${coordinateCollection.B[0].toString().slice(-3)},${coordinateCollection.B[1].toString().slice(0, 2)}...${coordinateCollection.B[1].toString().slice(-3)})`}</small>
                    {coordinateSelected == "B" && (
                      <div className=" rotate-270 mr-2">🚶</div>
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 flex">
                  <div className="flex flex-col items-end justify-end -mb-3">
                    {coordinateSelected == "C" && <div className="">🚶</div>}
                    <small
                      className={`${coordinateSelected == "C" ? "text-tertiary" : "text-green-500"}`}
                    >{`(${coordinateCollection.C[0].toString().slice(0, 2)}...${coordinateCollection.C[0].toString().slice(-3)},${coordinateCollection.C[1].toString().slice(0, 2)}...${coordinateCollection.C[1].toString().slice(-3)})`}</small>
                  </div>
                  <div
                    className={`w-6 h-6 flex self-end items-center justify-center ${coordinateSelected == "C" ? "bg-tertiary text-black" : "bg-bgsecondary text-white"} rounded-full p-2 overflow-hidden text-xs font-extrabold `}
                  >
                    C
                  </div>
                </div>
                <div className="absolute -bottom-2 -left-2 flex flex-col">
                  <div className="flex gap-2">
                    {coordinateSelected == "D" && (
                      <div className="rotate-90 ml-2">🚶</div>
                    )}
                    <small
                      className={`${coordinateSelected == "D" ? "text-tertiary" : "text-green-500"}`}
                    >{`(${coordinateCollection.D[0].toString().slice(0, 2)}...${coordinateCollection.D[0].toString().slice(-3)},${coordinateCollection.D[1].toString().slice(0, 2)}...${coordinateCollection.D[1].toString().slice(-3)})`}</small>
                  </div>
                  <div
                    className={`w-6 h-6 flex self-start items-center justify-center ${coordinateSelected == "D" ? "bg-tertiary text-black" : "bg-bgsecondary text-white"} rounded-full p-2 overflow-hidden text-xs font-extrabold `}
                  >
                    D
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Input1
              errorMess={errorMess}
              setErrorMess={setErrorMess}
              fieldValue={farmName}
              setfieldValue={setFarmName}
              handleNext={() => {
                const next = document.getElementById("soiltype");
                if (next) {
                  next.focus();
                }
              }}
              type="farmname"
              name="farmname"
              htmlFor="farmname"
              id="farmname"
              label="Farm Name"
              autoFocus={true}
              required={true}
              errorKey="farm"
            />
            <>
              <Input2
                errorMess={errorMess}
                setErrorMess={setErrorMess}
                fieldValue={soil}
                setfieldValue={setSoil}
                handleNext={() => {
                  const nextfield = document.getElementById("latitude");
                  if (nextfield) {
                    nextfield.focus();
                  }
                }}
                name="soiltype"
                htmlFor="soiltype"
                id="soiltype"
                label="Soil Type"
                options={VALID_SOIL_TYPES}
                autoFocus={true}
                required={true}
                errorKey="farm_soil_type"
                height="300"
              />
              {soil.toLowerCase() == "na" && (
                <small className="text-red-500">
                  Note -{" "}
                  <span className="text-border">
                    NA means here, you don't know
                  </span>
                </small>
              )}
            </>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                {vertex.map((item, index) => (
                  <button
                    key={`coordinates/button/${index}`}
                    title={`Farm Corner ${index + 1}`}
                    className={`rounded-full w-9 h-9 flex items-center justify-center aspect-square p-2 ${coordinateSelected.toLowerCase() == item.toLowerCase() ? "bg-tertiary text-black" : "bg-bgsecondary text-white"} font-bold  cursor-pointer hover:scale-90 hover:opacity-75 transition-all`}
                    onClick={() => setCoordinatedSelected(item)}
                  >
                    {item}
                  </button>
                ))}
                <Info
                  className="cursor-pointer animate-ping-once"
                  color="green"
                  size={20}
                />
              </div>
              <div className="flex flex-nowrap max-[440px]:flex-wrap gap-2 grow">
                <Input1
                  showErrorMessage={false}
                  errorMess={errorMess}
                  setErrorMess={setErrorMess}
                  fieldValue={latitude}
                  setfieldValue={setLatitude}
                  handleNext={() => {
                    const next = document.getElementById("longitude");
                    if (next) {
                      next.focus();
                    }
                  }}
                  type="latitude"
                  name="latitude"
                  htmlFor="latitude"
                  id="latitude"
                  label="Farm Latitude"
                  autoFocus={false}
                  required={true}
                  errorKey="farm_coordinates"
                />
                <Input1
                  showErrorMessage={false}
                  errorMess={errorMess}
                  setErrorMess={setErrorMess}
                  fieldValue={longitude}
                  setfieldValue={setLongitude}
                  handleNext={handleSubmit}
                  type="longitude"
                  name="longitude"
                  htmlFor="longitude"
                  id="longitude"
                  label="Farm Longitude"
                  autoFocus={false}
                  required={true}
                  errorKey="farm_coordinates"
                />
              </div>
              {errorMess &&
                (errorMess["farm_coordinates"] || errorMess["message"]) && (
                  <small className="text-red-500 flex mt-1 gap-2 items-center">
                    <Info color="red" size={15} />
                    {errorMess["farm_coordinates"] || errorMess["message"]}
                  </small>
                )}
              <p>
                {`If you don't know coordinated, then `}
                <span
                  className={`font-bold text-tertiary cursor-pointer whitespace-nowrap`}
                  onClick={getLocation}
                >
                  Click me
                </span>
                .
                <br />
                This will give your current location coordinates, so please use
                it when you are at your farm .
              </p>
            </div>
            <button
              className="rounded-full self-end my-4 py-1 px-4 cursor-pointer font-medium bg-tertiary hover:bg-tertiary/80 text-black"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </article>
      </article>
    </section>
  );
}
