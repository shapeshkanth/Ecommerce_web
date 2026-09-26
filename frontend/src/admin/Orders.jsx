import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Sidebar } from './Sidebar'
import { ClipboardList, Edit, Loader2, Trash2, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { allOrders, deleteOrder, removeSuccess } from '../features/admin/adminSlice'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export const Orders = () => {

  const dispatch = useDispatch();
  const {loading,success,orders,error,orderResultPerPage,orderTotalPages,deletingOrders} = useSelector((state)=>state.admin);
  const [currentPage,setCurrentPage]=useState(1);
  useEffect(()=>{

    dispatch(allOrders(currentPage))
  },[dispatch,currentPage])

  const handleDelete = (orderId)=>{

      const isConfirmed = window.confirm("Are you sure you want to delete this Order?")
      if(isConfirmed)
      {
        dispatch(deleteOrder(orderId)).then((action) =>{

          if(action.type === "admin/deleteOrder/fulfilled")
          {
            toast.success("Order Deleted Successfully", {position: "top-center", autoClose:3000});
            dispatch(removeSuccess());
            
            if(orders.length === 1 && currentPage > 1)
            {
              setCurrentPage(currentPage-1);
            }else{
              dispatch(allOrders(currentPage));
            }
          }
        })
      }
      

  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
     <PageTitle title="Admin Order view"/>
     <Navbar/>
     <main className='flex-1 flex overflow-hidden'>
        <Sidebar/>
        <div className='flex-1 overflow-y-auto p-6 md:p-10'>
          <div className='max-w-7xl mx-auto'>
             <div className='mb-10'>
                <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
                  <ClipboardList className='text-indigo-600'/>
                  All Orders
                </h1>
                <p className='text-gray-500 mt-2'>Manage all the user orders</p>
              </div>
              <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                <div  className='overflow-x-auto'>
                  <table  className='w-full text-left border-collapse'>
                    <thead className='bg-gray-50/80 backdrop-blur-sm border-b border-gray-200'>
                      <tr>
                        <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide '>Order Id</th>
                        <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Total Price</th>
                        <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Order Status</th>
                        <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide text-right'>Action</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="4" className='px-6 py-20 text-center text-gray-400 font-medium '>
                            <div className='flex flex-col items-center gap-2'>
                              <div className='w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin'>
                               
                              </div>
                               Loading Orders...
                            </div>
                          </td>
                        </tr>
                      ) : orders.length===0 ? (
                      <tr>
                        <td colSpan="4" className='px-6 py-20 text-center text-gray-400 font-medium'>
                          No Orders Found
                        </td>

                      </tr>
                      ) : (
                         orders.map((order)=>(
                           <tr key={order._id} className='hover:bg-indigo-50/30 transition-colors duration-200'>
                              <td className='px-6 py-4'>
                                  <div className='flex items-center'>                                  
                                    <p className='text-sm font-semibold text-gray-900 line-clamp-1 hover:text-indigo-600 transition-colors'> ...{order._id.slice(-8)}</p>                                  
                                  </div>
                              </td>
                              <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                          
                            <p className=" py-1  text-xs font-semibold ">AED {order.TotalPrice}</p> 
                          </td>
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                          
                          <span className={`px-2.5 py-1  rounded-full text-xs font-semibold ${order.orderStatus=="Shipped" ? "bg-blue-100 text-blue-700" : order.orderStatus=="Processing" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700" }`}>{order.orderStatus}</span> 
                          </td>

                          <td className='px-6 py-4 text-right'>
                            <div className='flex items-center justify-end gap-2'>
                              <Link to={`/admin/editOrderStatus/${order._id}`} className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors' title='Edit User'>
                                 <Edit size={18}/>
                              </Link>
                              
                                 {order.orderStatus === "Delivered" ? (
                                    <button
                                        disabled={deletingOrders?.[order._id]}
                                        onClick={() => handleDelete(order._id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Order"
                                    >
                                        {deletingOrders?.[order._id]
                                            ? <Loader2 size={18} className="animate-spin" />
                                            : <Trash2 size={18} />
                                        }
                                    </button>
                                    ) : (
                                    <span
                                        className="p-2 text-gray-400"
                                        title="Order cannot be deleted until delivered"
                                    >
                                        <Trash2 size={18} className='opacity-25'/>
                                    </span>
                                 )}  
                            </div>
                          </td>
                           </tr>
                     ))

                      )}
                      
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        </div>
     </main>
      <Footer/>
    </div>
  )
}
