import { Phone , Mail} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, } from "react-icons/fa"

const Footer = () => {
  return<footer className="bg-gray-900 text-gray-200 mt-8">
<div  className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-center md:text-left py-5">
    <div className="flex-1 min-w-62" >
        <h3 className="text-xl font-semibold mb-4 text-white">Contact us</h3>
        <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-2"><Phone size={18}/> Phone : +971 554785246</p>
        <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-2"><Mail size={18}/> Email : ShopGallery@gmail.com</p>
    </div>
    <div className="flex-1 min-w-62 items-center gap-4" >
        <h3 className="text-xl font-semibold mb-4 text-white">Follow us</h3>
        <div className="flex gap-4 items-center justify-center md:justify-start">
           <a href="#">
                <FaGithub size={18} className="w-7 h-7 text-gray-400 transition-transform duration-300 hover:text-blue-300"/>
            </a>
   
            <a href="#">
                <FaLinkedin size={18} className="w-7 h-7 text-blue-400 transition-transform duration-300 hover:text-blue-500"/>
            </a>
           
            <a href="">
                <FaInstagram size={18} className="w-7 h-7 text-pink-400 transition-transform duration-300 hover:text-pink-500"/>
            </a> 
        </div>

    </div>
    <div className="flex-1 min-w-62">
        <h3 className="text-xl font-semibold mb-4 text-white">About</h3>
        <p className="text-gray-400 leading-relaxed"> ShopGallery makes online shopping simple, secure, and affordable for everyone.</p>
        
    </div>
</div>
<div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
   © 2026 ShopGallery. All Rights Reserved.
</div>
  </footer>
}

export default Footer; 