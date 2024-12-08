

import express from 'express'
import { deleteUserProfile, getUserDetails, loginUser, logout, registerUser } from '../controllers/user.controller.js'
import { isAuthenticatedUser } from '../utils/auth.js'
import { singleUpload } from '../utils/multer.js'

const router = express.Router()

router.post("/register",singleUpload, registerUser)
router.post("/login", loginUser)
router.get("/profile",isAuthenticatedUser, getUserDetails)
router.delete("/delete",isAuthenticatedUser, deleteUserProfile)
router.delete("/logout",isAuthenticatedUser, logout)


export default router