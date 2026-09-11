import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import { Sidebar } from './Sidebar'
import { ChevronLeft, UserIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { removeErrors, removeSuccess, updateUserRole } from '../features/admin/adminSlice'
import toast from 'react-hot-toast'

export const EditUser = () => {
    const dispatch = useDispatch()
    const {id} = useParams();
    const {loading,users,error,success}=useSelector((state)=>state.admin);
    const [role,setUserRole ]=useState("")

    const user = users?.find((user) => user._id === id);
   
    useEffect(()=>{
        if(user)
        {
            setUserRole(user.role);
        }
    },[user]);
   useEffect(()=>{
    if(success)
    {
        toast.success("User role updated successfully",{position:"top-center",autoClose:3000});
        dispatch(removeSuccess());
        return;
    }

    },[success]);
useEffect(()=>{
    if(error)
    {
         toast.error(error,{position:"top-center",autoClose:3000});
        dispatch(removeErrors());
        return;
    }

   },[error,success]);


     const submitHandler = (e) => {
        e.preventDefault()
        if (!role) {
        return;
        }
        if(user?.role ===role )
        {
            return toast.error("Please select a different user role",{position:"top-center",autoClose:3000});
        }
   
    dispatch(updateUserRole({UserId: id,role}));
     }

  return (
   <div className='min-h-screen bg-gray-50 flex flex-col'>
        <PageTitle title="User Role Update"/>
        <Navbar/>
        <main className='flex-1 flex overflow-hidden'>
          <Sidebar/>
           <div className='flex-1 overflow-y-auto p-6 md:p-10'>
             <div className='mb-10'>
                 <Link to="/admin/users" className="flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-700 transition-colors mb-2">
                    <ChevronLeft size={16}/>
                    Back to products
                 </Link>
                <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
                  <UserIcon className='text-indigo-600'/>
                  Edit User Role
                </h1>
                <p className='text-gray-500 mt-2'>Update the role and permissions of the selected user</p>
              </div>
               <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow rounded-lg sm:px-10 border border-gray-100">
           <form  className="space-y-6" onSubmit={submitHandler}>
              <div className="flex flex-col items-center mb-6">
                <div className="w-28 h-28 mb-4">
                   <img src={user?.avatar?.url} alt="" className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 shadow-sm"/>
                
                </div>
                
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-gray-700 ml-1">User Role</label>
              
                    <select type="text" id="role" value={role}  onChange={(e) => setUserRole(e.target.value)} required  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-900 placeholder:text-gray-400">
                     {user?.role==="admin"?( <>
                       <option value="admin">admin</option>
                       <option value="user">user</option></>)
                        : (
                            <>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                            </>
                        )
                     }
                    
                     
                    </select>
                
              </div> 
              <div className="pt-2">
                <button disabled={loading} type="submit"  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md shadow-indigo-200 text-sm font-bold disabled:opacity-2 text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]">
                  {loading ? "Updating..." : "Update Role"}
                </button>
              </div>
           </form>
        </div>
      </div>

           </div>
        </main>
        </div>
  )
}
