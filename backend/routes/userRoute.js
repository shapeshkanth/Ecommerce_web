import express from "express"
import { createUser, logout, forgetPassword, userLogin, resetPassword, profile, updateProfile, updatePassword, getAllUser, getSingleUser, deleteSingleUser, userRoleUpdate, userReview, viewUserReview, adminViewAllProduct, deleteUserReview, adminGetAllReviews } from "../controllers/usercontroller.js"
import { roleBasedAccess, verifytoken } from "../helper/userAuth.js"

const router = express.Router()

router.post("/adduser",createUser)
router.post("/loginUser",userLogin)
router.post("/logout",logout)
router.post("/forgetPassword",forgetPassword)
router.post("/resetPassword/:token",resetPassword)
router.get("/profile",verifytoken,profile)
router.put("/profile/update",verifytoken,updateProfile)
router.put("/password/update",verifytoken,updatePassword)
router.get("/admin/user",verifytoken,roleBasedAccess("admin"),getAllUser)
router.get("/admin/singleUser/:id",verifytoken,roleBasedAccess("admin"),getSingleUser)
router.delete("/admin/deleteUser/:id",verifytoken,roleBasedAccess("admin"),deleteSingleUser)
router.put("/admin/userRole/:id",verifytoken,roleBasedAccess("admin"),userRoleUpdate)
router.put("/userReview",verifytoken,userReview)
router.get("/admin/getUserReview/:id",verifytoken,roleBasedAccess("admin"),viewUserReview)
router.get("/adminViewProducts",verifytoken,roleBasedAccess("admin"),adminViewAllProduct)
router.delete("/admin/deleteUserReview",verifytoken,roleBasedAccess("admin"),deleteUserReview)
router.get("/admin/all-reviews",verifytoken,roleBasedAccess("admin"),adminGetAllReviews)
export default router