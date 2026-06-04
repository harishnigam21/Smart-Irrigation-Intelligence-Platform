import express from "express";
import jwtVerifier from "../middlewares/jwtVerifier";
import { addFarm, deleteFarm, getFarm, getFarms } from "../controllers/Farm";
import farmValidation from "../validations/farmValidation";
import Validate from "../validations/mongooseIDValidation";
const router = express.Router();
router
  .route("/farm")
  .post(jwtVerifier, farmValidation, addFarm)
  .delete(Validate, jwtVerifier, deleteFarm);
router.route("/farms").get(jwtVerifier, getFarms);
router.route("/farm/:id").get(jwtVerifier, getFarm);
export default router;
