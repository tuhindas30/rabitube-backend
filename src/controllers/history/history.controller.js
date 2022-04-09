const { HttpError } = require("../../utils/helper");
const {
  findHistoryByUserId,
  handleDuplicateHistoryItems,
  createNewHistory,
} = require("./helper");
const { doesVideoExist } = require("../helper");

const getHistoryByUserId = async (req, res, next) => {
  const { userId } = req;
  try {
    const history = await findHistoryByUserId(userId);
    if (!history) {
      throw new HttpError(404, `No history found for the user ${userId}`);
    }
    res.json({
      status: "SUCCESS",
      data: history,
      message: "History found",
    });
  } catch (err) {
    next(err);
  }
};

const addToHistory = async (req, res, next) => {
  const { userId } = req;
  const { videoId } = req.body;
  try {
    await doesVideoExist(videoId);
    const history = await findHistoryByUserId(userId);
    if (history) {
      await handleDuplicateHistoryItems(history, videoId);
      return res.json({
        status: "SUCCESS",
        data: history,
        message: `Video ${videoId} added to history of user ${userId}`,
      });
    }
    const newHistory = await createNewHistory(userId, videoId);
    return res.json({
      status: "SUCCESS",
      data: newHistory,
      message: `New history created with video ${videoId} for user ${userId}`,
    });
  } catch (err) {
    next(err);
  }
};

const removeFromHistory = async (req, res, next) => {
  let { userId } = req;
  const { videoId } = req.params;
  try {
    await doesVideoExist(videoId);
    let history = await findHistoryByUserId(userId);
    if (!history) {
      throw new HttpError(404, `No history found found for the user ${userId}`);
    }
    const itemIndex = history.items.findIndex(
      (item) => item.video._id == videoId
    );
    if (itemIndex > -1) {
      history.items.splice(itemIndex, 1);
      await history.populate("items.video").execPopulate();
      await history.save();
      return res.json({
        status: "SUCCESS",
        data: history,
        message: `Video ${videoId} removed from history successfully`,
      });
    }
    throw new HttpError(404, "Video does not exist in history");
  } catch (err) {
    next(err);
  }
};

const removeUserHistory = async (req, res, next) => {
  const { userId } = req;
  const history = await findHistoryByUserId(userId);
  if (!history) {
    throw new HttpError(404, `No history found for the user ${userId}`);
  }
  history.items = [];
  await history.save();
  res.json({
    status: "SUCCESS",
    data: history,
    message: `All history deleted for the user ${userId}`,
  });
};

module.exports = {
  getHistoryByUserId,
  addToHistory,
  removeFromHistory,
  removeUserHistory,
};
