

import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getProductDetail, getUserProduct, updateProduct } from '../controllers/product.controller.js'
import {authorizeRoles, isAuthenticatedUser} from '../utils/auth.js'
import { singleUpload } from '../utils/multer.js'

const router = express.Router()

router.post("/create", isAuthenticatedUser, authorizeRoles("admin"),singleUpload, createProduct)
router.get("/:id", getProductDetail)
router.get("/", getAllProduct)
router.put("/:id",isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
router.delete("/:id",isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
router.get("/my-product",isAuthenticatedUser,authorizeRoles("admin"), getUserProduct)

export default router