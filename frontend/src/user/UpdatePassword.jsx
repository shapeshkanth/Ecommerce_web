import React from 'react'
import Navbar from '../components/Navbar'

export const UpdatePassword = () => {
  return (
    <>
    <Navbar/>
    <div className='min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm'>Update Password</h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white py-10 px-6 shadow-xl rounded-2xl sm:px-10 border border-gray-100'>
                <form className='space-y-3'>
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 ml-1'>Old Password</label>
                        <div>
                            <input type="password" placeholder='Enter old password' required className='appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'/>
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 ml-1'>New Password</label>
                        <div>
                            <input type="password" placeholder='Enter new password' required className='appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'/>
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 ml-1'>Confirm Password</label>
                        <div>
                            <input type="password" placeholder='Enter confirm password' required className='appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all'/>
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
