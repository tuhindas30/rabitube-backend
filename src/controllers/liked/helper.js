const { Like } = require("../../models/like.model");

const findLikedPlaylistByUserId = async (userId) => {
  const likedPlaylist = await Like.findOne({ user: userId }).populate(
    "items.video"
  );
  return likedPlaylist;
};

const handleDuplicateLikedItems = async (likedPlaylist, videoId) => {
  const itemIndex = likedPlaylist.items.findIndex(
    (item) => item.video._id === videoId
  );
  if (itemIndex > -1) {
    likedPlaylist.items.splice(itemIndex, 1);
    await likedPlaylist.populate("items.video").execPopulate();
    await likedPlaylist.save();
    return;
  }
  likedPlaylist.items.push({ video: videoId });
  await likedPlaylist.populate("items.video").execPopulate();
  await likedPlaylist.save();
  return;
};

const createNewLikedPlaylist = async (userId, videoId) => {
  let newLikedPlaylist = new Like({
    user: userId,
    items: [
      {
        video: videoId,
      },
    ],
  });
  await newLikedPlaylist.populate("items.video").execPopulate();
  await newLikedPlaylist.save();
  return newLikedPlaylist;
};

module.exports = {
  findLikedPlaylistByUserId,
  handleDuplicateLikedItems,
  createNewLikedPlaylist,
};
