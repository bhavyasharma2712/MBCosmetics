import express from "express";
const router = express.Router();
import {getAllUsers, getUser, deleteUser, updateUser} from "../controller/user.controller.js";

//GET ALL USERS ROUTE
router.get("/", getAllUsers);

//GET USER ROUTE
router.get("/find/:userId", getUser);

//DELETE USER ROUTE
router.delete("/:id", deleteUser);

//UPDATE USER ROUTE
router.put("/:id", updateUser);

export default router;
