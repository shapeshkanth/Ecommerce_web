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
import  UpdateProfile  from './user/UpdateProfile';

const App = ()=>{

const {user,isAuthenticated} = useSelector((state)=>state.user)
const dispatch = useDispatch();
useEffect(()=>{
if(isAuthenticated)
{
  dispatch(getProfile())
}
},[dispatch])

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
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/update/profile" element={<UpdateProfile/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}
export default App