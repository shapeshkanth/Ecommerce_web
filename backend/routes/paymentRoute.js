import express from "express";
import { verifytoken } from "../helper/userAuth.js";
import { processPayment, sendApiKey, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/payment/process",verifytoken,processPayment);
router.get("/getApiKey",verifytoken,sendApiKey);
router.get("/payment/verify/:paymentIntentId",verifytoken,verifyPayment);

export default router;