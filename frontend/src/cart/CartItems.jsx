import { Minus, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCartItem, removeItemFromCart } from '../features/cart/cartSlice';

export const CartItems = ({item}) => {

  const dispatch = useDispatch();
  const [quantity,setQuantity]=useState(item.quantity)

  const increaseQuantity=()=>{
    if(item.stock>quantity)
    {
        setQuantity(quantity+1);
        dispatch(addToCartItem({id:item.product,quantity:quantity}));
    }

}
const decreaseQuantity=()=>{
    if(quantity>1)
    {
    setQuantity(quantity-1)
    dispatch(addToCartItem({id:item.product,quantity:quantity}));
    }
}


  return (
    <div key={item.product} className='flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50'>
      <img src={item.image} alt={item.name} className='w-20 h-20 rounded-lg object-cover'/>
      <div className='flex-1'>
        <h3 className='font-bold text-slate-800'>{item.name}</h3>
        <p className='text-sm text-gray-500 truncate max-w-[200px] '>{item.description}</p>
        <p className='font-bold text-amber-600 mt-2'>AED {item.price}</p>
        <p className='text-sm text-gray-500'>AED {item.price} X {item.quantity} = AED {item.price * item.quantity}</p>
      </div>
      <div className='flex items-center gap-2'>
        <button onClick={decreaseQuantity} className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors'>
          <Minus/>
        </button>
        <span className='w-5 text-center font-bold'>{item.quantity}</span>
        <button onClick={increaseQuantity} className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors'>
          <Plus/>
        </button>
      </div>
      <button onClick={()=>dispatch(removeItemFromCart(item.product))} className='text-red-500 hover:text-red-700 transition-colors hover:scale-[98%]'>
        <Trash2/>
      </button>
    </div>
  )
}
