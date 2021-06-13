const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const HistoryItemSchema = new Schema(
  {
    video: {
      type: String,
      ref: "Video",
    },
    lastViewed: {
      type: String,
      default: new Date().toDateString(),
    },
  },
  {
    _id: false,
  }
);

const HistorySchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      index: true,
    },
    items: [HistoryItemSchema],
  },
  {
    timestamps: true,
  }
);

const History = model("History", HistorySchema);

module.exports = { History };
