import express from "express"
import { createUser, logout, forgetPassword, userLogin, resetPassword, profile, updateProfile, updatePassword } from "../controllers/usercontroller.js"
import { verifytoken } from "../helper/userAuth.js"

const router = express.Router()

router.post("/adduser",createUser)
router.post("/loginUser",userLogin)
router.post("/logout",logout)
router.post("/forgetPassword",forgetPassword)
router.post("/reset/:token",resetPassword)
router.get("/profile",verifytoken,profile)
router.put("/profile/update",verifytoken,updateProfile)
router.put("/password/update",verifytoken,updatePassword)

export default router