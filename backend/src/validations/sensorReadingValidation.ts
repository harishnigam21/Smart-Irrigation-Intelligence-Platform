import { NextFunction, Request, Response } from "express";

const sensorReadingValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { deviceId, soilMoisture, waterFlow, temperature } = req.body;
  const sendError = (error: unknown) => {
    return res.status(422).json({ success: false, message: error });
  };
  if (!deviceId || deviceId.length == 0) {
    return sendError("Invalid Sensor ID");
  }
  if (!soilMoisture || !waterFlow || !temperature) {
    return sendError(
      "Missing any of them soilMoisture, waterFlow, temperature",
    );
  }
  next();
};

export default sensorReadingValidation;
