import mongoose from "mongoose"

const connectDB = () =>mongoose.connect(process.env.MDB_URL).then((data)=>{
    console.log("Mongodb connected ", data.connection.host)
}).catch((err)=>{
    console.log(err.message)
})

export default connectDB

