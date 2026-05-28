import express from "express"
import { createUser, userLogin } from "../controllers/usercontroller.js"

const router = express.Router()

router.post("/adduser",createUser)
router.post("/loginUser",userLogin)

export default router