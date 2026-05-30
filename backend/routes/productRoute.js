import express from "express"
import { addproduct, allproduct, deleteproduct, singleproduct, updateproduct } from "../controllers/productController.js"
import { verifytoken, roleBasedAccess } from "../helper/userAuth.js"
const router = express.Router()

router.get("/allproduct",allproduct)
router.get("/singleProduct/:id",singleproduct)
router.post("/addProduct",verifytoken,roleBasedAccess("admin"),addproduct)
router.put("/updateProduct/:id",verifytoken,roleBasedAccess("admin"),updateproduct)
router.delete("/deleteProduct/:id",verifytoken,roleBasedAccess("admin"),deleteproduct)


export default router