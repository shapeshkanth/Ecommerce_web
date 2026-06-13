import express from "express"
import { createOrder, getOrderDetails } from "../controllers/orderController.js"
import { verifytoken } from "../helper/userAuth.js"
const router = express.Router()

router.post("/new/order",verifytoken,createOrder)
router.get("/getOrderDetails/:id",verifytoken,getOrderDetails)

export default router