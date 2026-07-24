import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

export const Pagination = ({
  currentPage,
  onPageChange,
  nextPageText = <ChevronsRight size={20}/>,
  prevPageText = <ChevronLeft size={20}/>,
  firstPageText= <ChevronsLeft size={20}/>,
  lastPageText = <ChevronRight size={20}/>
 
}) => { 

  const{ products, TotalPages} = useSelector((state)=>state.product)
  if(!products || products.length === 0 || TotalPages <=1)
  {
    return null
  }
  
  const getPageNumbers=()=>{
    const pageNumbers = [];
    const pageWindow = 1;
    for(let i = Math.max(1,currentPage-pageWindow); i<=Math.min(TotalPages,currentPage+pageWindow); i++)
    {
      pageNumbers.push(i);
    }
    return pageNumbers
  }

  const baseBtn = "relative inline-flex items-center justify-center w-10 h-10 text-sm font-semibold transition-all duration-300 ease-in-out rounded-full mx-1"
  const activeBtn = "bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-600 ring-offset-2 scale-110"
  const inavtiveBtn = "text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:scale-105 border border-transparent"
  const controlBtn = "bg-white border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 shadow-sm"
  
  return (
    <div className='flex flex-col items-center justify-center gap-4 my-12'>
     
      <div className='flex items-center p-2 bg-white rounded-full shadow-md border border-gray-100'>
        <div className='flex gap-1 mr-2 border-r pr-2 border-gray-200'>
          <button disabled={currentPage===1} className={`${baseBtn} ${controlBtn} disabled:opacity-30 disabled:hober:scale-100`} title='First Page' onClick={()=>onPageChange(1)}>{firstPageText}</button>
          <button disabled={currentPage==1} onClick={()=>onPageChange(currentPage-1)} className={`${baseBtn} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100`} title='Previous' >{prevPageText}</button>
        </div>
        <div className='flex gap-1'>
          
          {getPageNumbers().map((number)=>(
            <button key={number} onClick={()=>onPageChange(number)} className={`${baseBtn} ${currentPage === number ? activeBtn : inavtiveBtn}`}>
              {number}
            </button>
          ))}
        </div>
        <div className='flex gap-1 ml-2 border-l pl-2 border-gray-200'>
          <button disabled={currentPage===TotalPages} onClick={()=>onPageChange(currentPage+1)}  className={`${baseBtn} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100`} title='Next'>{lastPageText}</button>
          <button disabled={currentPage===TotalPages} onClick={()=>onPageChange(TotalPages)} className={`${baseBtn} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100`}>{nextPageText}</button>
        </div>
      </div>
      <p>Page {currentPage} of {TotalPages}</p>
    </div>
  )
}
