import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer"
import ImageSlider from "../components/ImageSlider"
import Navbar from "../components/Navbar"
import PageTitle from "../components/PageTitle";
import Product from "../components/Product"
import { useEffect } from "react";
import { getProduct, removeErrors } from "../features/products/productSlice";
import Loading from "../components/Loading";
import toast from "react-hot-toast"



const Home = ()=>{

   const dispatch = useDispatch()
  const {products,loading,error} = useSelector((state)=>state.product)
  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch])
  useEffect(()=>{
    if(error)
    {
      toast.error(error.message);
      dispatch(removeErrors());
    }
  },[dispatch,error])
    return(
      loading?( <Loading/> ):(
        <>
        <PageTitle title={"Home"}/>
        <Navbar/>
        <ImageSlider/>
        <div className="mt-12 p-8 flex flex-col items-center justify-around text-gray-900">
             <h1 className="text-2xl font-semibold text-blue-700 pb-5">Latest Collections</h1>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product,index)=>
                  <Product key={index} product={product}/>
                 
                )}

             </div>
        </div>
        <Footer/>
        </>
      )
    
    )
    
}

export default Home