const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const VideoItemSchema = new Schema(
  {
    video: {
      type: String,
      ref: "Video",
    },
  },
  {
    _id: false,
  }
);

const PlaylistItemSchema = new Schema({
  title: {
    type: String,
    required: "Cannot have playlist without its name",
    trim: true,
  },
  items: [VideoItemSchema],
});

const PlaylistCollectionSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      index: true,
    },
    playlists: [PlaylistItemSchema],
  },
  {
    timestamps: true,
  }
);

const Playlist = model("Playlist", PlaylistCollectionSchema);

module.exports = { Playlist };
