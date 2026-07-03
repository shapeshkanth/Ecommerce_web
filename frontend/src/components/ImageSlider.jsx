import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react"

const images = [
    "https://plus.unsplash.com/premium_photo-1683141052679-942eb9e77760?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1549206464-82c129240d11?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1757710436034-f1d7372ec1be?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]
const ImageSlider = () => {
    const [current,setCurrent] = useState(0);
    useEffect(()=>{
        const intervel = setInterval(()=>{
            setCurrent((prev)=>(prev+1)%images.length)
        },4000)

        return()=>clearInterval(intervel)
    },[])

    const prevSlide=()=>{
      setCurrent((prev)=>
        prev===0 ? images.length-1: prev-1
      )
    }
    const nextSlide=()=>{
    setCurrent((prev)=>(prev+1)%images.length)
    }
  return (
    <div className="relative w-full shadow-lg overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform:`translateX(-${current * 100}%)`}}>
            {images.map((image,index)=>
            <img src={image} key={index} className="h-75 w-full md:h-[450px] object-cover shrink-0"/>
            )}
            
        </div>
            <button onClick={prevSlide} className="absolute  left-4 top-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition">
                <ChevronLeft/>
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition">
                <ChevronRight/>
            </button>

            <div className="absolute flex bottom-4 left-1/2 -translate-x-1/2 gap-1">
                {images.map((_,index)=>(
                    <button key={index} onClick={()=>setCurrent(index)} className={`h-2 rounded-full transition-all ${current === index ? "w-6 bg-white" :"w-2 bg-gray-400"}`}></button>
                ))}
            </div>
    </div>
  )
}

export default ImageSlider