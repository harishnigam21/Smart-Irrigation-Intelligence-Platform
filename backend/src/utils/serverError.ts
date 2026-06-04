import { Response } from "express";
//DFN:Duplicate Farm Name, DFC:Duplicate Farm Coordinates, FIC:Farm In Coordinate,EFCI:Error from coordinate Intersection

export const getServerError = (res: Response, error: unknown, from: string) => {
  if (error instanceof Error) {
    console.error(`Error occurred at ${from} : `, error);
    if (error.message == "DFN") {
      return res.status(403).json({
        message: "Farm Name with same name is not allowed",
      });
    }
    if (error.message.includes("EFCI")) {
      return res.status(400).json({
        message:
          error.message.split(":")[1] ||
          "Error from Coordinates Intersection function",
      });
    }
    if (error.message.includes("FIC")) {
      return res.status(403).json({
        message: `${error.message.split(":")[1]} is existing withing this coordinates, kindly delete this farm and try again.`,
      });
    }
    if (error.message == "DFC") {
      return res.status(403).json({
        message:
          "The Farm Coordinates overlaps with your Existing Farm Coordinates",
      });
    }
  }
  return res.status(500).json({ message: "Internal Server Error" });
};
