const { Video } = require("../models/video.model");
const {HttpError} = require("../utils/helper");

const getLikedVideos = (req, res) => {
  const { user } = req;
  res.json({ status: "SUCCESS", liked: user.liked })
}

const saveToLike = async (req, res, next) => {
  try {
    const { id } = req.body;
    const video = await Video.findById(id);
    let { user } = req;
    user.liked.push(id);
    user = await user.save();
    res.json({ status: "SUCCESS", message: `Video ${id} added to liked `, liked: user.liked })
  } catch (err) {
    next(err)
  }
}

const removeFromLiked = async (req, res, next) => {
  try {
      const { vId } = req.params
      const { video } = req;
      let { user } = req;
      const index = user.liked.findIndex((video) => video._id === vId);
      if (index > -1) {
        user.liked.splice(index, 1);
        user = await user.save();
        return res.json({ status: "SUCCESS", message: `Video ${vId} deleted from liked` })
      } 
      throw new HttpError(401, "Video doesn't exist in liked");
    } catch (err) {
      next(err)
    }
}

module.exports = { getLikedVideos, saveToLike, removeFromLiked }