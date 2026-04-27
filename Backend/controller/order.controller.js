  import Order from "../models/order.model.js";
  import asyncHandler from "express-async-handler";

  //CREATE ORDER
  const createOrder = asyncHandler(async (req, res) => {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    if (!savedOrder) {
      res.status(400);
      throw new Error("Order was not created");
    } else {
      res.status(201).json(savedOrder);
    }
  });

  //UPDATE ORDER
  const updateOrder = asyncHandler(async (req, res) => {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    if (!updatedOrder) {
      res.status(400);
      throw new Error("Order was not updated");
    } else {
      res.status(201).json(updatedOrder);
    }
  });

  //DELETE ORDER
  const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(400);
      throw new Error("Order was not deleted");
    } else {
      res.status(201).json(order);
    }
  });

  //GET USER ORDER
  const getUserOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    if (!orders) {
      res.status(400);
      throw new Error("No orders were found or something went wrong");
    } else {
      res.status(201).json(orders);
    }
  });

  //GET ALL ORDERS
  const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();
    if (!orders) {
      res.status(400);
      throw new Error("No orders were found or something went wrong");
    } else {
      res.status(201).json(orders);
    }
  });

  export { createOrder, getUserOrder, getAllOrders, updateOrder, deleteOrder };