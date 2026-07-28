import express from "express"
import product from "./routes/productRoute.js"
import user from "./routes/userRoute.js"
import order from "./routes/orderRoute.js"
import errorHandle from "./middleware/errorHandle.js";
import cookie_parser from "cookie-parser"
import fileUpload from "express-fileupload";


const app = express()
app.use(express.json());
app.use(cookie_parser())
app.use(fileUpload())

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order)
app.use(errorHandle)
export default app