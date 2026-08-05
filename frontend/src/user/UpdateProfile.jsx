import {useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeErrors, removeSuccess, updateProfile } from "../features/user/userSlice";
import toast from "react-hot-toast";

 const UpdateProfile = () => {

  const {user,error,success,loading, isAuthenticated} =useSelector((state)=>state.user);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [avatar,setAvatar]=useState("");
  const [preview,setPreview]=useState("https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  const navigate = useNavigate();
  const dispatch = useDispatch()

useEffect(()=>{

},[isAuthenticated])

  useEffect(()=>{
   if(user)
   {
    setName(user.name);
    setEmail(user.email);

    if(user.avatar?.url)
    {
      setPreview(user.avatar.url)
    }}

    if(error)
    {
      toast.error(error,{position:"top-center",autoClose:3000})
      dispatch(removeErrors())
    }

    if(success)
    {
      toast.success("Profile Updated Successfully",{position:"top-center",autoClose:3000})
      
      navigate("/profile");
      dispatch(removeSuccess())
    }
  },[user,dispatch,error,success])

  const handleChange=(e)=>{
     const reader = new FileReader()
     reader.onload = ()=>{
      if(reader.readyState==2)
      {
          setPreview(reader.result)
          setAvatar(reader.result)
      }
     }
     reader.readAsDataURL(e.target.files[0])
  }

  const updateProfileSubmit = (e)=>{
     e.preventDefault();
     const myform = new FormData();
     myform.set("name",name);
     myform.set("email",email);

     if(avatar)
     {
      myform.set("avatar",avatar);
     }
     dispatch(updateProfile(myform));
  }
  
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24">

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Update Profile</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow rounded sm:px-10 border border-gray-100">
           <form encType="multipart/form-data" className="space-y-6" onSubmit={updateProfileSubmit}>
              <div className="flex flex-col items-center mb-6">
                <div className="w-28 h-28 mb-4">
                   <img src={preview} alt="" className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 shadow-sm"/>
                
                </div>
                 <label className="block bg-indigo-50 text-indigo-700 px-4  py-2 rounded-lg font-semibold text-sm cursor-pointer hover:bg-indigo-100 transition">
                     change photo
                     <input name="avatar" type="file" accept="image/*" className="hidden" onChange={handleChange}/>
                 </label>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 ml-1">Name</label>
                <div className="mt-1">
                  <input type="text" name="name" value={name} id="name" onChange={(e)=>setName(e.target.value)} required className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"/>
                </div>
              </div> 
               <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 ml-1">Email address</label>
                <div className="mt-1">
                  <input type="email" name="email" value={email} id="email" onChange={(e)=>setEmail(e.target.value)} required className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"/>
                </div>
              </div> 
              <div className="pt-2">
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md shadow-indigo-200 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]">
                  Update
                </button>
              </div>
           </form>
        </div>
      </div>
    </div>
    </>
  )
}


export default UpdateProfile;