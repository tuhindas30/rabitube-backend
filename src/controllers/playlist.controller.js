const { HttpError } = require("../utils/helper");

const getAllPlaylists = (req, res) => {
  let { user } = req;
  res.json({ status: "SUCCESS", playlists: user.playlists });
};

const createNewPlaylist = async (req, res, next) => {
  try {
    const { title } = req.body;
    let { user } = req;
    user.playlists.push({ title });
    user = await user.save();
    res.json({
      status: "SUCCESS",
      message: "Playlist added successfully",
      playlists: user.playlists,
    });
  } catch (err) {
    next(err);
  }
};

const findPlaylist = async (req, res, next, pId) => {
  const { user } = req;
  const playlist = user.playlists.find((playlist) => playlist._id == pId);
  if (!playlist) {
    throw new HttpError(404, "Playlist does not exist");
  }
  req.playlist = playlist;
  next();
};

const deletePlaylist = async (req, res, next) => {
  try {
    const { pId } = req.params;
    let { user } = req;
    const index = user.playlists.findIndex((playlist) => playlist._id == pId);
    if (index > -1) {
      user.playlists.splice(index, 1);
      user = await user.save();
      return res.json({
        status: "SUCCESS",
        message: `Playlist ${pId} deleted`,
      });
    }
    throw new HttpError(404, "Playlist does not exist");
  } catch (err) {
    next(err);
  }
};

const getPlaylistVideos = (req, res) => {
  const { pId } = req.params;
  const { playlist } = req;
  res.json({ status: "SUCCESS", playlist });
};

const saveToPlaylist = async (req, res, next) => {
  try {
    const { id } = req.body;
    let { user } = req;
    const { playlist } = req;
    playlist.videos.push(id);
    user = await user.save();
    res.json({
      status: "SUCCESS",
      message: `Video ${id} added to playlist ${playlist._id}`,
      playlists: user.playlists,
    });
  } catch (err) {
    next(err);
  }
};

const deletePlaylistVideo = async (req, res, next) => {
  try {
    const { pId } = req.params;
    const { vId } = req.params;
    let { user } = req;
    const { video } = req;
    const { playlist } = req;
    const index = playlist.videos.findIndex((video) => video._id === vId);
    if (index > -1) {
      playlist.videos.splice(index, 1);
      user = await user.save();
      return res.json({ status: "SUCCESS", message: `Video ${vId} deleted` });
    }
    throw new HttpError(404, `Video doesn't exist in playlist ${pId}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPlaylists,
  createNewPlaylist,
  findPlaylist,
  deletePlaylist,
  getPlaylistVideos,
  saveToPlaylist,
  deletePlaylistVideo,
};
