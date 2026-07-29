import app from "./App.js"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { v2 as cloudinary } from "cloudinary"

dotenv.config({path:"backend/config/config.env"})

//database connection
connectDB()

   cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT}`)
})
