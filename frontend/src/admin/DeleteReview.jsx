import { useEffect } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import { Sidebar } from './Sidebar'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Trash, Trash2, UserIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../features/products/productSlice'
import { deleteUserReview, removeSuccess } from '../features/admin/adminSlice'
import toast from 'react-hot-toast'

export const DeleteReview = () => {
  const {product,loading} = useSelector((state)=>state.product);
  const {reviewLoading,message} = useSelector((state)=>state.admin);
  const {id} = useParams();
  const dispatch = useDispatch();
  const ProductName = product?.name;
  const productId = product?._id;
  useEffect(()=>{
    dispatch(getProductDetails(id));
  },[dispatch])
  console.log(product)

  
      const handleDelete = (reviewId)=>{
        const isConfirmed = window.confirm("Are you sure you want to delete this Review?")
        if(isConfirmed)
        {
            dispatch(deleteUserReview({productId,reviewId})).then((action) =>{
            
                      if(action.type === "admin/deleteReview/fulfilled")
                      {
                        toast.success("Review successfully deleted",{position:"top-center",autoClose:3000});
                          
                          dispatch(getProductDetails(id));
                          dispatch(removeSuccess());
                      }

                    })
        }
    }


  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
        <PageTitle title="User review deleted"/>
        <Navbar/>
        <main className='flex-1 flex overflow-hidden'>
          <Sidebar/>
           <div className='flex-1 overflow-y-auto p-6 md:p-10'>
                <div className='mb-10'>
                                <Link to="/admin/allUserReview" className="flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-700 transition-colors mb-2">
                                    <ChevronLeft size={16}/>
                                    Back to reviews
                                </Link>
                                <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-3'>
                                    <UserIcon className='text-indigo-600'/>
                                    Delete User Review
                                </h1>
                                        <p className='text-gray-500 mt-2'> Delete the selected user review from the system</p>
                       <div className='mt-8 '>
                        {loading ? (
                        <div>
                          <div className='px-6 py-20 text-center text-gray-400 font-medium '>
                            <div className='flex flex-col items-center gap-2'>
                              <div className='w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin'>
                               
                              </div>
                               Loading reviews...
                            </div>
                          </div>
                        </div>) : product?.reviews.length===0 ? (
                       
                        <div  className='px-6 py-20 text-center text-gray-400 font-medium'>
                          No reviews Found
                        </div>

                      ) : (product?.reviews.map((review)=>(
                             <div key={review._id} className='mt-2 md:px-20 sm:w-full p-5 flex flex-col md:flex-row gap-5 md:gap-8 justify-between items-center rounded-lg border border-gray-200 shadow-md'>
                                <div>
                                    <div className='h-12 w-12 rounded-full border border-gray-100 overflow-hidden bg-gray-50 shrink-0'>
                                        <img src={review.avatar} alt="name" className='object-cover' />
                                    </div>
                                    <p className='text-base capitalize text-gray-600 font-semibold mt-2'>{review.name}</p>
                                </div>          
                                <div className='flex flex-col text-center'>
                                   <h3 className='text-gray-800 capitalize font-semibold text-lg'> {ProductName}</h3>
                                   <p className='text-gray-600 capitalize max-w-xs md:max-w-md break-words'>
                                   " {review.comment} "
                                    </p>
                                </div>
                                <button disabled={reviewLoading} onClick={()=>handleDelete(review._id)} className='p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100'>
                                    <Trash2 size={18}/>
                                </button>
                                    
                                


                            </div>
                        )))}
                             

                            
                       </div>
                          

                            
                        
                </div>
              </div>
        </main>
    </div>
  )
}
