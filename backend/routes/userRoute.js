import express from "express"
import { createUser, logout, userLogin } from "../controllers/usercontroller.js"

const router = express.Router()

router.post("/adduser",createUser)
router.post("/loginUser",userLogin)
router.post("/logout",logout)

export default router