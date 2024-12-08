import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "../utils/errorHandlers.js";
import { User } from "../models/user.models.js";
import { sendToken } from "../utils/jwtToken.js";
import { rm } from "fs";
import { Product } from "../models/product.model.js";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, username, email, password } = req.body;

  const profiePhoto = req.file.path;

  if (!name || !username || !email || !password) {
    if (profiePhoto) {
      rm(profiePhoto, () => {
        console.log("delete");
      });
    }
    return next(new ErrorHandler("Please fill in all fields.", 400));
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (user) {
    if (profiePhoto) {
      rm(profiePhoto, () => {
        console.log("delete");
      });
    }
    return next(new ErrorHandler("Username or Email already exists.", 400));
  }

  const newUser = await User.create({ name, username, email: email.toLowerCase(), password });
  if (!newUser) {
    if (profiePhoto) {
      rm(profiePhoto, () => {
        console.log("delete");
      });
    }
    return next(new ErrorHandler("something went wrong", 500));
  }
  if (profiePhoto) {
    newUser.profilePhoto = profiePhoto;
  }

  await newUser.save();

  sendToken(newUser, 201, res, "User created successfully");
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    return next(new ErrorHandler("Please fill in all fields.", 400));
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    return next(new ErrorHandler("Username or email are incorrect.", 400));
  }

  const isPasswordMatch = await user.comparePasword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("username or Password is incorrect.", 400));
  }

  sendToken(user, 200, res, "Logged in successfully");
});
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
export const deleteUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  user.products.forEach(async(item) =>{
    const product = await Product.findById(item)
    rm(product.productImage, async() =>{
      await Product.findByIdAndDelete(product._id)
    })
  })

  rm(user.profilePhoto,() => {
    console.log("delete");
  });

  await User.findOneAndDelete(user._id);

  res.status(200).json({
    success: true,
    message: "User Deleted sucessfully",
  });
});


export const logout = catchAsyncErrors(async(req, res, next) =>{
 

  const user = await User.findById(user._id)

  user.refreshToken = ""

  await user.save()
  
  res.status(200).cookie("accessToken", null, {
    maxAge: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }).cookie("refreshToken", null, {
    maxAge: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  }).json({
    message: 'User logOut success fully'
  })

})