import express from "express"
import product from "./routes/productRoute.js"
import user from "./routes/userRoute.js"
import errorHandle from "./middleware/errorHandle.js";
import cookie_parser from "cookie-parser"

const app = express()
app.use(express.json());
app.use(cookie_parser())
app.use("/productAPI/v1",product);
app.use("/userAPI/v1",user)
app.use(errorHandle)
export default app