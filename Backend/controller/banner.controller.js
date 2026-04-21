import Banner from "../models/banner.model.js";
import asyncHandler from "express-async-handler";

//CREATE BANNER
const createBanner = asyncHandler(async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  const title = req.body?.title;
  const subtitle = req.body?.subtitle;

  if (!req.file) {
    res.status(400);
    throw new Error("Banner image is required");
  }

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  if (!subtitle) {
    res.status(400);
    throw new Error("Subtitle is required");
  }

  const img = `/uploads/banners/${req.file.filename}`;

  const newBanner = new Banner({ title, subtitle, img });
  const savedBanner = await newBanner.save();

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
    res.status(200).json("Banner was deleted successfully");
  }
});

//GET ALL BANNERS
const getAllBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find();
  if (!banners) {
    res.status(400);
    throw new Error("Banner was not fetched or something went wrong");
  } else {
    res.status(200).json(banners);
  }
});

//GET RANDOM BANNER
const getRandomBanner = asyncHandler(async (req, res) => {
  const banners = await Banner.find();

  if (!banners || banners.length === 0) {
    res.status(400);
    throw new Error("No banners found");
  } else {
    const randomIndex = Math.floor(Math.random() * banners.length);
    const randomBanner = banners[randomIndex];
    res.status(200).json(randomBanner);
  }
});

export { getAllBanners, createBanner, deleteBanner, getRandomBanner };