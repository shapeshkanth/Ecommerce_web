import ErrorHandler from "../helper/ErrorHandler.js"
import { stripe } from "../server.js"

export const processPayment = async (req,res,next)=>{
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount:Number(req.body.amount * 100),
            currency :"AED",
            automatic_payment_methods:{
                enabled:true
            },
        })
        res.status(200).json({
            success:true,
            clientSecret:paymentIntent.client_secret,
        })


    } catch (error) {
        return next(new ErrorHandler(500,"Somthing went wrong please try again"))
    }
}

export const sendApiKey = async (req,res)=>{

    res.status(200).json({
        success:true,
        key:process.env.STRIPE_PUBLISHABLE_KEY
    })

}

export const verifyPayment = async (req,res,next)=>{

    const {paymentIntentId}=req.params;
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

        res.status(200).json({
            success:true,
            status:paymentIntent.status,
            paymentIntentId:paymentIntent.id,
        })
        
    } catch (error) {
        return next(new ErrorHandler(400, error.message));
    }
}