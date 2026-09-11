import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import { Sidebar } from './Sidebar'
import { ChevronLeft, ChevronRight, Edit, Trash2, Loader2, Users as UserIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetUsers, deleteUser} from '../features/admin/adminSlice'
import toast from 'react-hot-toast'

export const Users = () => {
    const dispatch = useDispatch();
    const {users,loading,userCount,userResultPerPage,deletingUsers, userTotalPages}=useSelector((state)=>state.admin);
    const [currentPage,setCurrentPage]=useState(1);
    
   
    useEffect(()=>{
   dispatch(adminGetUsers(currentPage));
    },[dispatch,currentPage])


      const handleDelete = (UserId)=>{
      const isConfirmed = window.confirm("Are you sure you want to delete this User?")
      if(isConfirmed)
      {
        dispatch(deleteUser(UserId)).then((action) =>{

          if(action.type === "admin/deleteUser/fulfilled")
          {
            toast.success("User Deleted Successfully", {position: "top-center", autoClose:3000});
            if(users.length === 1 && currentPage > 1)
            {
              setCurrentPage(currentPage-1);
            }else{
              dispatch(adminGetUsers(currentPage));
            }
          }
        })
      }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
        <PageTitle title="Admin view users"/>
        <Navbar/>
        <main className='flex-1 flex overflow-hidden'>
          <Sidebar/>
          <div className='flex-1 overflow-y-auto p-6 md:p-10'>
            <div className='max-w-7xl mx-auto'>
              <div className='mb-10'>
                <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
                  <UserIcon className='text-indigo-600'/>
                  User Management
                </h1>
                <p className='text-gray-500 mt-2'>Manage and monitor all registered accounts</p>
              </div>
              <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                <div className='overflow-x-auto'>
                  <table className='w-full text-left border-collapse'>
                    <thead className='bg-gray-50/80 backdrop-blur-sm border-b border-gray-200'>
                      <tr>
                        <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Users</th>
                        <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Role</th>
                        <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Contact</th>
                        <th className='px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wide'>Action</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                        <tr>
                          <td colSpan="4" className='px-6 py-20 text-center text-gray-400 font-medium '>
                            <div className='flex flex-col items-center gap-2'>
                              <div className='w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin'>
                               
                              </div>
                               Loading Users...
                            </div>
                          </td>
                        </tr>
                      ) : users.length===0 ? (
                      <tr>
                        <td colSpan="4" className='px-6 py-20 text-center text-gray-400 font-medium'>
                          No Users Found
                        </td>

                      </tr>
                      ) : (users.map((user)=>(
                     <tr key={user._id} className='hover:bg-indigo-50/30 transition-colors duration-200'>
                          <td className='px-6 py-4'>
                            <div className='flex items-center gap-4'>
                              <div className='h-12 w-12 rounded-full border border-gray-100 overflow-hidden bg-gray-50 shrink-0'>
                                <img src={user?.avatar.url} alt={user.name} className='h-full w-full object-cover' />
                              </div>
                              
                              <p className='text-sm font-semibold text-gray-900 line-clamp-1 hover:text-indigo-600 transition-colors'>{user.name}</p>
                              
                            </div>
                          </td>
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                          
                          <span className={`px-2.5 py-1  rounded-full text-xs font-semibold ${user.role=="admin" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700" }`}>{user.role}</span> 
                          </td>
                          <td className='px-6 py-4 text-sm font-medium'>
                            {user.email}
                            
                          </td>
                          <td className='px-6 py-4 text-right'>
                            <div className='flex items-center justify-end gap-2'>
                              <Link to={`/user/${user._id}`} target="_blank" className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors' title='Edit User'>
                                 <Edit size={18}/>
                              </Link>
                              <button></button>
                               <button disabled={deletingUsers?.[user._id]} onClick={()=>handleDelete(user._id)} className={`p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors`} title='Edit User'>
                                {deletingUsers?.[user._id]
                                    ? <Loader2 size={18} className="animate-spin" />
                                    : <Trash2 size={18} />
                                }          
                              </button> 
                            </div>
                          </td>
                        </tr>
                      ))) }                  
                    </tbody>
                  </table>
                </div>
                <div className='flex flex-col sm:flex-row items-center justify-between px-8 py-6 bg-gray-50/50 border-t border-gray-100 gap-4'>
                  <p className='text-xs text-gray-500 font-medium order-2 sm:order-1'>
                         Showing{" "}
                          <span className='font-bold text-gray-700'>
                            {users.length}
                          </span>{" "}
                        of{" "}
                          <span className='font-bold text-gray-700'>
                            {userCount}
                          </span>
                  </p>
                  <div className='flex items-center gap-3 gap-3 order sm:order-2'>
                    <button disabled={currentPage===1} onClick={()=>{setCurrentPage(currentPage-1)}} className='flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-xs font-bold hover:bg-gray-50 hover:border-indigo-200 disabled:opacity-8 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95'> 
                      <ChevronLeft size={14}/>
                      Previeus
                    </button>
                    <div className='flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm'>
                      <span> {currentPage}/{userTotalPages}</span>
                     
                      </div>
                    <button disabled={currentPage >= userTotalPages} onClick={()=>setCurrentPage(currentPage+1)}  className='flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-xs font-bold hover:bg-gray-50 hover:border-indigo-200 disabled:opacity-5 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95'>
                      Next
                      <ChevronRight size={14}/>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
          </main>
    </div>
  )
}
