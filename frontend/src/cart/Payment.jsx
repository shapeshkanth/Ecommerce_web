import React, {useEffect, useState} from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import CheckoutPath from './CheckoutPath'
import axios from 'axios'
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from './CheckoutForm'
import Loading from '../components/Loading'

export const Payment = () => {

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);
  const orderItem=JSON.parse(sessionStorage.getItem("orderItem"));


   useEffect(() => {

        const startPayment = async () => {

            try {

                const { data: keyData } = await axios.get("/api/v1/getApiKey");
                setStripePromise(loadStripe(keyData.key));
                const totalAmount = Number(orderItem.total);
                setAmount(totalAmount);

                 const { data } = await axios.post("/api/v1/payment/process",{amount: 100});

                setClientSecret(data.clientSecret);
            } catch (error) {
                console.log(error);
            }
        };

        if (orderItem) {

            startPayment();
        }
        }, []);

        if (!stripePromise || !clientSecret) {
           return (
            <>
             <PageTitle title="Payment" />
             <Navbar />
                <div>
                    <Loading/>
                </div>
            <Footer />
            </>
        )}

  return (
   <>
   <PageTitle title="Payment"/>
   <Navbar/>
   <main className='pt-20 min-h-screen bg-slate-50'>
    <div className='container mx-auto px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded shadow p-6'>
          <CheckoutPath activeStep={3}/>
          <h1 className='text-2xl font-bold text-slate-800 mb-6 mt-4 flex justify-between'>
                 <span>Payment Confirmation</span>
                 <Link to="/order/confirm" className='text-blue-600 hover:text-blue-700 text-sm'>Go Back</Link>
          </h1>
          <div className='w-full max-w-md mx-auto mt-10'>
              <Elements
                   stripe={stripePromise}
                   options={{
                        clientSecret: clientSecret}}>

                  <CheckoutForm amount={amount}/>

              </Elements>         
          </div>
        </div>
      </div>

    </div>
   </main>
   <Footer/>
   </>
  )
}
