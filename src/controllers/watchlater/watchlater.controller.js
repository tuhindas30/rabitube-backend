const { HttpError } = require("../../utils/helper");
const { doesVideoExist } = require("../helper");
const { findWatchlaterByUserId, createNewWatchlater } = require("./helper");

const getWatchlaterByUserId = async (req, res, next) => {
  const { userId } = req;
  try {
    const watchlater = await findWatchlaterByUserId(userId);
    if (!watchlater) {
      throw new HttpError(404, "No watchlater videos found");
    }
    res.json({
      status: "SUCCESS",
      data: watchlater,
      message: "Watchlater videos found",
    });
  } catch (err) {
    next(err);
  }
};

const saveToWatchlater = async (req, res, next) => {
  const { videoId } = req.body;
  const { userId } = req;
  try {
    await doesVideoExist(videoId);
    const watchlater = await findWatchlaterByUserId(userId);
    if (watchlater) {
      if (watchlater.items.some((item) => item.video._id === videoId)) {
        return res.json({
          status: "SUCCESS",
          data: watchlater,
          message: `Video ${videoId} already present in watchlater`,
        });
      }
      watchlater.items.push({ video: videoId });
      await watchlater.populate("items.video").execPopulate();
      await watchlater.save();
      return res.json({
        status: "SUCCESS",
        data: watchlater,
        message: `Video ${videoId} added to watchlater`,
      });
    }
    const newWatchlater = await createNewWatchlater(userId, videoId);
    return res.json({
      status: "SUCCESS",
      data: newWatchlater,
      message: `New watchlater created with video ${videoId}`,
    });
  } catch (err) {
    next(err);
  }
};

const removeFromWatchlater = async (req, res, next) => {
  let { userId } = req;
  const { videoId } = req.params;
  try {
    await doesVideoExist(videoId);
    let watchlater = await findWatchlaterByUserId(userId);
    if (!watchlater) {
      throw new HttpError(404, "No watchlater videos found");
    }
    const itemIndex = watchlater.items.findIndex(
      (item) => item.video._id == videoId
    );
    if (itemIndex > -1) {
      watchlater.items.splice(itemIndex, 1);
      await watchlater.populate("items.video").execPopulate();
      await watchlater.save();
      return res.json({
        status: "SUCCESS",
        data: watchlater,
        message: `Video ${videoId} removed from watchlater successfully`,
      });
    }
    throw new HttpError(404, "Video does not exist in watchlater");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getWatchlaterByUserId,
  saveToWatchlater,
  removeFromWatchlater,
};
