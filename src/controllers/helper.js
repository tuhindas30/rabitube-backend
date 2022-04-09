const { User } = require("../models/user.model");
const { Video } = require("../models/video.model");
const { HttpError } = require("../utils/helper");

const doesVideoExist = async (videoId) => {
  const video = await Video.findById(videoId).populate("category");
  if (!video) {
    throw new HttpError(404, `Video ${videoId} does not exists`);
  }
  return video;
};

const doesUserExist = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, "User does not exist");
  }
  return user;
};

module.exports = {
  doesVideoExist,
  doesUserExist,
};
