import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { removeErrors, removeSuccess, updatePassword } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

export const UpdatePassword = () => {

    const {loading,error,success} =useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [oldPassword, setOldPassword]=useState("");
    const [newPassword, setNewPassword]=useState("");
    const [confirmPassword, setConfimPassword]=useState("");


    useEffect(()=>{
        if(error)
        {
            toast.error(error,{position:"top-center",autoClose:3000});
            dispatch(removeErrors());
        }

        if(success)
        {
            toast.success("password updated successfully",{position:"top-center",autoClose:3000});
            dispatch(removeSuccess());
            navigate("/profile")
            
        }

    },[success,error,dispatch])




    const updatePasswordSubmit = (e)=>{
       e.preventDefault();
      if(newPassword!==confirmPassword)
      {
        toast.error("New password and confirm password does not match",{position:"top-center",autoClose:3000})
        return;
      }

      dispatch(updatePassword({oldPassword,newPassword,confirmPassword}));

     
    }
  return (
    <>
    <Navbar/>
    <div className='min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm'>Update Password</h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white py-10 px-6 shadow-xl rounded-2xl sm:px-10 border border-gray-100'>
                <form className='space-y-3' onSubmit={updatePasswordSubmit}>
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 ml-1'>Old Password</label>
                        <div>
                            <input type="password" placeholder='Enter old password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} required className='appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'/>
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 ml-1'>New Password</label>
                        <div>
                            <input type="password" placeholder='Enter new password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required className='appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'/>
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 ml-1'>Confirm Password</label>
                        <div>
                            <input type="password" placeholder='Enter confirm password' value={confirmPassword} onChange={(e)=>setConfimPassword(e.target.value)} required className='appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'/>
                        </div>
                    </div>
                    <div>
                        <button className='w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-3 px-4 rounded mt-2'>Change Password</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}
