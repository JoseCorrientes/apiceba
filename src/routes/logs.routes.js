import { Router } from "express";
import { getAllLogsController, createLogController } from "../controller/logs.controller.js";
import {validatorLogs} from "../middlewares/validations/logs.validation.js";

const router = Router();

router.get('/', getAllLogsController);
router.post('/', validatorLogs, createLogController);





export default router;
