import { Link } from 'react-router-dom'
import { Search, ShoppingBag, ShoppingCart, User, X, Menu } from 'lucide-react'
import { useState } from 'react'
const Navbar = ()=>{
    const [open, setOpen] = useState(false)
    const isAuthenticated = true ;
    return(
        <nav className='sticky top-0 w-full bg-white shadow-md z-50' >
            <div className='flex items-center max-w-7xl mx-auto px-4 bg-green-100 h-16 justify-between'>
    
              <Link to="/" className='flex gap-1 text-2xl font-bold text-blue-600'>
                <ShoppingBag className='w-9 h-9'/>
                <span>Gallery</span>
              </Link>
   
            <div className='hidden md:flex gap-5'>
                <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">Home</Link>
                <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">Products</Link>
                <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">About-us</Link>
                <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">Contact-us</Link>  
            </div>
            
    
            <div className='flex items-center gap-4'>
                <form className='hidden sm:flex border border-slate-300 rounded-md'>
                    <input className='px-3 py-1 text-sm w-40 focus:outline-none' type='text' placeholder='Search product..'/>
                    <button className='px-3 text-gray-500 hover:text-blue-600 transition'>
                        <Search size={18}/>
                    </button>
                </form>
                <Link to='/cart' className='relative'>
                <ShoppingCart/>
                <span className='absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold min-w-4 h-4 rounded-full flex items-center justify-center'>6</span>
                </Link>
                
                {!isAuthenticated && (<Link className='hidden sm:flex gap-1 items-center bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 transition'>
                                        <User size={19}/>
                                        Register
                                    </Link>
               )}
               <div>
                    <button onClick={()=>setOpen(!open)} className='text-gray-700 md:hidden'>
                    {open ? <X/> : <Menu/>}  
                    </button>
                </div>
            </div>

            </div>
            <div className={`md:hidden overflow:hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100 tanslate-y-0":"max-h-0 opacity-0 -translate-y-2"}`}>
                <div className='flex flex-col p-4 gap-4'>
                    <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">Home</Link>
                    <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">Products</Link>
                    <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">About-us</Link>
                    <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">Contact-us</Link>
                </div>
            </div>
            
        </nav>
    )
}
export default Navbar