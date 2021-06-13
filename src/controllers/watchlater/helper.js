const { Watchlater } = require("../../models/watchlater.model");

const findWatchlaterByUserId = async (userId) => {
  const watchlater = await Watchlater.findOne({ user: userId }).populate(
    "items.video"
  );
  return watchlater;
};

const createNewWatchlater = async (userId, videoId) => {
  let newWatchlater = new Watchlater({
    user: userId,
    items: [
      {
        video: videoId,
      },
    ],
  });
  await newWatchlater.populate("items.video").execPopulate();
  await newWatchlater.save();
  return newWatchlater;
};

module.exports = {
  findWatchlaterByUserId,
  createNewWatchlater,
};
