import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Sidebar } from './Sidebar'
import { ClipboardList, PackageCheck, PackageX, ShoppingBag, Star, TrendingUp, Users } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import toast  from "react-hot-toast"
import { adminGetAllReviews, adminGetProducts, adminGetUsers, getAllOrder, removeErrors, removeSuccess } from '../features/admin/adminSlice'



export const Dashboard = () => {

  const dispatch = useDispatch();
  const {error,orders,totalAmount,outOfStock,productCount,loading,users,reviews} = useSelector((state)=>state.admin);

  useEffect(()=>{
    if(error)
    {
      toast.error(error,{position:"top-center",autoClose:3000});
      dispatch(removeErrors());
    }
  dispatch(getAllOrder());
  dispatch(adminGetProducts());
  dispatch(adminGetUsers());
  dispatch(adminGetAllReviews());
  dispatch(removeSuccess());
  },[dispatch])

  const DirhamIcon = ({ size = 24 }) => (
  <span
    style={{
      fontSize: size,
      fontWeight: "bold",
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "center",
    }}
  >
    AED
  </span>
);

const stats = [{
  title:"Total Revenue",
  value: `${totalAmount?.toFixed(2) || 0}`,
  icons:<DirhamIcon size={20} />,
  bg:"bg-amber-50 text-amber-600",
  border:"border-amber-100"
},
{
  title:"Total Order",
  value:`${orders?.length || 0}`,
  icons:<ClipboardList size={20}/>,
  bg:"bg-purple-50 text-purple-600",
  border:"border-purple-100"
},
{
  title:"Products",
  value:`${productCount || 0}`,
  icons:<ShoppingBag size={20}/>,
  bg:"bg-indigo-50 text-indigo-600",
  border:"border-indigo-100"
},
{
  title:"Active Users",
  value: `${users.length || 0}`,
  icons:<Users size={20}/>,
  bg:"bg-indigo-50 text-indigo-600",
  border:"border-indigo-100"
},
{
  title:"In Stock",
  value:`${productCount-outOfStock || 0}`,
  icons:<PackageCheck size={20}/>,
  bg:"bg-blue-50 text-blue-600",
  border:"border-blue-100"
},
{
  title:"Out of stock",
  value:`${outOfStock || 0}`,
  icons:<PackageX size={20}/>,
  bg:"bg-rose-50 text-rose-600",
  border:"border-rose-100"
},
{
  title:"Total Reviews",
  value:`${reviews?.length || 0}`,
  icons:<Star size={20}/>,
  bg:"bg-orange-50 text-orange-600",
  border:"border-orange-100"
}];

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
                 <p className='text-sm text-gray-500 font-medium mt-1'>
                  Real-time statistic for your store
                 </p>
                 
                </div>
              </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
                  {stats.map((stat,index)=>(
                        <div key={index} className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow'>
                          <div className={`flex items-center gap-4 ${stat.border}`}>
                            <div>
                               <div className={`p-3 rounded-xl ${stat.bg} shrink-0`}>{stat.icons}</div>
                            </div>
                            <div className='flex flex-col'>
                              <span className='text-[11px] font-bold text-gray-400 uppercase tracking-wider'>{stat.title}</span>
                              <span className='text-xl font-bold text-gray-900 mt-0.5'>{stat.value}</span>
                            </div>
                          </div>
                        </div>
                  ))}
                </div>
              <div className='bg-indigo-50 border border-indigo-100 rounded-2xl p-9 flex flex-col md:flex-row items-center justify-between gap-6'>
                <div className='text-center md:text-left'>
                  <h2 className='text-lg font-bold text-indigo-900'> Your store is dooing great!</h2>
                  <p className='text-sm text-indigo-600 mt-1 font-medium'>keep monitoring these stats to optimize your business operations.</p>
                </div>
                <div className='flex gap-4'>
                  <div className='h-12 w-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-50'>
                    <TrendingUp size={24}/>

                  </div>
                </div>

              </div>

            </div>
          </div>   
        </main>
        <Footer/>
    </div>
  )
}
