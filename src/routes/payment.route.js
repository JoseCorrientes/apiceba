import { Router } from "express";
import { paymentConfirmation } from "../controller/payment.controller.js";


const router = Router();

router.post('/', paymentConfirmation);




export default router;
