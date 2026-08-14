import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import CheckoutPath from './CheckoutPath'

export const Payment = () => {
  const orderItem=JSON.parse(sessionStorage.getItem("orderItem"))
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
          <div className='w-full max-w-md'>
            <div className='bg-white rounded-2xl shadow-sm border border-slate-100 p-6'>
              <h2 className='text-xl font-bold text-slate-800 mb-6 border-b border-slate-200'>Payment</h2>
              <button className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold  hover:bg-blue-700 transition-all'>Pay (AED.{orderItem.total})</button>
            </div>
          </div>
        </div>
      </div>

    </div>
   </main>
   <Footer/>
   </>
  )
}
