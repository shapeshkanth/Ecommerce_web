import Navbar from "../components/Navbar"
import PageTitle from "../components/PageTitle"
import { Sidebar } from "./Sidebar"
import Footer from '../components/Footer'
import { ChevronLeft, ChevronRight, Edit, Star, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { adminGetProducts } from "../features/admin/adminSlice"

export const AllUserReviews = () => {
  const {success,products,loading,productCount,resultPerPage,deleting} = useSelector((state)=>state.admin);
  const dispatch = useDispatch();
  const [currentPage,setCurrentPage]=useState(1);

    const totalPages=Math.ceil(productCount/resultPerPage);
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

                     <div className='flex flex-col sm:flex-row items-center justify-between px-8 py-6 bg-gray-50/50 border-t border-gray-100 gap-4'>
                  <p className='text-xs text-gray-500 font-medium order-2 sm:order-1'>
                    Showing <span className='font-bold text-gray-700'>{products.length}</span> of <span className='font-bold text-gray-700'>{productCount}</span>
                  </p>
                  <div className='flex items-center gap-3 gap-3 order sm:order-2'>
                    <button disabled={currentPage===1} onClick={()=>{setCurrentPage(currentPage-1)}} className='flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-xs font-bold hover:bg-gray-50 hover:border-indigo-200 disabled:opacity-5 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95'> 
                      <ChevronLeft size={14}/> 
                      Previeus
                    </button>
                    <div className='flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm'>
                      <span>{currentPage}/{totalPages}</span>
                     
                      </div>
                    <button disabled={currentPage >= totalPages} onClick={()=>setCurrentPage(currentPage+1)} className='flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-xs font-bold hover:bg-gray-50 hover:border-indigo-200 disabled:opacity-5 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95'>
                      Next
                      <ChevronRight size={14}/>
                    </button>
                  </div>
                </div>
                </div>

        </div>
     </main>
     <Footer/>
     </div>
  )
}
