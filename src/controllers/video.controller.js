const { Video } = require("../models/video.model");
const {HttpError} = require("../utils/helper");

const getAllVideos = async (_, res, next) => {
  try {
    const videos = await Video.find({}).populate("category")
    res.json({ status: "SUCCESS", message: "Videos found", videos })
  } catch (err) {
    next(err)
  }
}

const findVideo = async (req, res, next, vId) => {
  try {
    const video = await Video.findById(vId);
    if (!video) {
      throw new HttpError(404, "Video does not exist");
    }
    req.video = video;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllVideos, findVideo };
