import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login, removeErrors, removeSuccess } from "../features/user/userSlice"
import  toast  from "react-hot-toast"


const Login = () => {
  
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {error, success, isAuthenticated, user, loading }=useSelector((state)=>state.user)
  const loginSubmit=(e)=>{
    e.preventDefault();
    dispatch(login({email,password}))
    setEmail("");
    setPassword("")
  }

  useEffect(()=>{
    if(error)
    {
    toast.error(error,{position:"top-center",autoClose:3000})
    dispatch(removeErrors());
    }
  },[error,dispatch])

  useEffect(()=>{
  if(success)
  {
   toast.success("Login Successfully",{position:"top-center",autoClose:3000})
   dispatch(removeSuccess())
   navigate("/")
  }
  },[success,dispatch])

  return (
     <div className="bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
            <form onSubmit={loginSubmit} className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
                    <p className="text-sm text-gray-500 mt-2">Please enter your details to sign in</p>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1 block">Email</label>
                    <input placeholder="hello@example.com" type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1 block">Password</label>
                    <input placeholder="******" type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"/>
                </div>
               
                <button className="w-full bg-indigo-600  hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg py-3 shadow-indigo-200 transition-all active:scale-[0.98]">Login</button>
                <p>Don't have an account ? <Link to='/register' className="text-indigo-600 font-semibold hover:underline">Sign up here</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login