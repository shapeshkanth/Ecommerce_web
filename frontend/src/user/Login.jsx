import { Link } from "react-router-dom"

const Login = () => {
  return (
     <div className="bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
            <form encType="multypart/form-data" className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
                    <p className="text-sm text-gray-500 mt-2">Please enter your details to sign in</p>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1 block">Email</label>
                    <input placeholder="hello@example.com" type="email" name="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1 block">Password</label>
                    <input placeholder="******" type="password" name="password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"/>
                </div>
               
                <button className="w-full bg-indigo-600  hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg py-3 shadow-indigo-200 transition-all active:scale-[0.98]">Login</button>
                <p>Don't have an account ? <Link className="text-indigo-600 font-semibold hover:underline">Sign up here</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login