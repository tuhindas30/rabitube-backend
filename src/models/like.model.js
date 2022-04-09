const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const LikedItemSchema = new Schema(
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

const LikeSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      index: true,
    },
    items: [LikedItemSchema],
  },
  {
    timestamps: true,
  }
);

const Like = model("Like", LikeSchema);

module.exports = { Like };
