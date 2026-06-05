import express from "express"
import { createUser, logout, forgetPassword, userLogin, resetPassword } from "../controllers/usercontroller.js"

const router = express.Router()

router.post("/adduser",createUser)
router.post("/loginUser",userLogin)
router.post("/logout",logout)
router.post("/forgetPassword",forgetPassword)
router.post("/reset/:token",resetPassword)

export default router