import Razorpay from "razorpay";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE RAZORPAY ORDER
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: Math.round(amount * 100), // amount in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  if (!order) {
    res.status(500);
    throw new Error("Razorpay order could not be created");
  }

  res.status(200).json(order);
});

// VERIFY RAZORPAY PAYMENT
const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    res.status(200).json({ success: true, paymentId: razorpay_payment_id });
  } else {
    res.status(400);
    throw new Error("Payment verification failed");
  }
});

export { createRazorpayOrder, verifyRazorpayPayment };