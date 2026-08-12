import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Country,State,City} from "country-state-city"
import toast from 'react-hot-toast'

export const Shipping = () => {
   const [address,setAddress]=useState("");
   const [pincode,setPincode]=useState("");
   const [phoneNumber,setPhoneNumber]=useState("");
   const [country,setCountry]=useState("");
   const [state,setState]=useState("");
   const [city,setCity]=useState("");

   const shippingHandler = (e)=>{
    e.preventDefault();
    if(!address || !pincode || !phoneNumber || !country || !state || !city)
    {
      toast.error("Please fill all the details",{position:"top-center",autoClose:2000})
      return;
    }
    
   }

  return (
    <>
    <PageTitle title="Shipping information" />
    <Navbar/>
    <main className='min-h-screen pt-20'>
        <div className='container mx-auto px-4 '>
            <div className='max-w-4xl mx-auto'>
                 <div className='bg-white rounded shadow-md p-6'>
                    <h2 className='text-2xl font-bold text-slate-800 mb-6'>Shipping information</h2>
                       <form onSubmit={shippingHandler}>
                     <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-5'>
                            <div>
                                <label htmlFor="address" className='block text-sm font-medium text-slate-700 mb-1.5'>Address</label>
                                <input type="text" name='address' id='address' value={address} onChange={(e)=>setAddress(e.target.value)} className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placehodel-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 tyransition-all dutation-300' placeholder='Enter your full address'/>
                            </div>
                            <div>
                                <label htmlFor="pincode" className='block text-sm font-medium text-slate-700 mb-1.5'>Pincode</label>
                                <input type="text" name='pincode' id='pincode' value={pincode} onChange={(e)=>setPincode(e.target.value)} className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placehodel-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 tyransition-all dutation-300' placeholder='Enter pincode'/>
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className='block text-sm font-medium text-slate-700 mb-1.5'>Phone Number</label>
                                <input type="text" name='phoneNumber' id='phoneNumber' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placehodel-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 tyransition-all dutation-300' placeholder='Enter phone number'/>
                            </div>
                        </div>
                        <div className='space-y-5'>
                             <div>
                                <label htmlFor="country" className='block text-sm font-medium text-slate-700 mb-1.5'>Country</label>
                                <select name='country' id='country' value={country} onChange={(e)=>{
                                    setCountry(e.target.value),
                                    setState(""),
                                    setCity("") 
                                    }} className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-300'>
                                    <option value="">Select Country</option>
                                    {Country.getAllCountries().map((country)=>(
                                        <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                                    ))}
                                </select>
                             </div>
                             <div>
                                <label htmlFor="state" className='block text-sm font-medium text-slate-700 mb-1.5'>State</label>
                                <select name='state' id='state' value={state} onChange={(e)=>{
                                    setState(e.target.value),
                                    setCity("") 
                                    }} className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-300'>
                                    <option value="">Select State</option>
                                    {country && State.getStatesOfCountry(country).map((state)=>(
                                        <option key={state.isoCode} value={state.isoCode} >{state.name}</option>
                                    ))}
                                </select>
                             </div>
                             <div>
                                <label htmlFor="city" className='block text-sm font-medium text-slate-700 mb-1.5'>City</label>
                                <select name='city' id='city' value={city} onChange={(e)=>setCity(e.target.value)} className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-300'>
                                    <option value="">Select City</option>
                                    {state && City.getCitiesOfState(country,state).map((city)=>(
                                        <option key={city.name} value={city.name}>{city.name}</option>
                                    ))}
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
