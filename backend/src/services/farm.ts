import mongoose from "mongoose";
import { Farm, IFarm, soilType } from "../models/Farm";
import { IDevice } from "../models/Device";
import { ISensor } from "../models/Sensor";

interface FarmsFetch {
  _id: string;
  nickName: string;
  soilType: soilType;
  info: {
    dimensions: Record<string, number | string> | null;
    shapeType: string | null;
    area: number | null;
    perimeter: number | null;
    points: [number, number][];
  };
  devices: {
    _id: string;
    nickName: string;
    hardware: {
      model: string;
      powerSource: "solar" | "battery" | "grid";
      telemetrySummary: { status: "online" | "offline" | "error" };
      coordinates: [number, number];
    };
    farmPoint: number[];
  }[];
}
type FarmFetch = Pick<
  IFarm,
  "nickName" | "soilType" | "info" | "coordinates"
> & {
  _id: string;
  devices: (Pick<
    IDevice,
    "macAddress" | "nickName" | "hardware" | "farmPoint"
  > & {
    _id: string;
    sensors: (Pick<
      ISensor,
      "pinNumber" | "sensorType" | "status" | "lastSeen"
    > & {
      _id: string;
    })[];
  })[];
};
export const getFarmsDB = async (
  userId: string,
): Promise<FarmsFetch[] | null> => {
  if (!userId) {
    return null;
  }
  const farm = await Farm.aggregate<FarmsFetch>([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "devices",
        localField: "_id",
        foreignField: "farmId",
        pipeline: [
          {
            $project: {
              _id: 1,
              macAddress: 1,
              farmPoint: 1,
              nickName: 1,
              "hardware.model": 1,
              "hardware.coordinates": 1,
              "hardware.powerSource": 1,
              "hardware.telemetrySummary.status": 1,
            },
          },
        ],
        as: "devices",
      },
    },
    {
      $project: {
        _id: 1,
        nickName: 1,
        soilType: 1,
        info: 1,
        devices: 1,
      },
    },
  ]);
  return farm;
};
export const getFarmDB = async (
  id: string,
  userId: string,
): Promise<FarmFetch | null> => {
  if (!id || !userId) {
    return null;
  }
  const farm = await Farm.aggregate<FarmFetch>([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "devices",
        let: { farmId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$farmId", "$$farmId"] },
            },
          },
          {
            $lookup: {
              from: "sensors",
              let: { deviceId: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$deviceId", "$$deviceId"] },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    pinNumber: 1,
                    sensorType: 1,
                    status: 1,
                    lastSeen: 1,
                  },
                },
              ],
              as: "sensors",
            },
          },
          {
            $project: {
              _id: 1,
              macAddress: 1,
              nickName: 1,
              hardware: 1,
              sensors: 1,
            },
          },
        ],
        as: "devices",
      },
    },
    {
      $project: {
        _id: 1,
        nickName: 1,
        soilType: 1,
        info: 1,
        coordinates: 1,
        devices: 1,
      },
    },
  ]);
  return farm[0] || null;
};
