import { Router } from "express";
import { summary } from "../controllers/Summary";
import jwtVerifier from "../middlewares/jwtVerifier";

const router = Router();

router.get("/summary", jwtVerifier, summary);

export default router;
