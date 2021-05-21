const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: "Cannot have a user without a username",
    unique: true
  },
  email: {
    type: String,
    required: "Cannot enter a user without email",
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: "Cannot have a user without a password",
    trim: true
  },
  liked: [{
    type: Schema.Types.ObjectId,
    ref: "Video"
  }],
  watchlater: [{
    type: Schema.Types.ObjectId,
    ref: "Video"
  }],
  playlists: [{
    title: {
      type: String,
      required: "Cannot have playlist without its name"
    },
    videos: [{
      type: Schema.Types.ObjectId,
      ref: "Video"
    }]
  }]
})

const User = mongoose.model("User", UserSchema);

module.exports = { User }