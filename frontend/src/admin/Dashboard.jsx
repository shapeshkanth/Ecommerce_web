import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Sidebar } from './Sidebar'
import { TrendingUp } from 'lucide-react'

export const Dashboard = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'> 
        <PageTitle title="Admin Dashboard"/>
        <Navbar/>
        <main className='flex-1 flex overflow-hidden'>
          <Sidebar/>
          <div className='flex-1 overflow-y-auto p-6 md:p-8'>
            <div className='max-w-6xl mx-auto '>
              <div className='mb-10 flex items-center justify-between border-b border-gray-200 pb-6 '>
                <div>
                  <h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                    <TrendingUp size={24} className='text-indigo-600'/>
                    Dashboard Overview
                  </h1>
                 
                </div>
              </div>
              <div></div>
              <div></div>

            </div>
          </div>   
        </main>
        <Footer/>
    </div>
  )
}
