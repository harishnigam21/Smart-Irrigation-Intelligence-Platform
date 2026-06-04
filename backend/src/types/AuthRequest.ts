import { Request } from "express";
import { IUser } from "../models/User";
type User = Omit<IUser, "password" | "refreshToken"> & {
  _id: string;
};
export interface AuthRequest<
  P = any,
  ResB = any,
  ReqB = any,
  ReqQ = any,
> extends Request<P, ResB, ReqB, ReqQ> {
  user?: User;
}
