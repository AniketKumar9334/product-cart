import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usersModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto:{
      type: String,
      
    },
    role:{
      type:String,
      default:"user"
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    refressToken:{
        type: String
    }
  },
  {
    timestamps: true,
  }
);

usersModel.pre("save", async function () {
  const user = this;

  // Check if the password field is modified
  if (user.isModified("password")) {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

usersModel.methods.comparePasword = async function (password) {
  return await bcrypt.compare(password, this.password);
};





export const User = mongoose.model("User", usersModel);
