import express from "express";
import jwtVerifier from "../middlewares/jwtVerifier";
import { addFarm, deleteFarm, getFarms } from "../controllers/Farm";
import farmValidation from "../validations/farmValidation";
import Validate from "../validations/mongooseIDValidation";
const router = express.Router();
router
  .route("/farm")
  .get(jwtVerifier, getFarms)
  .post(farmValidation, jwtVerifier, addFarm)
  .delete(Validate, jwtVerifier, deleteFarm);
export default router;
