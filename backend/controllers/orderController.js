import Order from "../models/orderModel.js"
import ErrorHandler from "../helper/ErrorHandler.js"


export const createOrder=async (req,res,next)=>{
const {ShippingAddress,OrderItems,paymentInfo,price,tax,shippingPrice,TotalPrice} = req.body

const order = await Order.create({
    ShippingAddress,
    OrderItems,
    paymentInfo,
    price,
    tax,
    shippingPrice,
    TotalPrice,
    paidAt:Date.now(),
    user: req.user._id

})

res.status(201).json({
    success:true,
    message:"order created successfully",
    order
})
}
export const getOrderDetails = async (req,res,next)=>{
    const orderId = req.params.id
    const order = await Order.findById(orderId)
    if(!order)
    {
        return next(new ErrorHandler(400,"Order not found"))
    }
    res.json({
        success:true,
        order
    })
}