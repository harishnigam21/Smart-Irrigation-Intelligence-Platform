import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { getServerError } from "../utils/serverError";
import mongoose from "mongoose";
import Device, { IDevice } from "../models/Device";
import { Farm } from "../models/Farm";
import { singleCoordinatesIntersection } from "../utils/coordinatesIntersection";
import { SystemMetrics } from "../models/SystemMetrics";
import { ISensor, Sensor } from "../models/Sensor";
import { getReadingDB } from "../services/reading";

interface IDeviceFilterQuery {
  userId?: string;
  farmId?: string;
  deviceId?: string;
}
interface IDeviceFilterGetQuery {
  userId?: string;
  deviceId?: string;
}
export const getReadings = async (
  req: AuthRequest<{}, {}, {}, IDeviceFilterGetQuery>,
  res: Response,
) => {
  try {
    const { userId, deviceId } = req.query;
    const queryFilter: Record<string, any> = {};
    if (userId) {
      queryFilter.userId = new mongoose.Types.ObjectId(userId);
    }
    if (deviceId) {
      queryFilter.deviceId = new mongoose.Types.ObjectId(deviceId);
    }
    const reading = await getReadingDB(queryFilter, req);
    return res.status(200).json({ message: "Reading Fetched", data: reading });
  } catch (error) {
    getServerError(res, error, "getReadings controller");
  }
};
export const getDevices = async (
  req: AuthRequest<{}, {}, {}, IDeviceFilterQuery>,
  res: Response,
) => {
  try {
    const { userId, farmId, deviceId } = req.query;
    const queryFilter: Record<string, any> = {};
    if (userId) {
      queryFilter.userId = new mongoose.Types.ObjectId(userId);
    }
    if (farmId) {
      queryFilter.farmId = new mongoose.Types.ObjectId(farmId);
    }
    if (deviceId) {
      queryFilter._id = new mongoose.Types.ObjectId(deviceId);
    }
    const devices = await Device.find({
      ...queryFilter,
      userId: req.user!._id,
    })
      .populate(
        "hardware.pinConfiguration.sensors",
        "sensorType status lastSeen",
      )
      .lean();
    if (devices.length == 0) {
      return res
        .status(404)
        .json({ message: "No device found for this query" });
    }
    return res.status(200).json({ message: "Devices Fetched", data: devices });
  } catch (error) {
    getServerError(res, error, "getDevices controller");
  }
};
export const getDevicesShort = async (
  req: AuthRequest<{}, {}, {}, IDeviceFilterQuery>,
  res: Response,
) => {
  interface Device {
    _id: string;
    farmId: { _id: string; nickName: string };
    nickName: string;
    macAddress: string;
    hardware: {
      model: string;
      telemetrySummary: { status: "online" | "offline" | "error" };
      pinConfiguration: {
        sensors: Pick<ISensor, "pinNumber" | "sensorType" | "status">;
      }[];
    };
  }
  try {
    const { userId, farmId, deviceId } = req.query;
    const queryFilter: Record<string, any> = {};
    if (userId) {
      queryFilter.userId = new mongoose.Types.ObjectId(userId);
    }
    if (farmId) {
      queryFilter.farmId = new mongoose.Types.ObjectId(farmId);
    }
    if (deviceId) {
      queryFilter._id = new mongoose.Types.ObjectId(deviceId);
    }
    const devices = await Device.find({
      ...queryFilter,
      userId: req.user!._id,
    })
      .populate("farmId", "_id nickName")
      .populate(
        "hardware.pinConfiguration.sensors",
        "pinNumber sensorType status ",
      )
      .select(
        "_id farmId nickName macAddress hardware.model hardware.telemetrySummary.status hardware.pinConfiguration.sensors",
      )
      .lean<Device[]>();
    if (devices.length == 0) {
      return res
        .status(404)
        .json({ message: "No device found for this query" });
    }
    return res.status(200).json({ message: "Devices Fetched", data: devices });
  } catch (error) {
    getServerError(res, error, "getDevicesShort controller");
  }
};
export const addDevices = async (req: AuthRequest, res: Response) => {
  const { farmId, nickName, macAddress, hardware } = req.body as Pick<
    IDevice,
    "nickName" | "macAddress" | "hardware"
  > & {
    farmId: string;
  };
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const farmExist = await Farm.findById(farmId);
    if (!farmExist) {
      await session.abortTransaction();
      return res.status(404).json({
        errors: {
          farmId: "Farm doesn't exist, please select from existing",
        },
      });
    }
    const farmCoords = {
      A: farmExist.coordinates[0],
      B: farmExist.coordinates[1],
      C: farmExist.coordinates[2],
      D: farmExist.coordinates[3],
    };
    //conflict Device
    //  100 meters directly into Earth radius radians
    const geofenceLimitMeters = 100;
    const earthRadiusMeters = 6378100;
    const maxDistanceInRadians = geofenceLimitMeters / earthRadiusMeters;
    const conflicetDevice = await Device.findOne({
      farmId,
      "hardware.coordinates": {
        $near: [
          Number(hardware.coordinates[0]),
          Number(hardware.coordinates[1]),
        ],
        $maxDistance: maxDistanceInRadians,
      },
    });
    if (conflicetDevice) {
      return res.status(403).json({
        errors: {
          coordinates: `Try to place your new device ${geofenceLimitMeters}m away from existing devices`,
        },
      });
    }
    const isInside = singleCoordinatesIntersection(
      farmCoords,
      hardware.coordinates,
    );
    if (isInside.success && isInside.message == "outside") {
      await session.abortTransaction();
      return res.status(400).json({
        errors: {
          coordinates: "This coordinate is not inside farm selected",
        },
      });
    }
    if (!isInside.success && isInside.message.includes("error")) {
      await session.abortTransaction();
      return res.status(400).json({
        errors: {
          coordinates: `${isInside.message.split(":")[1] || "Error occurred while adding device"}`,
        },
      });
    }
    const [device] = await Device.create(
      [
        {
          userId: req.user!._id,
          farmId,
          nickName,
          macAddress,
          hardware,
          farmPoint: isInside?.xValue || null,
        },
      ],
      { session },
    );
    await SystemMetrics.findOneAndUpdate(
      { userId: req.user!._id },
      {
        $addToSet: { totalDevices: device._id },
      },
      { session, upsert: true },
    );
    await session.commitTransaction();
    return res.status(201).json({
      message: "Device Added",
      data: {
        _id: device._id,
        farmId: device.farmId,
        nickName: device.nickName,
        macAddress: device.macAddress,
        farmPoint: device.farmPoint,
        hardware: {
          model: device.hardware.model,
          telemetrySummary: {
            status: device.hardware.telemetrySummary.status,
            lastSeen: device.hardware.telemetrySummary.lastSeen,
          },
        },
      },
    });
  } catch (error) {
    await session.abortTransaction();
    getServerError(res, error, "addDevices Controller");
  } finally {
    await session.endSession();
  }
};
export const deleteDevice = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = req.params.id as string;
    const device = await Device.findOneAndDelete({
      userId: req.user!._id,
      _id: id,
    });
    if (!device) {
      await session.abortTransaction();
      return res.status(400).json({ message: "No Such Device Found" });
    }
    await SystemMetrics.findOneAndUpdate(
      { userId: req.user!._id },
      {
        $pull: { totalDevices: device._id, activeDevices: id },
      },
      { session },
    );
    await Sensor.deleteMany({ deviceId: device._id }, { session });

    await session.commitTransaction();
    return res.status(200).json({ message: "Device Deleted" });
  } catch (error) {
    await session.abortTransaction();
    getServerError(res, error, "deleteDevice Controller");
  } finally {
    await session.endSession();
  }
};

