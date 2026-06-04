import { NextFunction, Request, Response } from "express";
import { ValidateByLoad } from "./mongooseIDValidation";

const sensorValidation = (req: Request, res: Response, next: NextFunction) => {
  const { sensorType, farmId, pinNumber } = req.body;
  const sendError = (type: string, error: string) => {
    console.error(error);
    return res.status(422).json({ success: false, errors: { [type]: error } });
  };
  const modifySensorType: string = sensorType ? sensorType : "";
  if (
    !["soil", "water_flow", "temperature"].includes(
      modifySensorType.toLowerCase(),
    )
  ) {
    return sendError("sensor_type", "Invalid Type");
  }
  if (!ValidateByLoad(farmId)) {
    return sendError("sensor_farmId", "Selected Invalid Farm");
  }
  if (!pinNumber || pinNumber < 0) {
    return sendError("sensor_pinNumber", "Invalid pin number");
  }
  next();
};

export default sensorValidation;
