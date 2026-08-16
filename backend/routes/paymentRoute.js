import express from "express";
import { verifytoken } from "../helper/userAuth.js";
import { processPayment, sendApiKey } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/payment/process",verifytoken,processPayment);
router.get("/getApiKey",verifytoken,sendApiKey);

export default router;