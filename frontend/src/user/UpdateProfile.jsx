import Navbar from "../components/Navbar";

 const UpdateProfile = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24">

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Update Profile</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow rounded sm:px-10 border border-gray-100">
           <form encType="mulipart/form-data" className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-28 h-28 mb-4">
                   <img src="https://randomuser.me/api/portraits/men/26.jpg" alt="" className="rounded-full object-cover border-4 border-indigo-100 shadow-sm"/>
                
                </div>
                 <label className="block bg-indigo-50 text-indigo-700 px-4  py-2 rounded-lg font-semibold text-sm cursor-pointer hover:bg-indigo-100 transition">
                     change photo
                     <input type="file" className="hidden"/>
                 </label>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 ml-1">Name</label>
                <div className="mt-1">
                  <input type="text" name="name" id="name" required className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"/>
                </div>
              </div> 
               <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 ml-1">Email address</label>
                <div className="mt-1">
                  <input type="email" name="email" id="email" required className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"/>
                </div>
              </div> 
              <div className="pt-2">
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md shadow-indigo-200 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]">
                  Update
                </button>
              </div>
           </form>
        </div>
      </div>
    </div>
    </>
  )
}


export default UpdateProfile;