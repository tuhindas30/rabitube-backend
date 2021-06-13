const { HttpError } = require("../../utils/helper");
const {
  findLikedPlaylistByUserId,
  handleDuplicateLikedItems,
  createNewLikedPlaylist,
} = require("./helper");
const { doesVideoExist } = require("../helper");

const getLikedPlaylistByUserId = async (req, res, next) => {
  const { userId } = req;
  try {
    const likedPlaylist = await findLikedPlaylistByUserId(userId);
    if (!likedPlaylist) {
      throw new HttpError(404, "No liked playlist found");
    }
    res.json({
      status: "SUCCESS",
      data: likedPlaylist,
      message: "Liked playlist found",
    });
  } catch (err) {
    next(err);
  }
};

const saveOrRemoveLikedItems = async (req, res, next) => {
  const { videoId } = req.body;
  const { userId } = req;
  try {
    await doesVideoExist(videoId);
    const likedPlaylist = await findLikedPlaylistByUserId(userId);
    if (likedPlaylist) {
      await handleDuplicateLikedItems(likedPlaylist, videoId);
      return res.json({
        status: "SUCCESS",
        data: likedPlaylist,
        message: `Video ${videoId} added/removed to/from liked playlist`,
      });
    }
    const newLikedPlaylist = await createNewLikedPlaylist(userId, videoId);
    return res.json({
      status: "SUCCESS",
      data: newLikedPlaylist,
      message: `New liked playlist created with video ${videoId}`,
    });
  } catch (err) {
    next(err);
  }
};

const removeFromLikedPlaylist = async (req, res, next) => {
  const { videoId } = req.params;
  let { userId } = req;
  try {
    await doesVideoExist(videoId);
    let likedPlaylist = await findLikedPlaylistByUserId(userId);
    if (!likedPlaylist) {
      throw new HttpError(404, "No liked playlist found");
    }
    const itemIndex = likedPlaylist.items.findIndex(
      (item) => item.video._id == videoId
    );
    if (itemIndex > -1) {
      likedPlaylist.items.splice(itemIndex, 1);
      await likedPlaylist.populate("items.video").execPopulate();
      await likedPlaylist.save();
      return res.json({
        status: "SUCCESS",
        data: likedPlaylist,
        message: `Video ${videoId} removed from liked playlist successfully`,
      });
    }
    throw new HttpError(404, "Video does not exist in liked playlist");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getLikedPlaylistByUserId,
  saveOrRemoveLikedItems,
  removeFromLikedPlaylist,
};
