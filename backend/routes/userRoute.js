import express from "express"
import { createUser, logout, forgetPassword, userLogin, resetPassword, profile, updateProfile, updatePassword, getAllUser, getSingleUser } from "../controllers/usercontroller.js"
import { roleBasedAccess, verifytoken } from "../helper/userAuth.js"

const router = express.Router()

router.post("/adduser",createUser)
router.post("/loginUser",userLogin)
router.post("/logout",logout)
router.post("/forgetPassword",forgetPassword)
router.post("/reset/:token",resetPassword)
router.get("/profile",verifytoken,profile)
router.put("/profile/update",verifytoken,updateProfile)
router.put("/password/update",verifytoken,updatePassword)
router.get("/admin/user",verifytoken,roleBasedAccess("admin"),getAllUser)
router.get("/admin/singleUser/:id",verifytoken,roleBasedAccess("admin"),getSingleUser)

export default router