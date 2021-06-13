const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const WatchlaterItemSchema = new Schema(
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

const WatchlaterSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      index: true,
    },
    items: [WatchlaterItemSchema],
  },
  {
    timestamps: true,
  }
);

const Watchlater = model("Watchlater", WatchlaterSchema);

module.exports = { Watchlater };
