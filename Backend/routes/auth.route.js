import express from "express";
import {
  loginUser,
  logOut,
  registerUser,
  sendOtp,
  resetPassword,
} from "../controller/auth.controller.js";

const router = express.Router();

//REGISTER USER ROUTER
router.post("/register", registerUser);

//LOGIN USER ROUTER
router.post("/login", loginUser);

//LOGOUT USER ROUTER
router.get("/logout", logOut);

//SEND OTP ROUTER
router.post("/send-otp", sendOtp);

//RESET PASSWORD ROUTER
router.post("/reset-password", resetPassword);

export default router;