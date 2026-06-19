import express from "express";
import jwtVerifier from "../middlewares/jwtVerifier";
import Validate from "../validations/mongooseIDValidation";
import {
  deleteAlert,
  getAlert,
  getAlerts,
  handleImportant,
  handleRead,
  handleStar,
  handleUnImportant,
  handleUnread,
  handleUnStar,
} from "../controllers/Alert";
const router = express.Router();
router.route("/alert/:id").get(jwtVerifier, Validate, getAlert);
router.route("/alert/star").patch(jwtVerifier, handleStar);
router.route("/alert/unstar").patch(jwtVerifier, handleUnStar);
router.route("/alert").delete(jwtVerifier, deleteAlert);
router.route("/alert/important").patch(jwtVerifier, handleImportant);
router.route("/alert/unImportant").patch(jwtVerifier, handleUnImportant);
router.route("/alert/read").patch(jwtVerifier, handleRead);
router.route("/alert/unread").patch(jwtVerifier, handleUnread);
router.route("/alerts").get(jwtVerifier, getAlerts);
export default router;
