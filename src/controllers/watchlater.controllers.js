const { Video } = require("../models/video.model");
const { HttpError } = require("../utils/helper");

const getWatchlaterVideos = (req, res) => {
  const { user } = req;
  res.json({ status: "SUCCESS", watchlater: user.watchlater })
}

const saveToWatchlater = async (req, res, next) => {
  try {
    const { id } = req.body;
    const video = await Video.findById(id);
    let { user } = req;
    user.watchlater.push(id);
    user = await user.save();
    res.json({ status: "SUCCESS", message: `Video ${id} added to watchlater`, watchlater: user.watchlater });
  } catch (err) {
    next(err)
  }
}

const removeFromWatchlater = async (req, res, next) => {
  try {
    const { vId } = req.params
    const { video } = req;
    let { user } = req;
    const index = user.watchlater.findIndex((video) => video._id === vId);
    if (index > -1) {
      user.watchlater.splice(index, 1);
      user = await user.save();
      return res.json({ status: "SUCCESS", message: `Video ${vId} deleted from watch later` })
    }
    throw new HttpError(404, "Video doesn't exist in watch later");
  } catch (err) {
    next(err);
  }
}

module.exports = { getWatchlaterVideos, saveToWatchlater, removeFromWatchlater };