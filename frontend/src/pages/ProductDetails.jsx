import PageTitle from "../components/PageTitle"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Rating from "../components/Rating"
import { useSelector, useDispatch } from "react-redux"
import { Minus, PackageCheck, PackageX, Plus, ShoppingCart } from "lucide-react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getProductDetails, removeErrors } from "../features/products/productSlice"
import Loading from "../components/Loading"
import toast from "react-hot-toast"
import { calculateDiscount } from "../utils/formatter"


const ProductDetails = () => {
    const dispatch = useDispatch();
    const {product, error, loading} = useSelector((state)=>state.product);
    const { id } = useParams();
    useEffect(()=>{
        if(id)
        {
            dispatch(getProductDetails(id))
        }
    },[dispatch,id])

    useEffect(()=>{
        if(error)
        {
            toast.error(error.message)
            dispatch(removeErrors())
        }
    },[dispatch,error])
  return( loading?(<Loading/>):(
    <div className="min-h-screen bg-gray-50">
        <PageTitle title={`${product?.name} | Details`}/>
        <Navbar/>
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8">
            <div>
                <div className="aspect-square overflow-hidden rounded-xl">
                    <img src={product?.image[0].url} alt={product?.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" title={product?.name} />
                </div>
            </div>
            <div className="flex flex-col">
                <h3 className="text-3xl font-semibold text-gray-900 mb-2">{product?.name}</h3>
                <div className="flex items-center gap-4 mb-4">
                    <Rating value={product?.rating} disabled={true}/>
                    <span className="text-sm text-gray-500 font-medium">({product?.numOfReviews} Reviews)</span>
                </div>
                <div className="mb-6 flex items-baseline gap-3">
                    <span className="text-4xl font-semibold text-amber-500">AED {product?.price}</span>
                    <span className="text-lg text-gray-400 line-through">AED {product?.mrp}</span>
                    <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{calculateDiscount(product?.price,product?.mrp)}% OFF</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  {product?.description}
                </p>
                <div className="border-t border-gray-100 pt-8 mb-8">
                    <div className="flex items-center gap-2 mb-6">
                        {product?.stock > 0 ?(<>
                        <PackageCheck className="text-green-600 w-5 h-5"/>
                        <span className="text-green-700 font-semibold text-sm">In Stock ({product?.stock} Available) </span> </>) : <>
                        <PackageX className="text-red-600 w-5 h-5"/>
                        <span className="text-red-700 font-semibold text-sm">Out of Stock</span> 
                        </>
                        }
                    
                    </div>
                {product?.stock>0 && (<div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center border-2 border-gray-100 rounded-xl bg-white overflow-hidden shadow-sm">
                        <button className="p-4 hover:bg-gray-50 hover:text-amber-500 transition-colors">
                            <Minus size={18}/>
                        </button>
                        <span className="w-10 text-center font-bold text-gray-80000">
                            1
                        </span>
                        <button className="p-4 hover:bg-gray-50 hover:text-amber-500 transition-colors">
                            <Plus size={18}/>
                        </button>
                    </div>
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-100 active:scale-95 ">
                                <ShoppingCart/>
                                Add to Cart
                            </button>
                </div>)}
             </div>
            </div>
        
           
        </div>
        </main>
        <Footer/>

    </div>
  )
)
}
export default ProductDetails