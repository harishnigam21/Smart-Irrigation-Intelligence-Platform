import { Request } from "express";
import { IUser } from "../models/User";
type User = Omit<IUser, "password" | "refreshToken"> & {
  _id: string;
};
export interface AuthRequest extends Request {
  user?: User;
}
