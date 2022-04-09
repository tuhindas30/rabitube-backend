const express = require("express");
const router = express.Router();
const { Video } = require("../models/video.model");
const VideoController = require("../controllers/video.controller");

router
  .route("/")
  .get(VideoController.getAllVideos)
  .post(VideoController.createNewVideo);

router
  .route("/:id")
  .get(VideoController.getVideoById)
  .post(VideoController.updateVideoById)
  .delete(VideoController.deleteVideoById);

module.exports = router;
