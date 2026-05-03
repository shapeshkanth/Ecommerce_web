import express from "express"
import router from "./routes/productRoute.js"
import errorHandle from "./middleware/errorHandle.js";

const app = express()
app.use(express.json());
app.use("/productAPI/v1",router);
app.use(errorHandle)
export default app