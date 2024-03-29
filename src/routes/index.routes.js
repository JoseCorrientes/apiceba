// import { Router } from "express";
// import routeProducts  from "./products.route.js";
// import routePayment from "./payment.route.js";
// import routeEncrypt from "./encode.route.js";
// import routeLogs from "./logs.routes.js";


const { Router }=require("express");
const routeProducts=require("./products.route.js");
const routePayment=require("./payment.route.js");
const routeEncrypt=require("./encode.route.js");
const routeLogs =require("./logs.routes.js");

const router = Router();


router.use('/health', (req, res) => {
  res.status(200).json({message: 'API is running Ok!'});
})

router.use('/products', routeProducts);
router.use('/payment', routePayment);
router.use('/encode', routeEncrypt);
router.use('/log', routeLogs);




// export default router;
module.exports = router;









