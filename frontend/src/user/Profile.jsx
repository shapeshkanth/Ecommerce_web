import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {

    const { user,loading,isAuthenticated} = useSelector((state)=>state.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated===false)
        {
          navigate("/login")
        }
    },[isAuthenticated])
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm">My Profile</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
            <div className="bg-white py-10 px-6 shadow-xl rounded-2xl sm:px-12 flex flex-col items-center border border-gray-100">
                <div className="w-36 h-36 mb-8 mt-2">
                    <img src={user?.avatar?.url} alt={user?.name} title={user?.name} className="rounded-full w-full h-full object-cover border-4 border-indigo-100 shadow-lg" />
                </div>
                <div className="w-full space-y-6">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Full Name</h4>
                        <p className="text-xl font-bold text-gray-800 capitalize">{user?.name}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Email Address</h4>
                        <p className="text-xl font-bold text-gray-800">{user?.email}</p>
                    </div>
                </div>
                <div className="w-full mt-8">
                    <Link to="/profile/update" 
                    className="w-full flex justify-center px-4 py-3 border border-transparent rounded shadow-md shadow-indigo-200 text-sm font-sm font-bold bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98]">Edit Profile</Link>
                </div>

            </div>

        </div>
    
    </div>
    </>
  )
}
export default Profile;
