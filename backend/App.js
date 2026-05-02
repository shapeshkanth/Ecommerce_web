import express from "express"
import router from "./routes/productRoute.js"

const app = express()
app.use(express.json());
app.use("/productAPI/v1",router);
export default app