import React, { useEffect } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { AllOrders } from '../features/order/orderSlice'
import { Link } from 'react-router-dom'

export const MyOrders = () => {
    const {orders,loading,error}=useSelector((state)=>state.order);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(AllOrders());
    },[])

  return (
    <>
    <PageTitle title="Order Details"/>
    <Navbar/>
    <main className='min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 mt-3'>
        <div className='max-w-6xl mx-auto rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden'>
            <div className='px-6 py-8 border-b border-gray-100'>
                <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>
                    My Orders
                </h1>
                <p className='mt-2 text-sm text-gray-500'>
                    View and manage your recent purchases
                </p>
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                    <thead>
                        <tr className='bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-semibold'>
                            <th className='px-6 py-4 border-b border-gray-100'>Order ID</th>
                            <th className='px-6 py-4 border-b border-gray-100'>Status</th>
                            <th className='px-6 py-4 border-b border-gray-100'>Items</th>
                            <th className='px-6 py-4 border-b border-gray-100'>Amount</th>
                            <th className='px-6 py-4 border-b border-gray-100'>Action</th>
                        </tr>
                    </thead>
                    
                        <tbody className='divide-y divide-gray-50'>
                          {orders && orders.length > 0 ? (
                            orders.map((order)=>(
                               <tr key={order._id} className='hover:bg-gray-100/50 transition-colors duration-200'>
                                <td className='px-6 py-5 text-sm font-medium text-gray-900'>#{order._id.substring(0,8)}...</td>
                                <td className='px-6 py-5 text-sm font-medium text-gray-900'>
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs  font-semibold tracking-wide ${order.orderStatus === "Processing" ? "bg-amber-100 text-amber-500 ":order.orderStatus === "Shipped" ? "bg-blue-100 text-blue-800" : order.orderStatus === "Delivered"? "bg-green-500 text-white" : "bg-gray-100 text-gray-800"}`}>{order.orderStatus}</span>
                                </td>
                                <td className='px-6 py-5 text-sm font-medium text-gray-900'>{order.OrderItems?.length || 2}</td>
                                <td className='px-6 py-5 text-sm font-medium text-gray-900'>{order.TotalPrice}</td>
                                <td className='px-6 py-5 text-sm font-medium text-gray-900'>
                                    <Link to={`/order/${order._id}`} className='inline-flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg text-indigo-600 bg-white hover:bg-blue-50 hover:text-indigo-700 hover:border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm '>View details</Link>
                                </td>
                               </tr> 
                            ))) : (
                            <tr>
                                <td colSpan="5" className='px-6 py-12 text-center'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <div className='bg-gray-50 rounded-full p-4 mb-4 '>
                                            <svg className='w-8 h-8 text-gray-400 ' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/200/svg'>
                                               <path strokeLinecap='round' strokeLinejoin='round' strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"> </path>
                                            </svg>
                                        </div>
                                        <h3 className='text-sm font-medium text-gray-900'>No orders found</h3>
                                        <p className='mt-1 text-sm text-gray-500'>You haven't placed any order yet.</p>
                                          <div className='mt-2'>
                                            <Link to="/products" className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                            Start Shopping
                                            </Link>
                                          </div>
                                    </div>
                                </td>
                            </tr>
                          )}
                        </tbody>
                    

                </table>

            </div>
        </div>
    </main>
    <Footer/>
    </>
  )
}
