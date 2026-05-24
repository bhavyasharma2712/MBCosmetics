import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import generateToken from "../util/generateToken.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";

// REGISTER USER
// route POST /api/v1/auth/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
  } else {
    res.status(400);
    throw new Error("Invaild user data");
  }
});

// LOGIN USER
// route POST /api/v1/auth/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
  } else {
    res.status(401);
    throw new Error("Invaild email or password");
  }
});

// LOGOUT USER
// route POST /api/v1/auth/logout
// @access public

const logOut = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout Successfully!" });
});

// SEND OTP
// route POST /api/v1/auth/send-otp
// @access public

const sendOtp = asyncHandler(async (req, res) => {
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("No account found with this email");
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  await User.findByIdAndUpdate(user._id, {
    resetOtp: otp,
    resetOtpExpiry: expiry,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"MB Cosmetics" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #62d058;">MB Cosmetics</h2>
        <p>Your OTP for password reset is:</p>
        <h1 style="letter-spacing: 8px; color: #333;">${otp}</h1>
        <p style="color: #888; font-size: 13px;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
      </div>
    `,
  });

  res.status(200).json({ message: "OTP sent to your email" });
});

// VERIFY OTP & RESET PASSWORD
// route POST /api/v1/auth/reset-password
// @access public

const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("No account found with this email");
  }

  if (!user.resetOtp || user.resetOtp !== otp) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  if (user.resetOtpExpiry < new Date()) {
    res.status(400);
    throw new Error("OTP has expired. Please request a new one");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  await User.findByIdAndUpdate(user._id, {
    password: hashedPassword,
    resetOtp: null,
    resetOtpExpiry: null,
  });

  res.status(200).json({ message: "Password reset successfully" });
});

export { logOut, loginUser, registerUser, sendOtp, resetPassword };