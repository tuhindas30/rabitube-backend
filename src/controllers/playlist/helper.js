const { Playlist } = require("../../models/playlist.model");
const { HttpError } = require("../../utils/helper");

const findPlaylistCollectionByUserId = async (userId) => {
  const playlists = await Playlist.findOne({ user: userId }).populate(
    "playlists.items.video"
  );
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

const createNewAndAddToPlaylist = async (collection, title, videoId) => {
  collection.playlists.push({ title, items: [{ video: videoId }] });
  await collection.populate("playlists.items.video").execPopulate();
  await collection.save();
  return collection;
};

const createNewPlaylistCollection = async (userId, title, videoId) => {
  const newPlaylistCollection = new Playlist({
    user: userId,
    playlists: [
      {
        title,
        items: [{ video: videoId }],
      },
    ],
  });
  await newPlaylistCollection.populate("playlists.items.video").execPopulate();
  await newPlaylistCollection.save();
  return newPlaylistCollection;
};

module.exports = {
  findPlaylistCollectionByUserId,
  findPlaylistByPlaylistId,
  createNewAndAddToPlaylist,
  createNewPlaylistCollection,
};
