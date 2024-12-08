import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: [3, 'product name should to greater then 3 chareter {value}']
    },
    price:{
        type: Number,
        required: true,
    },
    productImage:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

}, {
    timestamps: true
})

export const Product = mongoose.model("Product", productSchema)