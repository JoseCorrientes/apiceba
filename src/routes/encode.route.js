// import { Router } from "express";
// import { encryptData, decryptData } from "../controller/encode.controller.js";
const { Router }=require("express");
const{ encryptData, decryptData }=require("../controller/encode.controller.js");

const router = Router();


router.post('/encrypt', encryptData);
router.post('/decrypt', decryptData);


// export default router;
module.exports = router;
