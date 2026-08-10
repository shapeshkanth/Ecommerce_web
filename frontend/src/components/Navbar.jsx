import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, ShoppingCart, User, X, Menu } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/user/userSlice'
const Navbar = ()=>{
    const [open, setOpen] = useState(false)
    const { isAuthenticated, user }  = useSelector((state)=>state.user) ;
    const {cartItems}= useSelector((state)=>state.cart)
    const [searchQuery, setSearchQuery]=useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [profileDropdownOpen,setProfileDropdownOpen] = useState(false)
   
    const handleSearch = (e)=>{
         e.preventDefault();
       if(searchQuery.trim())
       {
          navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
       }else{
           navigate("/products");
       }
       setSearchQuery("")
    }

    const handleLogout=()=>{
       dispatch(logout())
       navigate("/login")
    }
  
    return(
        <nav className='sticky top-0 w-full bg-white shadow-md z-50' >
            <div className='flex items-center max-w-7xl mx-auto px-4 bg-green-100 h-16 justify-between'>
    
              <Link to="/" className='flex gap-1 text-2xl font-bold text-blue-600'>
                <ShoppingBag className='w-9 h-9'/>
                <span>Gallery</span>
              </Link>
   
            <div className='hidden md:flex gap-5'>
                <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">Home</Link>
                <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/products">Products</Link>
                <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/About">About-us</Link>
                <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/Contact">Contact-us</Link>  
            </div>
            
    
            <div className='flex items-center gap-4'>
                <form onSubmit={handleSearch} className='hidden sm:flex border border-slate-300 rounded-md'>
                    <input className='px-3 py-1 text-sm w-40 focus:outline-none' type='text' placeholder='Search product..' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
                    <button type='submit' className='px-3 text-gray-500 hover:text-blue-600 transition'>
                        <Search size={18}/>
                    </button>
                </form>
                <Link to='/cart' className='relative'>
                <ShoppingCart/>
                <span className='absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold min-w-4 h-4 rounded-full flex items-center justify-center'>{cartItems.length}</span>
                </Link>
                
                {!isAuthenticated ? (
                    <div className='hidden sm:flex items-center gap-4'>
                        <Link to="/login" className='text-gray-700 hover:text-blue-600 transition font-semibold'> Login</Link>
                        <Link to='/register' className='hidden sm:flex gap-1 items-center bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 transition'>
                                        <User size={19}/>
                                        Register
                                    </Link>
                    </div>
               ) :(
                <div className='relative hidden sm:block'>
                    <button className='flex-items-center' onClick={()=>setProfileDropdownOpen(!profileDropdownOpen)}>
                        <img src={user?.avatar?.url} alt={user?.name} title={user?.name} className='h-10 w-10 rounded-full object-cover border border-blue-600' />
                    </button>
                    {profileDropdownOpen && (
                    <div className='absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50'>
                        <div className='px-4 py-3 border border-gray-100 bg-gray-50 '>
                            <p className='text-sm font-medium text-gray-900'>{user?.name}</p>
                            <p className='text-sm text-gray-500 truncate'>{user?.email}</p>
                        </div>
                        <div className='py-1'>
                            <Link to="/profile" onClick={()=>setProfileDropdownOpen(false)} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                              My Profile
                            </Link>
                            <Link to="/orders" onClick={()=>setProfileDropdownOpen(false)} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                            My Orders
                            </Link>
                            <Link to="/Settings" onClick={()=>setProfileDropdownOpen(false)} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                            Settings
                            </Link>
                        </div>
                        <div className='border border-gray-100 py-1'>
                            <button onClick={()=>{
                                 handleLogout();
                                 setProfileDropdownOpen(false)
                                 }} className='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'>
                              Logout
                            </button>
                        </div>
                    </div>
                )}
                </div>
               )}
               
               <div>
                    <button onClick={()=>setOpen(!open)} className='text-gray-700 md:hidden'>
                    {open ? <X/> : <Menu/>}  
                    </button>
                </div>
            </div>

            </div>
            <div className={`md:hidden overflow:hidden transition-all duration-300 ease-in-out ${open ? "max-h-[450px] opacity-100 translate-y-0 pointer-events-auto":"max-h-0 opacity-0 -translate-y-2 pointer-events-none"}`}>
                <div className='flex flex-col p-4 gap-4'>
                    <Link onClick={()=>setOpen(false)} className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">Home</Link>
                    <Link onClick={()=>setOpen(false)} className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/products">Products</Link>
                    <Link onClick={()=>setOpen(false)} className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/About">About-us</Link>
                    <Link onClick={()=>setOpen(false)} className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/Contact">Contact-us</Link>
                
                     {!isAuthenticated ? (
                    <div className='flex flex-col gap-4'>
                        <Link to="/login" onClick={()=>setOpen(false)} className='text-gray-700 hover:text-blue-600 transition font-semibold'> Login</Link>
                        <Link to='/register' onClick={()=>setOpen(false)} className='text-gray-700 hover:text-blue-600 transition font-semibold'>
                            Register
                        </Link>
                    </div>
               ):(
                <div className='flex flex-col gap-4 border-t border-gray-200 pt-4 mt-2'>
                    <div className='flex items-center gap-3'>
                        <img src={user?.avatar?.url} alt={user?.name} title={user?.name} className='h-10 w-10 rounded-full object-cover border border-blue-600' />         
                       <div>
                        <p className='text-sm font-medium text-gray-900'>{user?.name}</p>
                        <p className='text-sm text-gray-500 truncate'>{user?.email}</p>

                       </div>
                    </div>
                          <Link to="/profile" onClick={()=>setOpen(false)} className='text-gray-700 hover:text-blue-600 transition font-semibold'>
                              My Profile
                            </Link>
                            <Link to="/orders" onClick={()=>setOpen(false)} className='text-gray-700 hover:text-blue-600 transition font-semibold'>
                            My Orders
                            </Link>
                            <Link to="/Settings" onClick={()=>setOpen(false)} className='text-gray-700 hover:text-blue-600 transition font-semibold'>
                            Settings
                            </Link>

                            <button onClick={()=>{
                                 handleLogout();
                                 setOpen(false);
                                 }} className='text-left text-red-500 hover:text-red-600 transition  font-semibold'>
                              Logout
                            </button>
                </div>
               )}

                
                
                </div>
            </div>
            
        </nav>
    )
}
export default Navbar