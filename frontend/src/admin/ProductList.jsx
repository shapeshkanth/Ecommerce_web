import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Sidebar } from './Sidebar'

export const ProductList = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'> 
        <PageTitle title="Admin Dashboard"/>
        <Navbar/>
        <main className='flex-1 flex overflow-hidden'>
          <Sidebar/>
          <div className='flex-1'>
          </div>   
        </main>
        <Footer/>
    </div>
  )
}
