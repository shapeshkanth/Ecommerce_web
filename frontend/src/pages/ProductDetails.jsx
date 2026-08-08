import PageTitle from "../components/PageTitle"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Rating from "../components/Rating"
import { useSelector, useDispatch } from "react-redux"
import { Calendar, MessageSquare, Minus, PackageCheck, PackageX, Plus, ShoppingCart } from "lucide-react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getProductDetails, removeErrors } from "../features/products/productSlice"
import Loading from "../components/Loading"
import toast from "react-hot-toast"
import { calculateDiscount, formatDate } from "../utils/formatter"
import { useState } from "react"


const ProductDetails = () => {
    const dispatch = useDispatch();
    const {product, error, loading} = useSelector((state)=>state.product);
    const {userRating,setUserRating} = useState(0)
    const [quantity, setQuantity]=useState(1);
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


const increaseQuantity=()=>{
    if(product.stock>quantity)
    {
        setQuantity(quantity+1);
    }
 
}
const decreaseQuantity=()=>{
if(quantity>1)
{
  setQuantity(quantity-1)
}
}

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
                        <button onClick={decreaseQuantity} className="p-4 hover:bg-gray-50 hover:text-amber-500 transition-colors">
                            <Minus size={18}/>
                        </button>
                        <span className="w-10 text-center font-bold text-gray-80000">
                            {quantity}
                        </span>
                        <button onClick={increaseQuantity} className="p-4 hover:bg-gray-50 hover:text-amber-500 transition-colors">
                            <Plus size={18}/>
                        </button>
                    </div>
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-100 active:scale-95 ">
                                <ShoppingCart/>
                                Add to Cart
                            </button>
                </div>)}
             </div>
             <form className="bg-slate-100 p-6 rounded-2xl border border-slate-100">
                <h3 className="flex items-center gap-2 text-md font-bold mb-4 text-slate-800 uppercase tracking-tight ">
                    <MessageSquare size={19} className="text-blue-500"/>
                    Share your feedback
                </h3>
                <div className="mb-4">
                    <Rating value={0} disabled={false} onRatingChange={(r)=>setUserRating(r)}/>
                </div>
                <textarea placeholder="How was the product quality and delivery.." className="w-full p-4 border-2 border-white focus:border-amber-300 focus-ring-0 outline-none min-h-24 text-sm bg-slate-50 rounded-xl shadow-sm transition-all"></textarea>
                <button className="nt-4 w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-slate-200">Post Review</button>

             </form>
            </div>
        
        </div>

        <section className="mt-20">
            <div>
                <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-amber-500 pl-4">
                Customer Feedbacks
                </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-2 ">
            {product?.reviews.map((review,index)=>(
                <div key={index} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:border-amber-100 transition-colors group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-gray-50 group-hover:ring-amber-50 transition-all">
                                    <img src={review?.avatar} alt={review?.name}  className="h-full w-full  object-cover"/>
                                </div>
                             <div>
                                <h4 className="font-bold text-gray-900 text-lg">{review?.name}</h4>
                                    <div className="mt-1">
                                    <Rating value={review?.rating} disabled={true}/>
                                    </div>
                             </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold px-3 py-2 bg-gray-100 rounded-full border border-gray-100">
                                <Calendar size={18} className="text-gray-500"/>
                                 {formatDate(review?.createdAt)}
                        </div>
                    </div>                 
             
                <p>"{review?.comment}"</p>
            </div>
            ))}
            </div>
        </section>
        </main>
        <Footer/>

    </div>
  )
)
}
export default ProductDetails