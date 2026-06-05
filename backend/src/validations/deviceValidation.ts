import { NextFunction, Request, Response } from "express";
import { IDevice } from "../models/Device";
import { ValidateByLoad } from "./mongooseIDValidation";
const sendError = (res: Response, type: string, error: string) => {
  console.error(error);
  return res.status(422).json({ success: false, errors: { [type]: error } });
};
export const deviceValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body || Object.keys(req.body).length == 0) {
    return sendError(res, "device_all", "Invalid request");
  }
  const { farmId, nickName, macAddress, hardware } = req.body as Pick<
    IDevice,
    "nickName" | "macAddress" | "hardware"
  > & {
    farmId: string;
  };
  if (!farmId || !ValidateByLoad(farmId as string)) {
    return sendError(res, "device_farmId", "Please select farm");
  }
  if (!nickName || nickName.trim().length <= 1) {
    return sendError(res, "device_nickName", "Invalid NickName");
  }
  const MacRegex =
    /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$|^([0-9A-Fa-f]{4}\.){2}([0-9A-Fa-f]{4})$/;
  if (!macAddress || !MacRegex.test(macAddress)) {
    return sendError(res, "device_macAddress", "Invalid MacAddress");
  }
  if (!hardware || typeof hardware !== "object") {
    return sendError(
      res,
      "device_hardware",
      "Hardware object data is missing or invalid",
    );
  }

  if (
    !hardware.model ||
    typeof hardware.model !== "string" ||
    hardware.model.trim() === ""
  ) {
    return sendError(
      res,
      "device_hardware_model",
      "Hardware model is required",
    );
  }

  if (
    !hardware.firmwareVersion ||
    typeof hardware.firmwareVersion !== "string" ||
    hardware.firmwareVersion.trim() === ""
  ) {
    return sendError(
      res,
      "device_hardware_firmwareVersion",
      "Firmware version is required",
    );
  }

  const validPowerSources = ["solar", "battery", "grid"];
  if (
    !hardware.powerSource ||
    !validPowerSources.includes(hardware.powerSource)
  ) {
    return sendError(
      res,
      "device_hardware_powerSource",
      "Power source must be solar, battery, or grid",
    );
  }

  if (!hardware.pinConfiguration) {
    req.body.hardware.pinConfiguration = [];
  }

  // 5. Settings validation
  if (!hardware.settings || typeof hardware.settings !== "object") {
    return sendError(
      res,
      "device_hardware_settings",
      "Hardware settings are missing",
    );
  }

  if (
    typeof hardware.settings.reportingIntervalInSeconds !== "number" ||
    hardware.settings.reportingIntervalInSeconds <= 0
  ) {
    return sendError(
      res,
      "device_hardware_settings_reportingIntervalInSeconds",
      "Reporting interval must be a number greater than 0",
    );
  }

  if (typeof hardware.settings.isDeepSleepEnabled !== "boolean") {
    return sendError(
      res,
      "device_hardware_settings_isDeepSleepEnabled",
      "Deep sleep configuration must be true or false",
    );
  }

  if (
    !hardware.coordinates ||
    !Array.isArray(hardware.coordinates) ||
    hardware.coordinates.length !== 2 ||
    typeof hardware.coordinates[0] !== "number" ||
    typeof hardware.coordinates[1] !== "number"
  ) {
    return sendError(
      res,
      "device_hardware_location_coordinates",
      "Coordinates must be an array of [latitude, longitude]",
    );
  }

  const [lat, lng] = hardware.coordinates;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return sendError(
      res,
      "device_hardware_location_coordinates_bounds",
      "Latitude bounds [-90, 90] or Longitude bounds [-180, 180] exceeded",
    );
  }
  next();
};

export const getDeviceValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId, farmId, deviceId } = req.query;
  if (userId && !ValidateByLoad(userId as string)) {
    return sendError(res, "device_userId", "Invalid Query for userId");
  }
  if (farmId && !ValidateByLoad(farmId as string)) {
    return sendError(res, "device_farmId", "Invalid Query for farmId");
  }
  if (deviceId && !ValidateByLoad(deviceId as string)) {
    return sendError(res, "device_deviceId", "Invalid Query for deviceId");
  }
  next();
};
