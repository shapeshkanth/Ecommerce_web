import { Star } from "lucide-react"
import { Link } from "react-router-dom"

const Product = ({product}) => {
  return (
  
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transform overflow-hidden border border-slate-100">
        <Link to={`/product/${product._id}`} className="group block">
        
        <div className="h-56 overflow-hidden">
           <img src={product.image[0].url} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition" />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="lext-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        </div>
        <div className="px-4 pb-4 space-y-2">
              <div className="flex items-center gap-2 text-gray-500 font-semibold">
                  <Star size={20}></Star>
                  <span className="text-xs">({product.numOfReviews} reviews)</span>
              </div>
          <div className="flex items-center justify-between px-2 mt-2">
              <span className="text-blue-600 text-lg font-bold">
                AED {product.price}
              </span>
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition">
                Add to cart
              </button>
          </div>
        </div>
        </Link>
       
    </div>
  )
}

export default Product
