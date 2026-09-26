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
import { PaymentSuccess } from './cart/PaymentSuccess';
import { MyOrders } from './orders/MyOrders';
import { OrderDetails } from './orders/OrderDetails';
import { Dashboard } from './admin/Dashboard';
import { ProductList } from './admin/ProductList';
import { CreateProduct } from './admin/createProduct';
import { UpdateProduct } from './admin/UpdateProduct';
import { Users } from './admin/Users';
import { EditUser } from './admin/EditUser';
import { Orders } from './admin/Orders';
import { EditOrder } from './admin/EditOrder';




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
        <Route path="/shipping" element={<ProtectedRoute element={<Shipping/>} cartRequired={true}/>}/>
        <Route path="/order/confirm" element={<ProtectedRoute element={<OrderConfirm/>} cartRequired={true}/>}/>
        <Route path="/process/payment" element={<ProtectedRoute element={<Payment/>} cartRequired={true}/>}  />
        <Route path="/PaymentSuccess" element={<ProtectedRoute element={<PaymentSuccess/>}/>}  />
        <Route path="/order/user" element={<ProtectedRoute element={<MyOrders/>}/>}/>
        <Route path="/order/:id" element={<ProtectedRoute element={<OrderDetails/>}/>}/>
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<Dashboard/>} adminOnly={true}/>}/>
        <Route path="/admin/products" element={<ProtectedRoute element={<ProductList/>} adminOnly={true}/>}/>
        <Route path="/admin/create/product" element={<ProtectedRoute element={<CreateProduct/>} adminOnly={true}/>}/>
        <Route path="/admin/product/:id" element={<ProtectedRoute element={<UpdateProduct/>} adminOnly={true}/>}/>
        <Route path="/admin/users" element={<ProtectedRoute element={<Users/>} adminOnly={true}/>}/>
        <Route path='/admin/editUser/:id' element={<ProtectedRoute element={<EditUser/>} adminOnly={true}/>}/>
        <Route path='/admin/orders' element={<ProtectedRoute element={<Orders/>}  adminOnly={true}/>}/>
        <Route path='/admin/editOrderStatus/:id' element={<ProtectedRoute element={<EditOrder/>} adminOnly={true}/>}/>



      </Routes> 
    </BrowserRouter>
    
  )
}
export default App