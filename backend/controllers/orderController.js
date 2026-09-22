import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import ErrorHandler from "../helper/ErrorHandler.js"
import { promises } from "fs"
import ProductListing from "../helper/ProductListing.js"


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

export const allOrders = async (req,res,next)=>{
    const params = req.query;
    const perPage = 8;

    const OrderList = new ProductListing(Order.find(),params);

    const TotalOrders = await Order.countDocuments();
    const TotalPages = Math.ceil(TotalOrders/perPage);

    const page = Number(req.query.page) || 1
    if(TotalPages<=0 || page<1 || page>TotalPages)
    {
         return next(new ErrorHandler(404,"Orders does not exit"));
    }

    OrderList.pagination(perPage);
    const orders = await OrderList.query.populate("user","name email");

     if(!orders)
    {
        return next(new ErrorHandler(400,"Orders not found"))
    }
    let totalamount = 0;
    orders.forEach((order)=>totalamount += order.TotalPrice)
    res.json({
        success:true,
        orders,
        perPage,
        TotalPages,
        totalamount
    })
}

export const deleteOrder = async (req,res,next)=>{
    const orderId = req.params.id
    const order = await Order.findById(orderId)
    if(!order)
    {
        return next(new ErrorHandler(400,"Orders not found"))
    }
    if(order.orderStatus!=="Delivered")
    {
        return next(new ErrorHandler(400,"This order is under processing and cannot be delete"))
    }

  await Order.deleteOne({_id:orderId})
  res.json({
        success:true,
        message:"Order deleted successfully"
    })

}

export const updateOrder = async (req,res,next)=>{
    const orderId = req.params.id
    const order =await Order.findById(orderId)
    if(!order)
    {
         return next(new ErrorHandler(400,"Orders not found"))
    }
    if(order.orderStatus==="Delivered")
    {
      return next(new ErrorHandler(400,"This order alredy Delivered"))
    }
   

    order.orderStatus = req.body.status
     if(order.orderStatus==="Delivered")
    {
        await Promise.all(order.OrderItems.map((item)=>stockUpdate(item.product,item.quantity)))
        order.deliveryAt=Date.now();
    }
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        order
    })
}

async function stockUpdate(ProductId,ProductQuantity) {
    const product = await Product.findById(ProductId)
    if(!product)
    {
        throw new Error("Product not found")
    }

    product.stock = product.stock - ProductQuantity
    await product.save({validateBeforeSave:false})
}