import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const Shipping = () => {
  return (
    <>
    <PageTitle title="Shipping information" />
    <Navbar/>
    <main className='min-h-screen pt-20'>
        <div className='container mx-auto px-4 '>
            <div className='max-w-4xl mx-auto'>
                 <div className='bg-white rounded shadow-md p-6'>
                    <h2 className='text-2xl font-bold text-slate-800 mb-6'>Shipping information</h2>
                       <form>
                     <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-5'>
                            <div>
                                <label htmlFor="address" className='block text-sm font-medium text-slate-700 mb-1.5'>Address</label>
                                <input type="text" name='address' id='address' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placehodel-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 tyransition-all dutation-300' placeholder='Enter your full address'/>
                            </div>
                            <div>
                                <label htmlFor="pincode" className='block text-sm font-medium text-slate-700 mb-1.5'>Pincode</label>
                                <input type="text" name='pincode' id='pincode' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placehodel-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 tyransition-all dutation-300' placeholder='Enter pincode'/>
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className='block text-sm font-medium text-slate-700 mb-1.5'>Phone Number</label>
                                <input type="text" name='phoneNumber' id='phoneNumber' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placehodel-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 tyransition-all dutation-300' placeholder='Enter phone number'/>
                            </div>
                        </div>
                        <div className='space-y-5'>
                             <div>
                                <label htmlFor="country" className='block text-sm font-medium text-slate-700 mb-1.5'>Country</label>
                                <select name='country' id='country' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-300'>
                                    <option value="">Select Country</option>
                                </select>
                             </div>
                             <div>
                                <label htmlFor="state" className='block text-sm font-medium text-slate-700 mb-1.5'>State</label>
                                <select name='state' id='state' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-300'>
                                    <option value="">Select State</option>
                                </select>
                             </div>
                             <div>
                                <label htmlFor="city" className='block text-sm font-medium text-slate-700 mb-1.5'>City</label>
                                <select name='city' id='city' className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-300'>
                                    <option value="">Select City</option>
                                </select>
                             </div>

                        </div> 
                        <div className='pt-2'>
                            <button className='w-full md:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0'>
                                Continue to Payment
                            </button>
                        </div>
                     </div>
                     </form>
                 </div>
            </div>

        </div>
    </main>
    <Footer/>
    </>
  )
}
