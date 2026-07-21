import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../features/products/productSlice'
import toast from 'react-hot-toast'
import Loading from '../components/Loading'
import Product from '../components/Product'
import { Pagination } from '../components/Pagination'

export const Products = () => {
 const dispatch = useDispatch()
 const [Heading, setHeading] = useState("All Product")
 const {products, loading, error,Totalproduct } = useSelector((state)=>state.product)
 useEffect(()=>{
    dispatch(getProduct())
 },[dispatch]);

 useEffect(()=>{
    if(error)
    {
        toast.error(error.message);
        dispatch(reportError())
    }
 },[dispatch,error])
  return loading? (<Loading/>): (
    <>
    <div className='flex flex-col min-h-screen bg-gray-50'>
        <PageTitle title={"Products"}/>
        <Navbar/>
        <main className='grow  container mx-auto px-4 py-8'>
            <div className='flex flex-col md:flex-row '>
                <aside className='w-full md:w-1/4'>
                    <div className='bg-white p-6 mr-5 rounded-lg shadow-sm sticky top-24'>
                        <h3 className='text-xl font-bold mb-4 text-gray-800 border-b border-slate-200 pb-2'>Categories</h3>
                        <ul className='space-y-2'>
                            {["Electrinics", "Fashion", "Home Decor", "Books"].map((categorie,index)=>(
                                <li key={index}>
                                    <button className='text-gray-600 hover:text-blue-600 transition-colors font-semibold' onClick={()=>setHeading(categorie)} >{categorie}</button>
                                </li>
                            ))}
                        </ul>
                        
                    </div>
                </aside>
                <section className='w-full md:w-3/4'>
                    <div className='flex justify-between items-center mb-6'>
                        <h3 className='text-xl font-semibold mb-4 text-gray-800 border-b border-slate-200 pb-2'>{Heading}</h3>
                        <span className="text-gray-500 text-sm">{Totalproduct || 0} items found</span>
                    </div>

                   
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-6'>
                        {products && products.map((product,index)=><Product key={product._id} product={product}/>) }
                    </div>
                  
                   {products?.length===0 && (<div className='text-center py-20'>
                    <p className='text-gray-500 text-lg'>{`No product found`}</p>
                   </div>)}

                </section>              
            </div>
            <div className='mt-12 flex justify-center'>
                    <Pagination/>
            </div>
        </main>
        <Footer/>
    </div>
    </>
  )
}
