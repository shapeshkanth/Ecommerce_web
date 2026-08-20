import { useDispatch, useSelector } from 'react-redux'
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartItems } from './CartItems';
import { clearCart } from '../features/cart/cartSlice';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {

    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const {error,loading, success, cartItems, message}=useSelector((state)=>state.cart);
    const subTotal=cartItems.reduce((acc,item)=>acc+(item.price*item.quantity),0);
    const tax=Number((subTotal*0.05).toFixed(2));
    const shippingCharges=cartItems.length===0 ? 0: (subTotal>500 ? 0 : 50);
    const Total =subTotal+tax+shippingCharges;

    const checkoutHandler=()=>{
   navigate("/login?redirect=/shipping");
    }
  return (
    <>
    <PageTitle title={"Your cart"}/>
    <Navbar/>
    <main className='pt-20 pb-10 min-h-screen'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
             <div className='bg-white rounded-2xl shadow-lg p-6'>
               <h2 className='text-2xl font-bold text-slate-800 mb-6 flex justify-between'>
                 Your Cart
                <button onClick={()=>dispatch(clearCart())} className='text-red-500 hover:text-red-700 transition-colors flex items-center text-sm gap-2 '>
                       <Trash2/>Clear Cart
                </button>
                </h2>
               <div className='space-y-4'>
                  {cartItems.length===0 ? (
                    <div className='text-center py-12'>
                      <p className='text-gray-500'>
                        Your cart is empty
                      </p>
                    </div>
                  ):(
                    cartItems.map((item)=>(
                      <CartItems item={item} key={item.product}/>
                    ))
                  )}
               </div>
             </div>
          </div>
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-2xl shadow-lg p-6 sticky top-24'>
              <h2 className='text-2xl font-bold text-slate-800 mb-6'> Order Summary</h2>
              <div className='space-y-4'>
               <div className='flex justify-between'>
                <span className='text-gray-600'>Sub Total</span>
                <span className='font-bold'> AED {subTotal.toFixed(2)}</span>
               </div>

               <div className='flex justify-between'>
                <span className='text-gray-600'>Shipping</span>
                <span className='font-bold'> AED {shippingCharges.toFixed(2)}</span>
               </div>

               <div className='flex justify-between'>
                <span className='text-gray-600'>Tax (5%)</span>
                <span className='font-bold'> AED {tax.toFixed(2)}</span>
               </div>

               <div className='border-t border-gray-200 pt-4'>
                 <div className='flex justify-between'>
                  <span className='text-xl font-bold text-slate-800'>Total</span>
                  <span className='text-xl font-bold text-amber-600'> AED {Total.toFixed(2)}</span>
                 </div>
               </div>

              </div>
              <button onClick={checkoutHandler} className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition mt-5'>
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>

      </div>
        
    </main>
    <Footer/>
    </>
  )
}
