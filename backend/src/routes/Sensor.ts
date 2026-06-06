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
router.route("/sensor/:id").delete(Validate, jwtVerifier, deleteSensor);
router
  .route("/sensor")
  .post(sensorValidation, jwtVerifier, addSensor)
  .get(jwtVerifier, getSensors);

export default router;
