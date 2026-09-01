import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Sidebar } from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetProducts, deleteProduct, removeSuccess } from '../features/admin/adminSlice'
import { ChevronLeft, ChevronRight, Edit, Loader2, Trash2, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export const ProductList = () => {
 
  const {success,products,loading,productCount,resultPerPage,deleting} = useSelector((state)=>state.admin);
  const dispatch = useDispatch();
  const [currentPage,setCurrentPage]=useState(1);
  



  useEffect(()=>{
   dispatch(adminGetProducts(currentPage));
  },[dispatch,currentPage])

  useEffect(()=>{
    if(success){
        dispatch(removeSuccess());
    }
    
  },[dispatch,success])

  const totalPages=Math.ceil(productCount/resultPerPage);

   const handleDelete = (productId)=>{
      const isConfirmed = window.confirm("Are you sure you want to delete this product?")
      if(isConfirmed)
      {
        dispatch(deleteProduct(productId)).then((action) =>{
          if(action.type === "admin/deleteProduct/fulfilled")
          {
            toast.success("Product Deleted Successfully", {position: "top-center", autoClose:3000});
            if(products.length===1 && currentPage > 1)
            {
              setCurrentPage(currentPage-1);
            }else{
              dispatch(fetchAdminProducts(currentPage));
            }
          }
        })
      }
  }
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
        <PageTitle title="Admin Dashboard"/>
        <Navbar/>
        <main className='flex-1 flex overflow-hidden'>
          <Sidebar/>
          <div className='flex-1 overflow-y-auto p-6 md:p-10'>
            <div className='max-w-7xl mx-auto'>
              <div className='mb-10'>
                <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
                  <TrendingUp className='text-indigo-600'/>
                  All Products
                </h1>
                <p className='text-gray-500 mt-2'>Manage all the products in your store</p>
              </div>
              <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                <div className='overflow-x-auto'>
                  <table className='w-full text-left border-collapse'>
                    <thead className='bg-gray-50/80 backdrop-blur-sm border-b border-gray-200'>
                      <tr>
                        <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Product</th>
                        <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Price</th>
                        <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Stock</th>
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
                        </tr>
                      ) : products.length===0 ? (
                      <tr>
                        <td colSpan="4" className='px-6 py-20 text-center text-gray-400 font-medium'>
                          No Products Found
                        </td>

                      </tr>
                      ) : (products.map((product)=>(
                        <tr key={product._id} className='hover:bg-indigo-50/30 transition-colors duration-200'>
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
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                            AED {product.price.toLocaleString()}
                          </td>
                          <td className='px-6 py-4 text-sm font-medium'>
                            <span className={`px-2.5 py-1  rounded-full text-xs font-semibold ${product.stock==0 ? "bg-rose-100 text-rose-700":product.stock<10 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700" }`}>{product.stock===0?"Out of stock" : product.stock < 10 ? `Low stock: ${product.stock}`: `In stock: ${product.stock}`}</span>
                          </td>
                          <td className='px-6 py-4 text-right'>
                            <div className='flex items-center justify-end gap-2'>
                              <Link to={`/admin/product/${product._id}`} className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors' title='Edit Product'>
                                 <Edit size={18}/>
                              </Link>
                              <button disabled={deleting?.[product._id]} onClick={()=>handleDelete(product._id)} className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors' title='Edit Product'>
                                {deleting?.[product._id] ? <Loader2 size={18} className='animate-spin'/> :  <Trash2 size={18}/> }
                                   
                              </button>
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

          </div>
        </main>
        <Footer/>
    </div>
  )
}
