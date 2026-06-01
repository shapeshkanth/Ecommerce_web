import express from "express"
import { createUser, logout, resetPassword, userLogin } from "../controllers/usercontroller.js"

const router = express.Router()

router.post("/adduser",createUser)
router.post("/loginUser",userLogin)
router.post("/logout",logout)
router.post("/forgetPassword",resetPassword)

export default router