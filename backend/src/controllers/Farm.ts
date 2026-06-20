import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { Farm, IFarm } from "../models/Farm";
import { getServerError } from "../utils/serverError";
import mongoose from "mongoose";
import { SystemMetrics } from "../models/SystemMetrics";
import { getFarmDB, getFarmsDB } from "../services/farm";
import {
  coordinatesIntersection,
  getFarmInfo,
} from "../utils/coordinatesIntersection";
import Device from "../models/Device";
import { Sensor } from "../models/Sensor";

export const getFarms = async (req: AuthRequest, res: Response) => {
  try {
    const farms = await getFarmsDB(req.user!._id);
    return res.status(200).json({ data: farms || null });
  } catch (error) {
    getServerError(res, error, "getFarms Controller");
  }
};
export const getFarm = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const farm = await getFarmDB(id, req.user!._id);
    if (!farm) {
      return res.status(404).json({ message: "No such farm exist" });
    }
    return res.status(200).json({ data: farm || null });
  } catch (error) {
    getServerError(res, error, "getFarm Controller");
  }
};
export const getFarmsShort = async (req: AuthRequest, res: Response) => {
  try {
    const farm = await Farm.find({ userId: req.user!._id }).select("nickName");
    return res.status(200).json({ data: farm });
  } catch (error) {
    getServerError(res, error, "getFarmShort Controller");
  }
};
export const addFarm = async (req: AuthRequest, res: Response) => {
  const { nickName, soilType, coordinates } = req.body;
  const reqBody: Pick<IFarm, "nickName" | "soilType" | "coordinates"> = {
    nickName,
    soilType,
    coordinates,
  };
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const cleanedSearchTerm = nickName.trim().replace(/\s+/g, " ");
    const payloadB = {
      A: coordinates[0],
      B: coordinates[1],
      C: coordinates[2],
      D: coordinates[3],
    };
    const getAllUserFarm = await Farm.find({ userId: req.user!._id });
    const farmName = getAllUserFarm.map((item) => item.nickName.toLowerCase());
    if (farmName.includes(cleanedSearchTerm.toLowerCase().trim())) {
      throw new Error("DFN");
    }
    if (getAllUserFarm.length > 0) {
      for (let i = 0; i < getAllUserFarm.length; i++) {
        const existingcoordinates = getAllUserFarm[i].coordinates;
        const payloadA = {
          A: existingcoordinates[0],
          B: existingcoordinates[1],
          C: existingcoordinates[2],
          D: existingcoordinates[3],
        };
        const result = coordinatesIntersection(payloadA, payloadB);
        if (!result.success && result.message.includes("error")) {
          throw new Error(`EFCI:${result.message.split(":")[1]}`);
        }
        if (result.success && result.message === "inside") {
          throw new Error(`DFC:${getAllUserFarm[i].nickName}`);
        }
        if (result.success && result.message === "outside") {
          const resultOpposite = coordinatesIntersection(payloadB, payloadA);
          if (
            !resultOpposite.success &&
            resultOpposite.message.includes("error")
          ) {
            throw new Error(`EFCI:${resultOpposite.message.split(":")[1]}`);
          }
          if (resultOpposite.success && resultOpposite.message === "inside") {
            throw new Error(`FIC:${getAllUserFarm[i].nickName}`);
          }
          reqBody.coordinates =
            result?.alignedCoordinates || reqBody.coordinates;
        }
      }
    }
    //all measured in meter
    const FarmInfo: IFarm["info"] | null = getFarmInfo(
      payloadB.A,
      payloadB.B,
      payloadB.C,
      payloadB.D,
    ) as IFarm["info"] | null;
    if (!FarmInfo) {
      await session.abortTransaction();
      return res.status(400).json({
        message:
          "We failed to calculate your farm parameter, pease try later again after some time",
      });
    }
    const [farm] = await Farm.create(
      [
        {
          userId: req.user!._id,
          nickName,
          info: FarmInfo,
          coordinates: reqBody.coordinates,
          soilType,
        },
      ],
      { session },
    );
    await SystemMetrics.findOneAndUpdate(
      { userId: req.user!._id },
      {
        $addToSet: { totalFarms: farm._id },
      },
      { session, upsert: true },
    );
    await session.commitTransaction();
    return res
      .status(201)
      .json({
        data: {
          _id: farm._id,
          nickName: farm.nickName,
          soilType: farm.soilType,
          info: { points: farm.info.points },
        },
      });
  } catch (error) {
    await session.abortTransaction();
    getServerError(res, error, "addFarm Controller");
  } finally {
    await session.endSession();
  }
};
export const deleteFarm = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = req.params.id as string;
    const farm = await Farm.findOneAndDelete({
      userId: req.user!._id,
      _id: id,
    });
    if (!farm) {
      await session.abortTransaction();
      return res.status(400).json({ message: "No Such Farm Found" });
    }
    await SystemMetrics.findOneAndUpdate(
      { userId: req.user!._id },
      {
        $pull: { totalFarms: id },
      },
      { session },
    );
    await Device.deleteMany({ farmId: farm._id }, { session });
    await Sensor.deleteMany({ farmId: farm._id }, { session });
    await session.commitTransaction();
    return res.status(200).json({ message: "Farm Deleted" });
  } catch (error) {
    await session.abortTransaction();
    getServerError(res, error, "deleteFarm Controller");
  } finally {
    await session.endSession();
  }
};
