import { NextFunction, Request, Response } from "express";
import { ValidateByLoad } from "./mongooseIDValidation";
import { ISensor } from "../models/Sensor";

const sensorValidation = (req: Request, res: Response, next: NextFunction) => {
  const sendError = (type: string, error: string) => {
    console.error(error);
    return res.status(422).json({ success: false, errors: { [type]: error } });
  };
  if (!req.body || Object.keys(req.body).length == 0) {
    return sendError("message", "Invalid request");
  }
  const { sensorType, deviceId, pinNumber } = req.body as Pick<
    ISensor,
    "sensorType" | "pinNumber"
  > & { deviceId: string };

  const modifySensorType: string = sensorType ? sensorType : "";
  if (
    !["soil", "water_flow", "temperature"].includes(
      modifySensorType.toLowerCase(),
    )
  ) {
    return sendError("Sensor_Type", "Invalid Type");
  }
  if (!ValidateByLoad(deviceId as string)) {
    return sendError("DeviceId", "Selected Invalid Device");
  }
  if (!pinNumber || pinNumber <= 0 || pinNumber > 50) {
    return sendError("Pin_Number", "Invalid pin number");
  }
  next();
};

export default sensorValidation;
