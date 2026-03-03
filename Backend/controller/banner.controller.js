import Banner from "../models/banner.model.js";
import asyncHandler from "express-async-handler";

//CREATE BANNER
const createBanner = asyncHandler(async (req, res) => {
  const newBanner = Banner(req.body);
  const savedBanner = newBanner.save();

  if (!savedBanner) {
    res.status(400);
    throw new Error("Banner was not created");
  } else {
    res.status(201).json(savedBanner);
  }
});

//DELETE BANNER
const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findByIdAndDelete(req.params.id);
  if (!banner) {
    res.status(400);
    throw new Error("Banner was not deleted");
  } else {
    res.status(201).json("Banner was deleted successfully");
  }
});

//GET ALL BANNERS
const getAllBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find();
  if (!banners) {
    res.status(400);
    throw new Error("Banner was not fetched or something went wrong");
  } else {
    res.status(201).json(banners);
  }
});

//GET RANDOM BANNERS
const getRandomBanner = asyncHandler(async (req, res) => {
  const banners = await Banner.find();

  if (!banners) {
    res.status(400);
    throw new Error("Banner was not fetched or something went wrong");
  } else {
    const randomIndex = Math.floor(Math.random() * banners.length);
    const randomBanner = banners[randomIndex];
    res.status(201).json(randomBanner);
  }
});

export { getAllBanners, createBanner, deleteBanner, getRandomBanner };
