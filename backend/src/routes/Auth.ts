import express from "express";
import {
  getUser,
  handleRefresh,
  LogIn,
  logOut,
  Register,
} from "../controllers/Auth";
import registerValidation from "../validations/registerValidation";
import loginValidation from "../validations/loginValidation";
import jwtVerifier from "../middlewares/jwtVerifier";
const router = express.Router();
router.route("/register").post(registerValidation, Register);
router.route("/login").post(loginValidation, LogIn);
router.route("/user").get(jwtVerifier, getUser);
router.route("/refresh").get(handleRefresh);
router.route("/logout").get(logOut);
export default router;
