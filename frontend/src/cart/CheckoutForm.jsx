import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

  
  const CheckoutForm = ({amount}) =>{
  const stripe = useStripe();
  const elements = useElements();
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!stripe || !elements)
    {
      return;
    }
    setLoading(true);

    const { error } = await stripe.confirmPayment({
                     elements,
                    confirmParams: {
                    return_url: "http://localhost:5173/PaymentSuccess"
                    }
                 });

            if (error) {
             alert(error.message);
             setLoading(false);
                 }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="w-full max-w-md mx-auto">
          <PaymentElement/>
          <button type='submit' disabled = {!stripe || loading} className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all mt-6 disabled:bg-gray-400'>
           {loading ? "Processing..." : `Pay AED ${amount}`}
           </button>
        </div>
      
    
    </form>
  )

}

export default CheckoutForm;