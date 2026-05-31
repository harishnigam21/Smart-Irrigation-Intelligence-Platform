import { NextFunction, Request, Response } from "express";

const farmValidation = (req: Request, res: Response, next: NextFunction) => {
  const { farmName, latitude, longitude } = req.body;
  const sendError = (type: string, error: string) => {
    console.error(error);
    return res.status(422).json({ success: false, errors: { [type]: error } });
  };
  if (!farmName || farmName.trim().length == 0) {
    return sendError("farm", "Invalid Name");
  }
  if (!latitude || latitude <= 1) {
    return sendError("farm_latitude", "Invalid latitude");
  }
  if (!longitude || longitude <= 1) {
    return sendError("farm_longitude", "Invalid longitude");
  }
  next();
};

export default farmValidation;
