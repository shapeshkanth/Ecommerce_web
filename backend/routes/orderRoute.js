import express from "express"
import { createOrder, getAllOrders, getOrderDetails } from "../controllers/orderController.js"
import { verifytoken } from "../helper/userAuth.js"
const router = express.Router()

router.post("/new/order",verifytoken,createOrder)
router.get("/getOrderDetails/:id",verifytoken,getOrderDetails)
router.get("/allOrder/user",verifytoken,getAllOrders)

export default router