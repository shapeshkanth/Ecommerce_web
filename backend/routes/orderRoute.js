import express from "express"
import { createOrder } from "../controllers/orderController.js"
import { verifytoken } from "../helper/userAuth.js"
const router = express.Router()

router.post("/new/order",verifytoken,createOrder)

export default router