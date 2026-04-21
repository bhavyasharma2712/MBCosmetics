import express from "express";
const router = express.Router();
import { createBanner, getAllBanners, getRandomBanner, deleteBanner } from "../controller/banner.controller.js";
import upload from "../middleware/upload.js";

//CREATE BANNER ROUTE (with image upload)
router.post("/", upload.single("img"), createBanner);

//GET ALL BANNERS ROUTE
router.get("/", getAllBanners);

//GET RANDOM BANNER ROUTE
router.get("/random", getRandomBanner);

//DELETE BANNER ROUTE - fixed: was GET, should be DELETE
router.delete("/:id", deleteBanner);

export default router;