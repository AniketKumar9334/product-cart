import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ErrorHandler } from "./errorHandlers.js";
import { User } from "../models/user.models.js";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    return res.status(401).json({ message: "You are not authenticated" });
  }

  if (accessToken) {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
    const user = await User.findById(decoded._id);
    if (!user) {
      return next(new ErrorHandler("This token are invalid or expires"));
    }
    req.user = user;
  } else {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const user = await User.findById(decoded._id);

    if (!user) {
      return next(new ErrorHandler("This token are invalid or expires"));
    }

    if (user.refressToken !== refreshToken) {
      return next(new ErrorHandler("This token are invalid or expires", 400));
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESS_TOKEN, {
      expiresIn: "7d",
    });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      maxAge:  1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .cookie("refreshToken", refreshToken, {
      maxAge:  7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
      req.user = user
  }

  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
