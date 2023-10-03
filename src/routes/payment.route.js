// import { Router } from "express";
// import { paymentConfirmation } from "../controller/payment.controller.js";
const { Router }=require("express");
const { paymentConfirmation }=require("../controller/payment.controller.js");


const router = Router();

router.post('/', paymentConfirmation);




// export default router;
module.exports = router;
