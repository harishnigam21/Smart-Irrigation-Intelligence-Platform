import Users, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import envVariables from "../envConfig";
import { getServerError } from "../utils/serverError";
import { AuthRequest } from "../types/AuthRequest";

export const LogIn = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const ExistingUser = await Users.findOne({ email })
      .select("+password +_id")
      .lean();
    if (!ExistingUser) {
      console.error("Non-Registered User trying to login : ", email);
      return res.status(404).json({ message: "You are not registered yet !" });
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      ExistingUser.password,
    );
    if (!comparePassword) {
      console.error("Incorrect password received from : ", ExistingUser.email);
      return res
        .status(401)
        .json({ message: "Incorrect Password, Please try again" });
    }
    const access_token = jwt.sign(
      { id: ExistingUser._id },
      envVariables.ACCESS_TOKEN_KEY as string,
      { expiresIn: "1d" },
    );
    const refresh_token = jwt.sign(
      { id: ExistingUser._id },
      envVariables.REFRESH_TOKEN_KEY as string,
      { expiresIn: "7d" },
    );
    const updateRefreshToken = await Users.findByIdAndUpdate(
      ExistingUser._id,
      {
        $set: { refreshToken: refresh_token },
      },
      { new: true, runValidators: true },
    );
    res.cookie("jwt", refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    }); //TODO: add secure:true at production level
    console.log("Successfully Verified User : ", ExistingUser.email);
    return res.status(200).json({
      message: "Successfully Verified User",
      acTk: access_token,
      data: updateRefreshToken,
    });
  } catch (error) {
    getServerError(res, error, "LogIn controller");
  }
};
export const getUser = async (req: AuthRequest, res: Response) => {
  return res.status(200).json({ data: req!.user });
};
export const Register = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const userExist = await Users.findOne({ email });

    if (userExist) {
      console.error(
        "Registered User trying to register again : ",
        userExist.email,
      );
      return res.status(403).json({ message: "Email ID already exist" });
    }
    const encryptedPassword = await bcrypt.hash(password, 5);
    const newUser: Omit<IUser, keyof Document> = {
      firstname,
      lastname,
      refreshToken: "",
      email,
      password: encryptedPassword,
    };
    const createUser = await Users.create(newUser);
    if (!createUser) {
      console.error("Failed to create new User");
      return res.status(503).json({ message: "Failed to create new User" });
    }
    console.log("Successfully Created User : ", email);
    return res
      .status(201)
      .json({ message: "User has been registered Successfully " });
  } catch (error) {
    getServerError(res, error, "Register Controller");
  }
};

export const handleRefresh = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return res.status(401).json({ message: "Cookie missing" });
    const findUser = await Users.findOne({ refreshToken: cookies.jwt })
      .select("+refreshToken +_id")
      .lean<
        Pick<
          IUser,
          "firstname" | "lastname" | "pic" | "email" | "refreshToken"
        > & {
          _id: string;
        }
      >();
    if (!findUser) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.status(403).json({ message: "Invalid payload" });
    }
    const { refreshToken, ...other } = findUser;
    jwt.verify(
      findUser.refreshToken,
      envVariables.REFRESH_TOKEN_KEY as string,
      (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err || findUser._id != decoded.id)
          return res.status(403).json({ status: false });
        const access_token = jwt.sign(
          { id: decoded.id },
          envVariables.ACCESS_TOKEN_KEY as string,
          { expiresIn: "1d" },
        );
        return res.status(200).json({ acTk: access_token, userInfo: other });
      },
    );
  } catch (error) {
    getServerError(res, error, "handleRefresh controller");
  }
};

//This controller handles user logout, which will validated user, in both cases it will wipe out refresh token from cookie, so that further access token generation can be avoided
export const logOut = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return res.status(401).json({ message: "Cookie missing" });
    const findUser = await Users.findOne({ refreshToken: cookies.jwt })
      .select("+refreshToken +_id")
      .lean();
    if (!findUser) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //TODO:Add secure:true at production side
      return res.status(200).json({ status: true });
    }
    await Users.findOneAndUpdate(
      {
        refreshToken: findUser.refreshToken,
      },
      { $set: { refreshToken: "" } },
    );
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //TODO:Add secure:true at production side
    return res.status(200).json({ status: true });
  } catch (error) {
    getServerError(res, error, "logOut controller");
  }
};
