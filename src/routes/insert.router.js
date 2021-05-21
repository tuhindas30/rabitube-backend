const express = require("express")
const { Video } = require("../models/video.model")
const productsDB = require("../db/videosDB")
const router = express.Router();

router.route("/")
  .get(async(_, res) => {
    try {
    const insertedVideos = await Video.insertMany(productsDB)
    res.json({success: true, message: "Videos inserted", insertedVideos})
    } catch (error) {
      res.status(500).json({success: false, message: "Cannot insert the videos", errorMessage: error.message})
    }
  })

module.exports = router 