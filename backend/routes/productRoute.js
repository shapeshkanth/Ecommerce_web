import express from "express"
import { addproduct, allproduct, deleteproduct, singleproduct, updateproduct } from "../controllers/productController.js"
import { verifytoken } from "../helper/userAuth.js"
const router = express.Router()

router.get("/allproduct",verifytoken,allproduct)
router.get("/singleProduct/:id",singleproduct)
router.post("/addProduct",addproduct)
router.put("/updateProduct/:id",updateproduct)
router.delete("/deleteProduct/:id",deleteproduct)


export default router