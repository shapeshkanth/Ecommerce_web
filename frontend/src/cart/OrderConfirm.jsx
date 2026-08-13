import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const OrderConfirm = () => {

    const {shippingInfo,cartItems} = useSelector((state)=>state.cart);
    const {user} =useSelector((state)=>state.user);

    const subtotal = cartItems.reduce((acc,item)=>acc + item.price * item.quantity, 0);
    const shippingCharges = shippingInfo.shippingCharges || 0;
    const tax = subtotal * 0.05;
    const total = subtotal + shippingCharges + tax;
  return (
    <>
    <PageTitle title="Confirm Order"/>
    <Navbar/>
    <main className='min-h-screen pt-20 bg-slate-50 '>
        <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='lg:col-span-2'>
                    <h1 className='text-2xl font-bold text-slate-800 mb-6 mt-4 flex justify-between'>
                        <span>Order Confirmation</span>
                        <Link to="/shipping" className='text-blue-600 hover:text-blue-700 text-sm'>Go Back</Link>
                    </h1>
                    <div className='mb-8'>
                        <h2 className='text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2'>Shipping Information</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600'>
                            <div>
                                <p className='text-sm text-slate-400 mb-1'>Name</p>
                                <p className='font-medium text-slate-800 capitalize'>{user?.name}</p>
                            </div>
                             <div>
                                <p className='text-sm text-slate-400 mb-1'>Phone Number</p>
                                <p className='font-medium text-slate-800 capitalize'>{shippingInfo?.phoneNumber}</p>
                            </div>
                             <div className='md:col-span-2'>
                                <p className='text-sm text-slate-400 mb-1'>Addess</p>
                                <p className='capitalize font-medium text-slate-800'>
                                    {shippingInfo.address},{shippingInfo.city},{shippingInfo.state},{shippingInfo.country}-{shippingInfo.pincode}
                                </p>
                             </div>
                        </div>
                    </div>
                    <div className='mb-8'>  
                        <h2 className='text-lg font-bold  text-slate-800 mb-4 border-b border-slate-200 pb-2'> Your Cart Items</h2>
                     <div className='space-y-4'>
                        {cartItems.map((item)=>(
                            <div key={item.product} className='flex items-center justify-between p-4 relative rounded-xl bg-slate-50 border border-slate-100 group hover:border-blue-100 transition-all '>
                               <div className='flex items-center space-x-4 '>
                                  <div className='relative'>
                                     <img src={item.image} alt={item.name}  className='h-15 w-15 object-cover rounded-lg border border-slate-200'/>
                                     <span className='absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm'>{item.quantity}</span>
                                  </div>
                                  <div className='flex flex-col'>
                                    <span className='font-semibold text-slate-800 line-clamp-1'>{item.name}</span>
                                    <span className='text-sm text-slate-500 mt-1'>{item.price} /each</span>
                                  </div>
                               </div>
                               <div>
                                AED {item.price * item.quantity}
                               </div>
                            </div>
                        ))}

                     </div>
                   
                    </div>

                </div>
                <div className='lg:col-span-1'>
                    <div className='bg-white rounded-sm shadow-sm border border-slate-100 p-6 sticky top-24'>
                       <h2 className='text-xl font-bold text-slate-800  mb-6 border-b border-slate-200 pb-4'>
                        Order Summary
                       </h2>
                       <div className='space-y-4 text-slate-600 border-b border-slate-100 pb-6 mb-6'>
                        <div className='flex justify-between'>
                            <span>Subtotal</span>
                            <span className='font-semibold text-slate-800'>AED {subtotal}</span>
                        </div>
                         <div className='flex justify-between'>
                            <span>Shipping charges</span>
                            <span className='font-semibold text-slate-800'>{shippingCharges===0 ?(
                             <span className='text-emerald-500'>Free</span>
                            ):(
                                 `AED ${shippingCharges}`
                            )}</span>
                        </div>
                         <div className='flex justify-between'>
                            <span>Tax</span>
                            <span className='font-semibold text-slate-800'>AED {tax}</span>
                        </div>
                         <div className='flex justify-between'>
                            <span>Total</span>
                            <span className='font-semibold text-slate-800'>AED {total}</span>
                        </div>
                        <button className='w-full px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0'>Proceed to payment</button>
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
