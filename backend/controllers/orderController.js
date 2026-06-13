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
    const order = await Order.findById(orderId).populate("user","name email")
    if(!order)
    {
        return next(new ErrorHandler(400,"Order not found"))
    }
    res.json({
        success:true,
        order
    })
}

export const getAllOrders = async (req,res,next)=>{
    const UserId = req.user.id
    const orders  = await Order.find({user:UserId})
     if(!orders)
    {
        return next(new ErrorHandler(400,"Orders not found"))
    }
    res.json({
        success:true,
        orders
    })
}