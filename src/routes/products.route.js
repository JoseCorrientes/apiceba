import { Router } from "express";
import { validatorPreBooking } from "../middlewares/validations/preBooking.validation.js";
import { getAllProducts, getProductById, createProducts, updatePreBooking } from "../controller/products.controller.js";

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProducts);
router.patch('/:id', validatorPreBooking, updatePreBooking);


export default router;
