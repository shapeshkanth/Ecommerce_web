import { Link } from 'react-router-dom'
const Navbar = ()=>{
    return(
        <nav className='sticky top-0 w-full bg-white shadow-md z-50' >
            <div className='flex items-center max-w-7xl mx-auto px-4 bg-green-100 h-16 justify-between'>
                <Link to="/" className='flex gap-1 text-2xl font-bold text-blue-600'>S<span>Gallery</span></Link>
            <div className='hidden md:flex gap-4'>
                <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">Home</Link>
                <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">About-us</Link>
                <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">Contact-us</Link>
                <Link className='text-gray-700 hover:text-blue-400 transition font-semibold' to="/">Register</Link>
            </div>
            <div>
                <form className='hidden sm:flex border border-slate-300 rounded-md'>
                    <input className='px-3 py-1 text-sm w-40 focus:outline-none' type='text' placeholder='Search product..'/>
                    <button>Search</button>
                </form>
            </div>
            </div>
        </nav>
    )
}
export default Navbar