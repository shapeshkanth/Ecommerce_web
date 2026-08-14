import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './user/Register';
import ProductDetails from './pages/ProductDetails';
import { Products } from './pages/Products';
import Login from './user/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfile } from './features/user/userSlice';
import Profile from './user/Profile';
import UpdateProfile from './user/UpdateProfile'
import { ProtectedRoute } from './components/ProtectedRoute';
import { UpdatePassword } from './user/UpdatePassword';
import { ForgetPassword } from './user/ForgetPassword';
import { ResetPassword } from './user/ResetPassword';
import { Cart } from './cart/Cart';
import { Shipping } from './cart/Shipping';
import { OrderConfirm } from './cart/OrderConfirm';
import { Payment } from './cart/Payment';


const App = ()=>{

const {user,isAuthenticated} = useSelector((state)=>state.user)
const dispatch = useDispatch();
useEffect(()=>{
if(isAuthenticated)
{
dispatch(getProfile())

}
},[isAuthenticated])

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/register" element={<Register/>}/> 
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile/update" element={<ProtectedRoute element={<UpdateProfile/>}/>   }/>
        <Route path="/profile" element={<ProtectedRoute element={<Profile/>}/>}/>
        <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword/>}/>}/>
        <Route path="/password/forget" element={<ForgetPassword/>}/>
        <Route path="/resetPassword/:token" element={<ResetPassword/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/shipping" element={<ProtectedRoute element={<Shipping/>}/>}/>
        <Route path="/order/confirm" element={<ProtectedRoute element={<OrderConfirm/>}/>}/>
         <Route path="/process/payment" element={<ProtectedRoute element={<Payment/>}/>}  />

      </Routes>
    </BrowserRouter>
    
  )
}
export default App