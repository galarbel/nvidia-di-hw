import { Router } from "express";
import { downloadRawData, getAggregatedData, getAllTestTypes } from "../controllers/mnf.controller";

const router = Router();

// router.get('/', getMnfs);

// This is not really RESTY.... but the requirements are for an aggragted report and raw data.
router.get("/raw", downloadRawData);
router.get("/report", getAggregatedData);
router.get("/test-types", getAllTestTypes);

export default router;
