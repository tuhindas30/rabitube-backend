const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const VideoSchema = new Schema(
  {
    _id: {
      type: String,
      required: "Cannot have a video without its ID",
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: "Cannot have a video without its title",
      maxLength: [100, "Can't add more than 100 characters"],
    },
    description: {
      type: String,
      maxLength: [1000, "Can't add more than 1000 characters"],
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    channelName: {
      type: String,
      required: "Cannot have a video without its channel name",
      maxLength: [50, "Can't add more than 50 characters"],
    },
    avatarUrl: String,
    duration: String,
    viewCount: String,
    subscriberCount: String,
    uploadDate: {
      type: String,
      required: "Cannot have a video without its uploading date",
    },
  },
  {
    timestamps: true,
  }
);

const Video = model("Video", VideoSchema);

module.exports = { Video };
