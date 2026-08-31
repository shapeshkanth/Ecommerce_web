import { AlignLeft, Box, ChevronLeft, ImageIcon, Loader2, Package, Plus, Tag, Upload, X } from "lucide-react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import PageTitle from "../components/PageTitle"
import { Sidebar } from "./Sidebar"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { createProduct, removeErrors, removeSuccess } from "../features/admin/adminSlice"


export const CreateProduct = () => {
    const categories = ["Dress","Electronics","Kitchen Tools", "Clothing", "Sports",];
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {loading,success,error}=useSelector((state)=>state.admin);

    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [mrp,setMrp]=useState("");
    const [description,setDescription]=useState("");
    const [stock,setStock]=useState("");
    const [category,setCategory] = useState("")
    const [image,setImage]=useState([]);
    const [imagePreview,setImagePreview]=useState([]);

    const createProductImageChange= (e)=>{
        const files = Array.from(e.target.files);
        files.forEach((file)=>{
            const reader = new FileReader();
            reader.onload = ()=>{
                if(reader.readyState==2)
                {
                    setImagePreview((old)=>[...old,reader.result]);
                    setImage((old)=>[...old,reader.result]);
                }
            };
            reader.readAsDataURL(file)
        })
    }
    
    const removeImage = (index)=>{
        const filteredPreview = imagePreview.filter((_,ind)=>ind!==index);
        const filteredImage = image.filter((_,ind)=>ind!==index);
        setImage(filteredImage);
        setImagePreview(filteredPreview)
    }

    const handleSubmit = (e)=>{
       e.preventDefault();
       if(image.length==0)
       {
        return toast.error("Please upload at lease one image ",{position:"top-center",autoClose:3000});
       }
       const myform = new FormData();
       myform.set("name",name);
       myform.set("price",price);
       myform.set("description",description);
       myform.set("category",category);
       myform.set("stock",stock);
       myform.set("mrp",mrp);

       image.forEach((image)=>{
         myform.append("image",image)
          });

          dispatch(createProduct(myform));
    }

    useEffect(()=>{
        if(error)
        {
            toast.error(error,{position:"top-center",autoClose:3000});
            dispatch(removeErrors());
        }

        if(success)
        {
            toast.success("New product added successfully",{position:"top-center",autoClose:3000});
            dispatch(removeSuccess());
            navigate("/admin/products");
        }

    },[dispatch,error,success])
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
        <PageTitle title="create Product"/>
        <Navbar/>
        <main className='flex-1 flex overflow-hidden'>
            <Sidebar/>
             <div className='flex-1 overflow-y-auto p-6 md:p-10'>
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <Link to="/admin/products" className="flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-700 transition-colors mb-2">
                            <ChevronLeft size={16}/>
                            Back to products
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <Plus className="text-indigo-600"/>
                                Create New Product
                            </h1>
                            <p className="text-gray-500 mt-1 text-sm">Add a new item to your store's catalog</p>
                        </div>
                    </div>
                    <form encType="multipart/form-data" onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 space-y-8">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Package size={16} className="text-gray-400"/>
                                Product Name
                            </label>
                            
                            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} required placeholder="eg. Premium Cotton T-Shirt" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"/>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <AlignLeft size={16} className="text-gray-400"/>
                                Detailed Description
                            </label>
                            
                            <textarea id="description" required rows={4} value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Speak more about your product" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="price" className="text-sm text-gray-700 flex items-center gap-2  font-semibold">
                                    <span className="text-gray-500">AED</span>
                                    Price
                                </label>
                                <input type="number" id="price" value={price} onChange={(e)=>setPrice(e.target.value)} required placeholder="0.00" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"/>

                            </div>
                            <div className="space-y-2">
                                <label htmlFor="mrp" className="text-sm text-gray-700 flex items-center gap-2  font-semibold">
                                    <span className="text-gray-500">AED</span>
                                    MRP
                                </label>
                                <input type="number" id="mrp" value={mrp} onChange={(e)=>setMrp(e.target.value)} required placeholder="0.00" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"/>

                            </div>

                             <div className="space-y-2">
                                <label htmlFor="stock" className="text-sm text-gray-700 flex items-center gap-2  font-semibold">      
                                    <Box className="text-gray-500" size={16}/>
                                    Stock
                                </label>
                                <input type="number" id="stock" value={stock} onChange={(e)=>setStock(e.target.value)} required placeholder="eg. 25" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400"/>

                            </div>

                            
                             <div className="space-y-2">
                                <label htmlFor="category" className="text-sm text-gray-700 flex items-center gap-2  font-semibold">      
                                    <Tag className="text-gray-500" size={16}/>
                                    Product Categories
                                </label>
                                <select type="text" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} required placeholder="eg. 25" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400">
                                <option value="">Select a Category</option>
                                {categories.map((item,index)=>(
                                    <option value={item} key={index}>{item}</option>
                                ))}
                                </select>

                            </div>

                        </div>
                        <div className="space-y-4">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <ImageIcon size={16} className="text-gray-400"/>
                            Product Image
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                              <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-2">
                                  <Upload size={24} className="text-gray-400"/>
                                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tigher text-center px-2">upload Images</span>
                                  <input type="file" id="image" name="image" accept="image/*" multiple className="hidden" onChange={createProductImageChange}/>
                              </label>

                              {imagePreview.map((img,index)=>(
                                  <div key={index} className="group relative aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50 ">
                                    <img src={img} alt={`Preview-${index}`} className="w-full h-full object-cover"/>
                                    <button type="button" onClick={()=>removeImage(index)} className="absolute top-1 right-1 p1 bg-white/90 shadow-sm rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={14}/>
                                    </button>
                                  </div>
                              ))} 
                          </div>
                        </div>
                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
                         <button type="submit" disabled={loading} className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
                            {loading ? <>
                            <Loader2 size={20} className="animate-spin"/>
                            Creating..
                            </> : "Create Product"}
                        </button>
                        </div>
                    </form>

                </div>
             </div>
        </main>
        <Footer/>

    </div>
  )
}
