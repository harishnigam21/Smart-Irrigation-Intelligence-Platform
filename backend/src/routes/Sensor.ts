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

const router = Router();

router.post("/readings", sensorReadingValidation, ingestReading);
router.route("/sensor").get(jwtVerifier, getSensors);
router
  .route("/sensor")
  .post(sensorValidation, jwtVerifier, addSensor)
  .delete(Validate, jwtVerifier, deleteSensor);

export default router;
