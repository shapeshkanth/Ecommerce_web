import PageTitle from "../components/PageTitle"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Rating from "../components/Rating"
import { Minus, PackageCheck, Plus, ShoppingCart } from "lucide-react"

const ProductDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        <PageTitle title="Product Name | Details"/>
        <Navbar/>
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8">
            <div>
                <div className="aspect-square overflow-hidden rounded-xl">
                    <img src="https://images.unsplash.com/photo-1726587912121-ea21fcc57ff8?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" />
                </div>
            </div>
            <div className="flex flex-col">
                <h3 className="text-3xl font-semibold text-gray-900 mb-2">iPhone 16 Pro Max</h3>
                <div className="flex items-center gap-4 mb-4">
                    <Rating value={4} disabled={true}/>
                    <span className="text-sm text-gray-500 font-medium">5 Reviews</span>
                </div>
                <div className="mb-6 flex items-baseline gap-3">
                    <span className="text-4xl font-semibold text-amber-500">AED 1500</span>
                    <span className="text-lg text-gray-400 line-through">AED 1900</span>
                    <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">15% OFF</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                   Latest Apple smartphone with A18 chip, advanced camera system, and titanium design.
                </p>
                <div className="border-t border-gray-100 pt-8 mb-8">
                    <div className="flex items-center gap-2 mb-6">
                    <PackageCheck className="text-green-600 w-5 h-5"/>
                    <span className="text-green-700 font-semibold text-sm">In Stock (5 Available) </span>
                    </div>
                <div className="flex flex-wrap items-center gap-4">
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
               </div>
             </div>
            </div>
        
           
        </div>
        </main>
        <Footer/>

    </div>
  )
}
export default ProductDetails