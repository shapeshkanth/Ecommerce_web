import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './user/Register';
import ProductDetails from './pages/ProductDetails';
import { Products } from './pages/Products';
import { Login } from './user/Login';

const App = ()=>{
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
      </Routes>
    </BrowserRouter>
    
  )
}
export default App