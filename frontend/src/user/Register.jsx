import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useSelector,useDispatch } from "react-redux"
import { register, removeErrors, removeSuccess } from "../features/user/userSlice"

const Register = ()=>{
   
    const [preview, setPreview] = useState("https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
    const [user, setUser] = useState({name:"",email:"",password:""})
    const{name,email,password} = user;
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading,error,success} = useSelector((state)=>state.user)
    const[avatar, setAvatar] = useState("")

    const handleChange = (e)=>{
   if(e.target.name == "avatar")
   {
     const reader = new FileReader()
     reader.onload=()=>{
        if(reader.readyState===2)
        {
            setPreview(reader.result)
            setAvatar(reader.result)
         
        }
     }
     reader.readAsDataURL(e.target.files[0])
   }else{
    setUser({...user,[e.target.name]:e.target.value})
   }
    }

    const registerNow = (e)=>{
        e.preventDefault()
        if(!name || !email || !password)
        {
          toast.error("Please fill out all the required fields",{
            position:"top-center",autoClose:3000})
            return;
        }
      
    const myform = new FormData() 
    myform.set("name",name);
    myform.set("email",email);
    myform.set("password",password);
    myform.set("avatar",avatar);

    dispatch(register(myform))
    }

   useEffect(()=>{
    if(error)
    {
        toast.error(error,{position:"top-center",autoClose:3000});
        dispatch(removeErrors());
    }
   },[dispatch,error])

   useEffect(()=>{
   
    if(success)
    {
        toast.success("Registration SuccessFull", {position:"top-center",autoClose:3000});
        dispatch(removeSuccess())
        navigate("/login")
    }

   },[dispatch,success])



    return(
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
            <form encType="multypart/form-data" className="space-y-6" onSubmit={registerNow}>
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Create  Account</h2>
                    <p className="text-sm text-gray-500 mt-2">join us and start your journey</p>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1 block">Username</label>
                    <input placeholder="jone" type="name" value={name} name="name" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"/>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1 block">Email</label>
                    <input placeholder="hello@example.com" type="email" value={email} name="email" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1 block">Password</label>
                    <input placeholder="******" type="password" value={password} name="password" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"/>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                        <img id="preview" src={preview} alt="" className="h-12 w-12 object-cover border border-gray-400 rounded-full bg-gray-100 overide-hidden" />
                    </div>
                    <label className="block">
                        <span className="sr-only">Choose profile image</span>
                        <input type="file" name="avatar" accept="image/*" onChange={handleChange} id="" className="block text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                    </label>
                </div>
                <button className="w-full bg-indigo-600  hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg py-3 shadow-indigo-200 transition-all active:scale-[0.98]">{loading ? "Please wait.." : "Sign Up"}</button>
                <p>Already have an account ? <Link className="text-indigo-600 font-semibold hover:underline">Sign in here</Link></p>
            </form>
        </div>
    </div>
)
}

export default Register