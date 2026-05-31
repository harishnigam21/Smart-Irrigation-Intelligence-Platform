import { Request, Response } from "express";
import { sensorQueue } from "../queues/Sensor";
import { Sensor } from "../models/Sensor";
import { getServerError } from "../utils/serverError";
import { AuthRequest } from "../types/AuthRequest";
import mongoose from "mongoose";
import { SystemMetrics } from "../models/SystemMetrics";

export const ingestReading = async (req: Request, res: Response) => {
  try {
    const { sensorId, soilMoisture, waterFlow, temperature } = req.body;
    const sensorExist = await Sensor.findOne({ sensorLocalId: sensorId });
    if (!sensorExist) {
      return res
        .status(403)
        .json({ message: "Invalid Sensor trying to send data" });
    }
    await sensorQueue.add("process-reading", {
      sensorId: sensorExist._id,
      sensorLocalId: sensorId,
      farmId: sensorExist.farmId,
      userId: sensorExist.userId,
      timestamp: new Date().toISOString(),
      soilMoisture,
      waterFlow,
      temperature,
    });
    console.log("Reading queued");
    return res.status(202).json({
      success: true,
      message: "Reading queued successfully",
    });
  } catch (error) {
    getServerError(res, error, "ingestReading Controller");
  }
};

export const getSensors = async (req: AuthRequest, res: Response) => {
  try {
    const sensors = await Sensor.find({ userId: req.user!.id }).select(
      "sensorLocalId sensorType",
    );
    return res.status(200).json({ data: sensors });
  } catch (error) {
    getServerError(res, error, "getSensors Controller");
  }
};
export const addSensor = async (req: AuthRequest, res: Response) => {
  const { sensorType, farmId, sensorLocalId } = req.body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const checkExisting = await Sensor.findOne({ sensorLocalId });
    if (checkExisting) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Sensor ID must be unique",
      });
    }
    const [sensor] = await Sensor.create(
      [
        {
          userId: req.user!.id,
          farmId,
          sensorLocalId,
          sensorType,
        },
      ],
      { session },
    );
    await SystemMetrics.findByIdAndUpdate(
      req.user!.id,
      {
        $addToSet: { totalSensors: sensor._id, activeSensors: sensor._id },
      },
      { session },
    );
    await session.commitTransaction();
    return res.status(201).json({
      data: {
        _id: sensor._id,
        sensorType: sensor.sensorType,
        sensorLocalId: sensor.sensorLocalId,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    getServerError(res, error, "addSensor Controller");
  } finally {
    await session.endSession();
  }
};
export const deleteSensor = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = req.params.id as string;
    const sensor = await Sensor.findOneAndDelete({
      userId: req.user!.id,
      _id: id,
    });
    if (!sensor) {
      await session.abortTransaction();
      return res.status(400).json({ message: "No Such Sensor Found" });
    }
    await SystemMetrics.findByIdAndUpdate(
      req.user!.id,
      {
        $pull: { totalSensors: id, activeSensors: id },
      },
      { session },
    );
    await session.commitTransaction();
    return res.status(200).json({ message: "Sensor Deleted" });
  } catch (error) {
    await session.abortTransaction();
    getServerError(res, error, "deleteSensor Controller");
  } finally {
    await session.endSession();
  }
};
