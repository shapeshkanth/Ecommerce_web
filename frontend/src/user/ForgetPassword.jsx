import React from 'react'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'

export const ForgetPassword = () => {
  return (
    <>
    <Navbar/>
    <PageTitle title="Forget Password"/>
    <div className='min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm'>
            Forget Password
        </h2>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                <form className='space-y-5'>
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 ml-1'>Email Address</label>
                        <input type="email" placeholder='hello@example.com' className='mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all'/>
                    </div>
                    <button className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indogo-200 transition-all active:scale-[0.98]'>
                        Send reset link
                    </button>
                </form>
            </div>
        </div>

      </div>
    </div>
    </>
  )
}
