import Navbar from "../components/Navbar"
import PageTitle from "../components/PageTitle"
import { Sidebar } from "./Sidebar"
import Footer from '../components/Footer'
import { ChevronLeft, Edit, Star, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { adminGetProducts } from "../features/admin/adminSlice"

export const AllUserReviews = () => {
  const {success,products,loading,productCount,resultPerPage,deleting} = useSelector((state)=>state.admin);
  const dispatch = useDispatch();
  const [currentPage,setCurrentPage]=useState(1);

   useEffect(()=>{
     dispatch(adminGetProducts(currentPage));
    },[dispatch,currentPage])

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
     <PageTitle title="Product Reviews"/>
     <Navbar/>
     <main className='flex-1 flex overflow-hidden'>
        <Sidebar/>
        <div className='flex-1 overflow-y-auto p-3 md:p-5 '>        
                <h3 className='text-2xl text-gray-800 font-bold'>Product Reviews</h3>
                <p className='text-gray-500 mt-1'>Manage all product reviews</p>
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-3'>
                    <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead className='bg-gray-50/80 backdrop-blur-sm border-b border-gray-200'>
                        <tr>
                            <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Product</th>
                            <th className='py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Total Reviews</th>
                            <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Rating</th>
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
                               Loading Products...
                            </div>
                          </td>
                        </tr>) : products.length===0 ? (
                      <tr>
                        <td colSpan="4" className='px-6 py-20 text-center text-gray-400 font-medium'>
                          No Products Found
                        </td>

                      </tr>
                      ) : (products.map((product)=>(
           
                        <tr key={product._id}  className='hover:bg-indigo-50/30 transition-colors duration-200'>
                                <td className='px-6 py-4'>
                                    <div className='flex items-center gap-4'>
                                    <div className='h-12 w-12 rounded-lg border border-gray-100 overflow-hidden bg-gray-50 shrink-0'>
                                        <img src={product.image[0].url} alt={product.name} className='h-full w-full object-cover' />
                                    </div>
                                    <Link to={`/product/${product._id}`} target="_blank">
                                      <p className='text-sm font-semibold text-gray-900 line-clamp-1 hover:text-indigo-600 transition-colors'>{product.name}</p>
                                    </Link>
                                    </div>
                                </td>
                                <td className='px-6 py-4  text-sm font-medium text-gray-900'>
                                 {product.reviews.length}    
                                </td>
                                <td className='px-6 py-4 text-sm font-medium'>
                                    <span className="flex gap-1">
                                        <Star size={18} className="fill-yellow-400 text-yellow-500" />
                                        {Math.round(product.rating)}/5
                                    </span>
                                </td>
                                <td className='px-6 py-4 text-right'>
                                     <div className='flex items-center justify-end gap-2'>
                                        <Link to={`/admin/review/${product._id}`} className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors' title='Edit Reviews'>
                                        <Edit size={18}/>
                                        </Link>
                                     </div>
                                    
                                </td>
                            </tr>

                      )))}

                            

                        </tbody>
                    </table>
                    </div>
                </div>

        </div>
     </main>
     <Footer/>
     </div>
  )
}
