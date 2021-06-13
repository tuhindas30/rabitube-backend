const { Playlist } = require("../../models/playlist.model");
const { HttpError } = require("../../utils/helper");

const findPlaylistCollectionByUserId = async (userId) => {
  const playlists = await Playlist.findOne({ user: userId });
  return playlists;
};

const findPlaylistByPlaylistId = (playlistCollection, playlistId) => {
  const playlist = playlistCollection.playlists.find(
    (playlist) => playlist._id == playlistId
  );
  if (!playlist) {
    throw new HttpError(404, `Playlist ${playlistId} does not exists`);
  }
  return playlist;
};

const createNewPlaylistCollection = async (userId, title) => {
  const newPlaylistCollection = new Playlist({
    user: userId,
    playlists: [{ title }],
  });
  await newPlaylistCollection.populate("playlists.items.video").execPopulate();
  await newPlaylistCollection.save();
  return newPlaylistCollection;
};

module.exports = {
  findPlaylistCollectionByUserId,
  findPlaylistByPlaylistId,
  createNewPlaylistCollection,
};
