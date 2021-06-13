const { HttpError } = require("../../utils/helper");
const { doesVideoExist } = require("../helper");
const {
  findPlaylistCollectionByUserId,
  createNewPlaylistCollection,
  findPlaylistByPlaylistId,
} = require("./helper");

const getPlaylistCollectionByUserId = async (req, res, next) => {
  const { userId } = req;
  try {
    const playlistCollection = await findPlaylistCollectionByUserId(userId);
    if (!playlistCollection) {
      throw new HttpError(404, "No playlist collection found");
    }
    res.json({
      status: "SUCCESS",
      data: playlistCollection,
      message: "Playlist found",
    });
  } catch (err) {
    next(err);
  }
};

const getPlaylistByPlaylistId = async (req, res, next) => {
  const { userId } = req;
  const { playlistId } = req.params;
  try {
    const playlistCollection = await findPlaylistCollectionByUserId(userId);
    const playlist = findPlaylistByPlaylistId(playlistCollection, playlistId);
    await playlistCollection.populate("playlists.items.video").execPopulate();
    return res.json({
      status: "SUCCESS",
      data: playlist,
      message: "Playlist found",
    });
  } catch (err) {
    next(err);
  }
};

const createNewPlaylist = async (req, res, next) => {
  const { userId } = req;
  const { title } = req.body;
  try {
    const playlistCollection = await findPlaylistCollectionByUserId(userId);
    if (playlistCollection) {
      playlistCollection.playlists.push({ title });
      await playlistCollection.populate("playlists.items.video").execPopulate();
      await playlistCollection.save();
      return res.json({
        status: "SUCCESS",
        data: playlistCollection,
        message: `Playlist created with title ${title}`,
      });
    }
    const newPlaylistCollection = await createNewPlaylistCollection(
      userId,
      title
    );
    return res.json({
      status: "SUCCESS",
      data: newPlaylistCollection,
      message: `New playlist collection created with playlist ${title} successfully`,
    });
  } catch (err) {
    next(err);
  }
};

const addToPlaylist = async (req, res, next) => {
  const { userId } = req;
  const { playlistId } = req.params;
  const { videoId } = req.body;
  try {
    await doesVideoExist(videoId);
    const playlistCollection = await findPlaylistCollectionByUserId(userId);
    if (!playlistCollection) {
      throw new HttpError(404, "No playlist collection found");
    }
    const playlist = findPlaylistByPlaylistId(playlistCollection, playlistId);
    if (playlist.items.some((item) => item.video === videoId)) {
      await playlistCollection.populate("playlists.items.video").execPopulate();
      return res.json({
        status: "SUCCESS",
        data: playlistCollection,
        message: `Video ${videoId} already present in playlist ${playlistId}`,
      });
    }
    playlist.items.push({ video: videoId });
    await playlistCollection.populate("playlists.items.video").execPopulate();
    await playlistCollection.save();
    return res.json({
      status: "SUCCESS",
      data: playlistCollection,
      message: `Video ${videoId} added to playlist ${playlistId} successfully`,
    });
  } catch (err) {
    next(err);
  }
};

const removeFromPlaylist = async (req, res, next) => {
  const { userId } = req;
  const { playlistId } = req.params;
  const { videoId } = req.params;
  try {
    await doesVideoExist(videoId);
    const playlistCollection = await findPlaylistCollectionByUserId(userId);
    if (!playlistCollection) {
      throw new HttpError(404, "No playlist collection found");
    }
    const playlist = findPlaylistByPlaylistId(playlistCollection, playlistId);
    const itemIndex = playlist.items.findIndex((item) => item.video == videoId);
    if (itemIndex > -1) {
      playlist.items.splice(itemIndex, 1);
      await playlistCollection.populate("playlists.items.video").execPopulate();
      await playlistCollection.save();
      return res.json({
        status: "SUCCESS",
        data: playlistCollection,
        message: `Video ${videoId} removed from playlist ${playlistId}`,
      });
    }
    throw new HttpError(
      404,
      `Video ${videoId} does not exist in playlist ${playlistId}`
    );
  } catch (err) {
    next(err);
  }
};

const deletePlaylist = async (req, res, next) => {
  const { playlistId } = req.params;
  const { userId } = req;
  try {
    const playlistCollection = await findPlaylistCollectionByUserId(userId);
    if (!playlistCollection) {
      throw new HttpError(404, "No playlist collection found");
    }
    const itemIndex = playlistCollection.playlists.findIndex(
      (playlist) => playlist._id == playlistId
    );
    if (itemIndex > -1) {
      playlistCollection.playlists.splice(itemIndex, 1);
      await playlistCollection.populate("playlists.items.video").execPopulate();
      await playlistCollection.save();
      return res.json({
        status: "SUCCESS",
        data: playlistCollection,
        message: `Playlist ${playlistId} deleted successfully`,
      });
    }
    throw new HttpError(404, `No playlist found with id: ${playlistId}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPlaylistCollectionByUserId,
  getPlaylistByPlaylistId,
  createNewPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  deletePlaylist,
};
