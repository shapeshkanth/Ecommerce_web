import React from 'react'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { removeErrors, removeSuccess, resetPassword } from '../features/user/userSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const ResetPassword = () => {
    const dispatch = useDispatch();
    const {error,loading,success,message}=useSelector((state)=>state.user);
    const navigate=useNavigate();
    const {token}=useParams()
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword] = useState("");


    useEffect(()=>{
     
        if(error)
        {
            toast.error(error,{position:"top-center",autoClose:3000})
            dispatch(removeErrors());
        }
        if(success)
        {
            toast.success("Password reset successfully",{position:"top-center",autoClose:3000});
            dispatch(removeSuccess());
            navigate("/login");
        }

    },[dispatch,error,success])
    const resetPasswordSubmit=(e)=>{
        e.preventDefault();
        if(password!==confirmPassword)
        {
            toast.error("password do not match",{position:"top-center",autoClose:3000});
            setPassword("");
            setConfirmPassword("");
            return;
            
        }
        const data={
            password,
            confirmPassword
        };

        dispatch(resetPassword({token,userData:data}))
    };
  return (
    <>
    <Navbar/>
    <PageTitle title="Reset Password"/>
    <div className='min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm'>
                Reset Password
            </h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg'>
             <form className='space-y-5' onSubmit={resetPasswordSubmit}>
                <div>
                    <label className='block text-sm font-semibold text-gray-700'> New Password</label>
                    <div className='mt-1'>
                       <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your new password' className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring focus:ring-indigo-500 focus:border-transparent outline-none transition-all'/>
                    </div>
                    
                </div>
                <div>
                    <label className='block text-sm font-semibold text-gray-700'>Confirm New Password</label>
                    <div className='mt-1'>
                       <input type="password" name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Enter your confirm new password' className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring focus:ring-indigo-500 focus:border-transparent outline-none transition-all'/>
                    </div>
                    
                </div>
                <button className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indogo-200 transition-all active:scale-[0.98]'>
                    Reset Password
                </button>
             </form>
            </div>
        </div>

    </div>
    </>
  )
}
