import { Product } from "../models/product.model.js";
import {ErrorHandler} from "../utils/errorHandlers.js"
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import {rm} from 'fs'
import {User} from "../models/user.models.js"



// Create product only fro admin
export const createProduct = catchAsyncErrors(async (req, res, next) =>{
    const {name, price, description, brand} = req.body;

    const productImage = req.file.path
    if(!productImage){
        return next(new ErrorHandler('Please upload a product photo', 400))
    }
    if(!name || !price || !description || !brand){
        rm(productImage,() => {
            console.log("delete");
          })
        return next(new ErrorHandler("Please fill in all fields.", 400))
    }

    const product = await Product.create({
        name,
        price,
        description,
        brand,
        productImage: productImage,
        user: req.user._id
    })

    const user = await User.findById(req.user._id)
    user.products.push(product._id)
    await user.save()

    res.status(201).json({
        success: true,
        product,
        message: "Product created successfully..."
    })
})

export const getProductDetail = catchAsyncErrors(async(req, res, next) =>{
    const product = await Product.findById(req.params.id).populate("user")

    if(!product){
        return res.status(404).json({msg: "Product not found."})
    }

    res.status(200).json({
        success: true,
        product
    })
})

export const getAllProduct = catchAsyncErrors(async(req, res, next) =>{
    const {page = 1, limit=10, search=""} = req.query

    const keyword = search ? {name: {$regex: search, $options: 'i'}} : ""
    const keyword2 = search ? {description: {$regex: search, $options: 'i'}} : ""

    const skip = (page - 1 ) * limit
    
    const products = await Product.find({$or: [{...keyword}, {...keyword2}]}).skip(skip).limit(limit)
    // const productLen = await Product.find();
    const productCount = await Product.countDocuments()

    res.status(200).json({
        success: true,
        products,
        productCount
    })

})          

export const updateProduct = catchAsyncErrors(async(req, res, next) =>{
    const product = await Product.findById(req.params.id)

    if(product.user.toString() != req.user._id.toString()){
        return next(new ErrorHandler("You are not authorize to update this product", 400))
    }
    const newProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json({
        success: true,
        message: "product updated successfully...",
        newProduct
    })

})

// getUser product only for admin
export const getUserProduct = catchAsyncErrors(async(req,res, next) =>{
    const user = req.user
    const products = await Product.find({user: user._id})

    res.status(200).json({
        success: true,
        products
    })

})
// delete product only for admin
export const deleteProduct = catchAsyncErrors(async(req, res, next) =>{
    const product = await Product.findById(req.params.id)

    if(product.user.toString() != req.user._id.toString()){
        return next(new ErrorHandler("You are not authorize to delte this product", 400))
    }

    rm(product.productImage,() => {
        console.log("delete");
      })
    await product.remove()

    res.status(200).json({
        success: true,
        message: "Product deleted successfully..."
    })
})