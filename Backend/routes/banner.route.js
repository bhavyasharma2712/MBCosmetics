import express from "express";
const router = express.Router();
import {createBanner, getAllBanners, getRandomBanner, deleteBanner} from "../controller/banner.controller.js";

//CREATE BANNER ROUTE
router.post("/", createBanner);

//GET ALL BANNERS ROUTE
router.get("/", getAllBanners);

//GET RANDOM BANNER ROUTE
router.get("/random", getRandomBanner);

//DELETE BANNER ROUTE
router.get("/:id", deleteBanner);

export default router;