import app from "./App.js"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

dotenv.config({path:"backend/config/config.env"})

//database connection
connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT}`)
})
