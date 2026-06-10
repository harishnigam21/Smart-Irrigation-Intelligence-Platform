import { Router } from "express";
import {
  addSensor,
  deleteSensor,
  getSensors,
  ingestReading,
} from "../controllers/Sensor";
import sensorReadingValidation from "../validations/sensorReadingValidation";
import jwtVerifier from "../middlewares/jwtVerifier";
import Validate from "../validations/mongooseIDValidation";
import sensorValidation from "../validations/sensorValidation";
import { getReadings } from "../controllers/Device";
import { getDeviceValidation } from "../validations/deviceValidation";

const router = Router();

router
  .route("/readings")
  .post(sensorReadingValidation, ingestReading)
  .get(jwtVerifier, getDeviceValidation, getReadings);
router.route("/sensor/:id").delete(Validate, jwtVerifier, deleteSensor);
router
  .route("/sensor")
  .post(sensorValidation, jwtVerifier, addSensor)
  .get(jwtVerifier, getSensors);

export default router;
