import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import toast from 'react-hot-toast';
import axios from 'axios';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';

export const PaymentSuccess = () => {
    const [success,setSuccess]=useState(false);
    const [loading,setLoading]=useState(true);


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
                setLoading(false);
            }
        } catch (error) {
            toast.error(error,{position:"top-center",autoClose:2000});
        }
    }

    verifyPayment();
  
    },[])
  return (
    <>{loading? (
        <Loading/>
    ): success ? (
        <>
        <Navbar/>
        <PageTitle title="Payment Success"/>
          <div className='flex justify-center items-center h-screen sticky '>
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
