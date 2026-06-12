import Order from "../models/orderModel.js"

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