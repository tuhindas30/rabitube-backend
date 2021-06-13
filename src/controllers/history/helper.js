const { History } = require("../../models/history.model");

const findHistoryByUserId = async (userId) => {
  const history = await History.findOne({ user: userId }).populate(
    "items.video"
  );
  return history;
};

const handleDuplicateHistoryItems = async (history, videoId) => {
  const itemIndex = history.items.findIndex(
    (item) => item.video._id === videoId
  );
  if (itemIndex > -1) {
    history.items.splice(itemIndex, 1);
    history.items.unshift({ video: videoId });
    await history.populate("items.video").execPopulate();
    await history.save();
    return;
  }
  history.items.unshift({ video: videoId });
  await history.populate("items.video").execPopulate();
  await history.save();
  return;
};

const createNewHistory = async (userId, videoId) => {
  const newHistory = new History({
    user: userId,
    items: [{ video: videoId }],
  });
  await newHistory.populate("items.video").execPopulate();
  await newHistory.save();
  return newHistory;
};

module.exports = {
  findHistoryByUserId,
  handleDuplicateHistoryItems,
  createNewHistory,
};
