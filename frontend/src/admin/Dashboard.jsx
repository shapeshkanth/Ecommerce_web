import React from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const Dashboard = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
        <PageTitle title="Admin Dashboard"/>
        <Navbar/>
        <main>
            
        </main>
        <Footer/>
    </div>
  )
}
