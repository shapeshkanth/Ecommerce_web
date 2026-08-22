import { Link, useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import PageTitle from "../components/PageTitle"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { removeErrors, sindleOrderDetails } from "../features/order/orderSlice"
import toast  from "react-hot-toast"


export const OrderDetails = () => {
  
  const {id:orderId} = useParams();
  const {loading,error,order}=useSelector((state)=>state.order);
  const dispatch = useDispatch();

  useEffect(()=>{
  dispatch(sindleOrderDetails(orderId));
  if(error)
  {
    toast.error(error,{position:"top-center",autoClose:3000});
    dispatch(removeErrors())
  }

console.log(order)
  },[error,dispatch])
  const {OrderItems=[], ShippingAddress={}, paymentInfo={},orderStatus}= order;
  const paymentStatus = paymentInfo?.status === "succeeded" ? "Paid" : "Unpaid";
  const finalOrderstatus = paymentStatus === "Unpaid" ? "Cancelled" : orderStatus;

  console.log(paymentStatus)
  console.log(finalOrderstatus);


  if(loading)
  {
  return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading..</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen">
    <PageTitle title="order details"/>
    <Navbar/>
    <main className="container mx-auto px-4 py-10 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Details</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg-col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-700 flex justify-between items-center">
                <span>Items Ordered</span>
                <Link to="/order/user" className="text-blue-600 hover:underline text-xs">Back to order</Link>
              </h2>

            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
                  <tr>
                    <th className="px-6 py-4 font-medium">Product</th>
                    <th className="px-6 py-4 font-medium">Price</th>
                    <th className="px-6 py-4 font-medium">Qty</th>
                    <th className="px-6 py-4 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {OrderItems.map((item)=>(
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                          <span className="font-medium text-gray-800">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">AED {item.price}</td>
                      <td className="px-6 py-4 text-gray-600">{item.quantity}</td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-600">AED {item.price*item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>

          </div>
        </div>
        <div className="space-y-6">
           <div className="bg-white p-6 shadow-sm rounded-xl border border-gray-100 ">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center"> Shipping Information</h2>
            <div className="text-gray-600 space-y-1 text-sm leading-relaxed"></div>
            <p className="font-medium text-gray-800">{ShippingAddress.Address}</p>
            <p>
              {ShippingAddress.city},<br/>
              Pincode - {ShippingAddress.pincode},<br/>
              {ShippingAddress.state} - {ShippingAddress.country}<br/>
              Phone No - {ShippingAddress.phoneNo}
            </p>

           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Summary
            </h2>
            <div className="space-y-3 border-b pb-4 mb-4 border-gray-200 ">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Order ID</span>
                <span className="text-gray-800 font-mono text-xs">{order._id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment</span>
                <span className={`font-medium ${paymentStatus ==="Paid" ? "text-green-600" : "text-red-500"}`}>{paymentStatus}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold uppercase">{finalOrderstatus}</span>
              </div>

            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>AED {order.price}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">tax</span>
                <span>AED {order.tax}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>{order.shippingPrice == 0 ? "Free" : "AED " + order.shippingPrice}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>AED {order.TotalPrice}</span>

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
