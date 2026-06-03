import { NextFunction, Request, Response } from "express";
import { VALID_SOIL_TYPES } from "../models/Farm";

const farmValidation = (req: Request, res: Response, next: NextFunction) => {
  const { nickName, soilType, coordinates } = req.body;
  const sendError = (type: string, error: string) => {
    console.error(error);
    return res.status(422).json({ success: false, errors: { [type]: error } });
  };

  const checkCoordinates = (coordinates: number[][]) => {
    if (coordinates.length == 4) {
      coordinates.forEach((item) => {
        if (item.length !== 2) {
          return false;
        }
      });
      return true;
    } else {
      return false;
    }
  };

  if (!nickName || nickName.trim().length == 0) {
    return sendError("farm", "Invalid Name");
  }
  if (!checkCoordinates(coordinates)) {
    return sendError("farm_latitude", "Invalid coordinates");
  }
  if (
    !VALID_SOIL_TYPES.some(
      (item) => item.toLowerCase() === soilType.toLowerCase(),
    )
  ) {
    return sendError("farm_soil_type", "Invalid Soil Type");
  }
  next();
};

export default farmValidation;
