import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import toast from 'react-hot-toast';
import axios from 'axios';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, removeErrors, removeSuccess } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccess = () => {
    const [psuccess,setSuccess]=useState(false);
    const [ploading,setLoading]=useState(true);
    const [paymentId,setPaymentId]=useState("");
    const navigate = useNavigate();

    const {cartItems,shippingInfo}= useSelector((state)=>state.cart);
    const {success,error}=useSelector((state)=>state.order);
    const dispatch=useDispatch();

    

  useEffect(()=>{
        const verifyPayment = async () => {
        const params = new URLSearchParams(window.location.search);
        const paymentIntentId = params.get("payment_intent");

        if(!paymentIntentId)
        {
            setLoading(false);
            return;
        }

        try {
            const {data} = await axios.get(`/api/v1/payment/verify/${paymentIntentId}`);
            if(data.status==="succeeded")
            {
                setSuccess(true);
                setPaymentId(data.paymentIntentId);
            
            }
        } catch (error) {
            toast.error(error,{position:"top-center",autoClose:2000});
        }
        finally {
    setLoading(false);
}
    }

    
    verifyPayment();
  
    },[])


    useEffect(()=>{

         if (!paymentId || !psuccess) {
        return;
           }

      const createOrderData = async ()=>{
        try {
            const orderItem = JSON.parse(sessionStorage.getItem("orderItem"));

            if(!orderItem)
            {
                return;
            }

            const orderData = {
                ShippingAddress : {
                    Address:shippingInfo.address,
                    city:shippingInfo.city,
                    state:shippingInfo.state,
                    country:shippingInfo.country,
                    pincode:shippingInfo.pincode,
                    phoneNo : shippingInfo.phoneNumber
                },
                OrderItems:cartItems.map((item)=>({
                    name:item.name,
                    price:item.price,
                    quantity:item.quantity,
                    image:item.image,
                    product:item.product

                })),
                paymentInfo:{
                    id:paymentId,
                    status:"succeeded"
                },
                price:orderItem.subtotal,
                tax:orderItem.tax,
                shippingPrice:orderItem.shippingCharges,
                TotalPrice:orderItem.total

            };

            dispatch(createOrder(orderData));
            sessionStorage.removeItem("orderItem");
        } catch (error) {
            toast.error(error,{position:"top-center",autoClose:3000})
        }
      }
      createOrderData();
    },[paymentId,psuccess]);

  useEffect(()=>{
    if(success)
    {
        toast.success("Order Placed",{position:"top-center",autoClose:30000});
        dispatch(removeSuccess());
        dispatch(clearCart());
    }
  },[dispatch,success])

  useEffect(()=>{
     if(error)
     {
       toast.error(error,{position:"top-center",autoClose:3000});
       dispatch(removeErrors());
     }
  },[dispatch,error])
    
  return (
    <>{ploading? (
        <Loading/>
    ): psuccess ? (
        <>
        <Navbar/>
        <PageTitle title="Payment Success"/>
          
                <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-gray-50">
                    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                    
                        <div className="bg-green-50 flex flex-col items-center justify-center py-10 px-6">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
                                <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
                                    <span className="text-white text-3xl font-bold">
                                        ✓
                                    </span>
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900">
                                Payment Successful
                            </h1>

                            <p className="text-gray-600 mt-2 text-center">
                                Thank you! Your payment has been completed successfully.
                            </p>
                        </div>

                      
                        <div className="px-6 py-7">

                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <span className="text-gray-500">
                                    Payment Status
                                </span>

                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                                    Paid
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                <span className="text-gray-500">
                                    Payment ID
                                </span>

                                <span className="text-gray-800 font-medium text-sm max-w-[220px] truncate">
                                    {paymentId}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-3">
                                <span className="text-gray-500">
                                    Order Status
                                </span>

                                <span className="text-indigo-600 font-semibold">
                                    Order Placed
                                </span>
                            </div>

                           
                            <div className="mt-5 bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-sm text-gray-600">
                                    Your order has been successfully placed.
                                    You can check your order details from your
                                    account.
                                </p>
                            </div>

                            
                            <div className="grid grid-cols-2 gap-3 mt-6">

                                <button onClick={() => navigate("/order/user")} className="py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
                                    View Orders
                                </button>

                                <button onClick={() => navigate("/products")} className="py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                                    Continue Shopping
                                </button>

                            </div>

                        </div>
                    </div>
                </div>

       <Footer/>
        </>
      
    ) : (
        <div className="text-center mt-20">
            <h1 className="text-4xl font-bold text-red-600">
                Payment Failed ❌
            </h1>
        </div>
    ) }
    </>
  )
}
