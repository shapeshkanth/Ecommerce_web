import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Sidebar } from './Sidebar'
import toast from 'react-hot-toast'
import { ChevronLeft, CreditCard, Package, RefreshCw, User } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sindleOrderDetails } from '../features/order/orderSlice'
import { removeSuccess, updateOrder } from '../features/admin/adminSlice'

export const EditOrder = () => {

   const { id:orderId } = useParams();
   const dispatch = useDispatch();
   const { order } = useSelector((state)=>state.order);
   const {error,success} = useSelector((state)=>state.admin);
   const [status, setStatus] = useState("");

   useEffect(()=>{
    dispatch(sindleOrderDetails(orderId));
   },[dispatch])

   console.log(error);
   const handleUpdateOrder = () =>{
            if(order?.orderStatus ===status)
            {
                toast.error(`Order is already ${status}`,{position:"top-center",autoClose:3000});
                return;
            }

            if(!status)
            {
                toast.error("Please select orderstatus",{position:"top-center",autoClose:3000});
                return;
            }
            dispatch(updateOrder({orderId,status}));

        }

        useEffect(()=>{
          if(success)
          {
             toast.success("Order status has been updated successfully",{position:"top-center",autoClose:3000});
             dispatch(removeSuccess())
          }
        },[success])

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
     <PageTitle title="Edit order status"/>
     <Navbar/>
     <main className='flex-1 flex overflow-hidden'>
        <Sidebar/>
        <div className='flex-1 overflow-y-auto p-3 md:p-5 '>     
                <Link  to="/admin/orders" className="flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-700 transition-colors mb-2">
                    <ChevronLeft size={19}/>
                    Back to order
                </Link>
                <h3 className='text-2xl text-gray-800 font-bold'>Process Order</h3>
                <p className='text-gray-500'>Order Id : <span>{order?._id}</span></p>
        <div className='flex flex-col md:flex-row gap-2 mt-5 gap-x-5'>
            <div className='w-full md:w-3/5'>
                <div className='bg-gray-100 rounded-xl p-3'>
                    <div className='flex gap-1 items-center font-semibold'>
                        <User size={20} className='text-blue-500'/>
                        <h3 className='text-xl text-gray-600'>Coustomer & Shipping</h3>
                    </div>
                    <div className='grid grid-cols-2 mt-3 gap-2 gap-y-3'>
                        <div>
                            <h4 className='text-sm uppercase tracking-wide text-gray-500'>Coustomer Name</h4>
                            <p className='text-sm capitalize font-semibold text-gray-700'>{order?.user?.name}</p>
                        </div>
                        <div>
                            <h4 className='text-sm uppercase tracking-wide text-gray-500'>Phone Number</h4>
                            <p className='text-sm font-semibold text-gray-700'>{order?.ShippingAddress?.phoneNo}</p>
                        </div>
                        <div>
                            <h4 className='text-sm uppercase tracking-wide text-gray-500'>Email Address</h4>
                            <p className='text-sm font-semibold text-gray-700'>{order?.user?.email}</p>
                        </div>
                        <div>
                            <h4 className='text-sm uppercase tracking-wide text-gray-500'>Shipping Address</h4>
                            <p className='flex flex-col text-sm capitalize font-semibold  text-gray-700'>
                                <span>{order?.ShippingAddress?.Address},</span>
                                <span>{order?.ShippingAddress?.city},</span>
                                <span>{order?.ShippingAddress?.country}.</span>
                            </p>
                        </div>
                    </div>

                </div>
                <div className=' flex flex-col bg-gray-100 rounded-xl p-3 mt-3 gap-1'>   
                   <h3 className='flex gap-1 items-center m-2 font-semibold text-gray-700 text-xl'>
                      <Package size={18}/>
                      Order items
                    </h3>
                    {order?.OrderItems?.map((ord)=>(
                         <div key={ord._id} className='flex items-center justify-between rounded-md border border-gray-200 shadow-sm p-2'>
                            <div className='flex items-center gap-2'>
                                <img src={ord.image} alt={ord.name} className='w-18 h-18 border border-gray-200 rounded-sm object-cover'/>  
                                <div>
                                    <h3 className='text-gray-1000 font-semibold'>{ord.name}</h3>
                                    <span className='text-gray-600 text-sm'>AED {ord.price} x {ord.quantity}</span>
                                </div>
                            </div>
                            <p className='text-slate-900 font-semibold pr-6'>AED {ord.price * ord.quantity}</p>
                         </div>
                    ))}
                        
             
                </div>

            </div>
            <div className='flex-1'>
                <div className='bg-gray-100 rounded-xl w-full p-3'>
                    <div className='flex gap-2 items-center px-2 border-b border-gray-200 p-2'>
                        <RefreshCw size={18} className='text-blue-400'/>
                        <h3 className='tracking-wide font-semibold text-gray-800'>PROCESS ORDER</h3>
                    </div>
                    <div className='flex flex-col items-center'>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}  className='p-2 border border-gray-200 mt-4 text-center font-semibold shadow-sm'>
                          <option value="">Select order status</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <button onClick={handleUpdateOrder} className='bg-blue-500 text-white px-5 py-1 mt-2 rounded m-3'>Update</button>
                    </div>
                    
                </div>
                <div className='bg-gray-100 rounded-xl w-full p-3 mt-3'>
                    <div className='flex gap-2 items-center px-2 border-b border-gray-200 p-2'>
                        <CreditCard size={18} className='text-blue-400'/>
                        <h3 className='tracking-wide font-semibold text-gray-800'>PAYMENT DETAILS</h3>
                    </div>
                    <div className=' flex justify-between mt-5'>
                      <p className='text-gray-500'>Status</p>
                      <p className='flex justify-center items-center text-green-500 font-semibold bg-green-200 rounded-2xl px-5'>{order?.paymentInfo?.status == "succeeded" ? "Paid" : "Unpaid"}</p>
                    </div>
                    <div className='flex justify-between mt-2'>
                      <p className='text-gray-500'>Gateway</p>
                      <p className='text-gray-800 font-bold'> Stripe / card</p>
                    </div>
         
                </div>

            </div>
        </div>

        </div>
        </main>
        <Footer/>
    </div>
  )
}
