import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';

const App = ()=>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Register" element={<Register/>}/> 
      </Routes>
    </BrowserRouter>
    
  )
}
export default App