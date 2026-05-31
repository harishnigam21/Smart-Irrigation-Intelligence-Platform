import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { Farm } from "../models/Farm";
import { getServerError } from "../utils/serverError";
import mongoose from "mongoose";
import { SystemMetrics } from "../models/SystemMetrics";

export const getFarms = async (req: AuthRequest, res: Response) => {
  try {
    const farm = await Farm.find({ userId: req.user!.id }).select("name");
    return res.status(200).json({ data: farm });
  } catch (error) {
    getServerError(res, error, "getFarms Controller");
  }
};
export const addFarm = async (req: AuthRequest, res: Response) => {
  const { farmName, latitude, longitude } = req.body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const cleanedSearchTerm = farmName.trim().replace(/\s+/g, " ");
    const safeSearchTerm = cleanedSearchTerm.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      "\\$&",
    );
    const checkExisting = await Farm.findOne({
      $or: [
        { name: { $regex: new RegExp(`^${safeSearchTerm}$`, "i") } },
        {
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [longitude, latitude], // Must be strictly [longitude, latitude]
              },
              $maxDistance: 100, // Distance threshold directly in meters
            },
          },
        },
      ],
    });
    if (checkExisting) {
      await session.abortTransaction();
      return res.status(400).json({
        message:
          "Farm with same name or this farm is 100m near to any one of the existing farm",
      });
    }
    const [farm] = await Farm.create(
      [
        {
          userId: req.user!.id,
          name: farmName,
          location: {
            type: "Point",
            coordinates: [longitude, latitude], // Crucial: [longitude, latitude] order
          },
        },
      ],
      { session },
    );
    await SystemMetrics.findByIdAndUpdate(
      req.user!.id,
      {
        $addToSet: { totalFarms: farm._id },
      },
      { session },
    );
    await session.commitTransaction();
    return res.status(201).json({ data: { _id: farm._id, name: farm.name } });
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
    const farm = await Farm.findOneAndDelete({ userId: req.user!.id, _id: id });
    if (!farm) {
      await session.abortTransaction();
      return res.status(400).json({ message: "No Such Farm Found" });
    }
    await SystemMetrics.findByIdAndUpdate(
      req.user!.id,
      {
        $pull: { totalFarms: id },
      },
      { session },
    );
    await session.commitTransaction();
    return res.status(200).json({ message: "Farm Deleted" });
  } catch (error) {
    await session.abortTransaction();
    getServerError(res, error, "deleteFarm Controller");
  } finally {
    await session.endSession();
  }
};
