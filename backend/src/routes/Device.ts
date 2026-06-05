import { Router } from "express";
import jwtVerifier from "../middlewares/jwtVerifier";
import Validate from "../validations/mongooseIDValidation";
import { addDevices, deleteDevice, getDevices } from "../controllers/Device";
import {
  deviceValidation,
  getDeviceValidation,
} from "../validations/deviceValidation";

const router = Router();

router
  .route("/device")
  .get(jwtVerifier, getDeviceValidation, getDevices)
  .post(jwtVerifier, deviceValidation, addDevices);
router.route("/device/:id").delete(jwtVerifier, Validate, deleteDevice);

export default router;
