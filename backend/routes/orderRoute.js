import express from "express"
import { allOrders, createOrder, getAllOrders, getOrderDetails } from "../controllers/orderController.js"
import { roleBasedAccess, verifytoken } from "../helper/userAuth.js"
const router = express.Router()

router.post("/new/order",verifytoken,createOrder)
router.get("/getOrderDetails/:id",verifytoken,getOrderDetails)
router.get("/allOrder/user",verifytoken,getAllOrders)

router.get("/admin/allOrders",verifytoken,roleBasedAccess("admin"),allOrders)

export default router