export const deviceToggle = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  const deviceId = req.params.id;
  try {
    session.startTransaction();
    const deviceExist = await Device.findById(deviceId).session(session);
    if (!deviceExist) {
      await session.abortTransaction();
      return res.status(404).json({ message: "No such device found" });
    }
    if (deviceExist.hardware.telemetrySummary.status == "online") {
      deviceExist.hardware.telemetrySummary.status = "offline";
      const sensors = deviceExist.hardware.pinConfiguration;
      const sensorIds = sensors.map((item) => item.sensors);
      await Sensor.updateMany(
        { _id: { $in: sensorIds } },
        { $set: { status: "inactive" } },
        { session },
      );
    } else if (deviceExist.hardware.telemetrySummary.status == "offline") {
      deviceExist.hardware.telemetrySummary.status = "online";
      const sensors = deviceExist.hardware.pinConfiguration;
      const sensorIds = sensors.map((item) => item.sensors);
      await Sensor.updateMany(
        { _id: { $in: sensorIds } },
        { $set: { status: "active" } },
        { session },
      );
    } else if (deviceExist.hardware.telemetrySummary.status == "error") {
      await session.abortTransaction();
      return res.status(200).json({ message: "Your Device is on Error" });
    }
    await deviceExist.save({ session });
    await session.commitTransaction();
    return res.status(200).json({ status: true });
  } catch (error) {
    await session.abortTransaction();
    getServerError(res, error, "deviceToggle Controller");
  } finally {
    await session.endSession();
  }
};
