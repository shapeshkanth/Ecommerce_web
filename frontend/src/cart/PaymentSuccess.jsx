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

export const PaymentSuccess = () => {
    const [psuccess,setSuccess]=useState(false);
    const [ploading,setLoading]=useState(true);
    const [paymentId,setPaymentId]=useState("");
    

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
          <div className='flex justify-center items-center h-screen  '>
            <div className="text-center mt-20  w-md bg-gray-100 rounded-xl py-10 border-1 border-green-500 shadow">
                <h1 className="text-4xl font-bold text-green-600">
                Payment Successful 🎉
                </h1>

                <p className="mt-4">
                Your payment has been completed successfully.
                </p>
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
