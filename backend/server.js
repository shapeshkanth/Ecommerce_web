import app from "./App.js"
import dotenv from "dotenv"
dotenv.config({path:"backend/config/config.env"})

app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT}`)
})
