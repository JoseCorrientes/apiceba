// import { Router } from "express";
// import { getAllLogsController, createLogController } from "../controller/logs.controller.js";
// import {validatorLogs} from "../middlewares/validations/logs.validation.js";
const { Router }=require("express");
const { getAllLogsController, createLogController }=require("../controller/logs.controller.js");
const {validatorLogs}=require("../middlewares/validations/logs.validation.js");

const router = Router();

router.get('/', getAllLogsController);
router.post('/', validatorLogs, createLogController);





// export default router;
module.exports= router;
