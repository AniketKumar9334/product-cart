// Create Token and saving in cookie
import jwt from 'jsonwebtoken'
export const sendToken = async (user, statusCode, res, message) => {
  const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESS_TOKEN, {
    expiresIn: "7d",
  });

  user.refreshToken = refreshToken
  await user.save()

  res
    .status(statusCode)
    .cookie("accessToken", accessToken, {
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
    })
    .json({
      success: true,
      user,
      accessToken,
      message,
    });
};
