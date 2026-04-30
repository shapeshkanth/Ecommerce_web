import express from "express"
import { addproduct, allproduct, deleteproduct, singleproduct, updateproduct } from "../controllers/productController.js"
const router = express.Router()

router.get("/allproduct",allproduct)
router.get("/singleProduct",singleproduct)
router.post("/addProduct",addproduct)
router.put("/updateProduct",updateproduct)
router.delete("/deleteProduct",deleteproduct)


export default router