const express = require("express");
const router = express.Router();
const { Video } = require("../models/video.model");
const VideoController = require("../controllers/video.controller");

router.get("/", VideoController.getAllVideos);

module.exports = router;