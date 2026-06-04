import { Request, Response } from "express";
import { sensorQueue } from "../queues/Sensor";
import { Sensor } from "../models/Sensor";
import { getServerError } from "../utils/serverError";
import { AuthRequest } from "../types/AuthRequest";
import mongoose from "mongoose";
import { SystemMetrics } from "../models/SystemMetrics";
import Device, { IDevice } from "../models/Device";

export const ingestReading = async (req: Request, res: Response) => {
  try {
    const { deviceId, soilMoisture, waterFlow, temperature } = req.body;
    const deviceExist = await Device.findById(deviceId);
    if (!deviceExist) {
      return res
        .status(403)
        .json({ message: "Invalid Device trying to send data" });
    }
    await sensorQueue.add("process-reading", {
      deviceId: deviceExist._id,
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
    const sensors = await Sensor.find({ userId: req.user!._id }).select(
      "deviceId farmId pinNumber sensorType status lastSeen",
    );
    return res.status(200).json({ data: sensors });
  } catch (error) {
    getServerError(res, error, "getSensors Controller");
  }
};
export const addSensor = async (req: AuthRequest, res: Response) => {
  const { sensorType, deviceId, pinNumber } = req.body;
  const session = await mongoose.startSession();
  interface IPopulatedSensor {
    _id: mongoose.Types.ObjectId;
    sensorType: "soil" | "water_flow" | "temperature";
    status: "active" | "inactive";
    lastSeen: Date;
  }
  interface ICheckDeviceResult {
    _id: mongoose.Types.ObjectId;
    farmId: mongoose.Types.ObjectId;
    hardware: {
      pinConfiguration: {
        pinNumber: number;
        direction: "INPUT" | "OUTPUT";
        sensors: IPopulatedSensor;
      }[];
    };
  }
  try {
    session.startTransaction();
    const checkDevice = await Device.findById(deviceId)
      .populate(
        "hardware.pinConfiguration.sensors",
        "sensorType status lastSeen",
      )
      .select("_id hardware.pinConfiguration")
      .lean<ICheckDeviceResult>()
      .session(session);
    if (!checkDevice) {
      return res.status(400).json({
        errors: {
          sensor_device: "Device not found",
        },
      });
    }
    const pinConfiguration = checkDevice.hardware.pinConfiguration;
    const checkExistingSensor = pinConfiguration.find(
      (item) => item.pinNumber == pinNumber,
    );
    if (checkExistingSensor) {
      await session.abortTransaction();
      return res.status(400).json({
        errors: {
          sensor_pinNumber: `Pin Number : ${checkExistingSensor.pinNumber}, already have ${checkExistingSensor.sensors.sensorType} sensor`,
        },
      });
    }
    const [sensor] = await Sensor.create(
      [
        {
          userId: req.user!._id,
          deviceId: checkDevice._id,
          farmId: checkDevice.farmId,
          pinNumber,
          sensorType,
        },
      ],
      { session },
    );
    await Device.findByIdAndUpdate(
      checkDevice._id,
      {
        $push: {
          "hardware.pinConfiguration": {
            pinNumber: Number(pinNumber),
            sensors: sensor._id,
          },
        },
      },
      { session },
    );
    await SystemMetrics.findByIdAndUpdate(
      req.user!._id,
      {
        $addToSet: { totalSensors: sensor._id },
      },
      { upsert: true, session },
    );
    await session.commitTransaction();
    return res.status(201).json({
      data: sensor,
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
      userId: req.user!._id,
      _id: id,
    });
    if (!sensor) {
      await session.abortTransaction();
      return res.status(400).json({ message: "No Such Sensor Found" });
    }
    await SystemMetrics.findByIdAndUpdate(
      req.user!._id,
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
