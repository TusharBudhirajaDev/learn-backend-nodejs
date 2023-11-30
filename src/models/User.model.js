import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Scheme.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

/* 
  In mongoose we have multiple defined hooks like pre and post. We the have pre hook we can 
  perform some action before performting a event.
  For eg 
  We can perform a validation before saving a data in db by the help of pre hooks

*/

userSchema.pre("save", async function (next) {
  //  a condition to perform a bcrypt only when there is modify in data
  if (!this.isModified("password")) return next(); // this check for password value is modified or not. Here we check negative of boolean and returing next() for not modified value.
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// implement a hook/method to checking a password to be correct or not
userSchema.methods.isPasswordCorrect = async (password) => {
  return await bcrpt.compare(password, this.password); // return true or false
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {};

export const User = mongoose.model("User", userSchema);
