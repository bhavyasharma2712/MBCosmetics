import express from "express";
const router = express.Router();
import {createOrder, getUserOrder, getAllOrders, updateOrder, deleteOrder} from "../controller/order.controller.js";
import protect from "../middleware/auth.middleware.js";

//CREATE ORDER ROUTE
router.post("/", createOrder);

//UPDATE ORDER ROUTE
router.put("/:id", updateOrder);

//GET ALL ORDERS ROUTE
router.get("/", getAllOrders);

//DELETE ORDER ROUTE
router.delete("/:id", deleteOrder);

//GET USER ORDER ROUTE
router.get("/find/:userId", getUserOrder);


export default router;