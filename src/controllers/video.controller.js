const { Video } = require("../models/video.model");
const { HttpError } = require("../utils/helper");
const { doesVideoExist } = require("./helper");

const getAllVideos = async (_, res, next) => {
  try {
    const videos = await Video.find({}).populate("category");
    if (videos.length < 1) {
      throw new HttpError(404, "No videos found");
    }
    res.json({
      status: "SUCCESS",
      data: videos,
      message: "Videos found",
    });
  } catch (err) {
    next(err);
  }
};

const getVideoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const video = await doesVideoExist(id);
    res.json({
      status: "SUCCESS",
      data: video,
      message: "Video found",
    });
  } catch (err) {
    next(err);
  }
};

const createNewVideo = async (req, res, next) => {
  const videoData = req.body;
  try {
    let newVideo = new Product(videoData);
    await newVideo.populate("category").execPopulate();
    await newVideo.save();
    res.json({
      status: "SUCCESS",
      data: newVideo,
      message: "New video created",
    });
  } catch (err) {
    next(err);
  }
};

const updateVideoById = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await doesVideoExist(id);
    const video = await Video.findByIdAndUpdate(id, data, { new: true });
    res.json({
      status: "SUCCESS",
      data: video,
      message: "Video updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteVideoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    await doesProductExist(id);
    await Video.findByIdAndDelete(id);
    res.json({
      status: "SUCCESS",
      data: {},
      message: "Video deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllVideos,
  getVideoById,
  updateVideoById,
  createNewVideo,
  deleteVideoById,
};
