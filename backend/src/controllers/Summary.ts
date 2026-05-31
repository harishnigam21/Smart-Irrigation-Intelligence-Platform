import { Request, Response } from "express";

import { getSystemSummary } from "../services/summary";
import { AuthRequest } from "../types/AuthRequest";
import { getServerError } from "../utils/serverError";

export const summary = async (req: AuthRequest, res: Response) => {
  try {
    const data = await getSystemSummary(req);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    getServerError(res,error,'summary controller')
  }
};
