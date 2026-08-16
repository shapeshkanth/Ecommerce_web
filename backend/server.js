import app from "./App.js"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { v2 as cloudinary } from "cloudinary"
import Stripe from "stripe"

dotenv.config({path:"backend/config/config.env"})

//database connection
connectDB()

   cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });


    export const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY);

app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT}`)
})
