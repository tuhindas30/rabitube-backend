const mongoose = require("mongoose");
const { Schema } = mongoose;

const VideoSchema = new Schema({
  _id: {
    type: String,
    required: "Cannot have a video without its ID",
    unique: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  avatar: String,
  title: {
    type: String,
    required: "Cannot have a video without its title",
    maxLength: 100
  },
  views: String,
  channel: {
    type: String,
    required: "Cannot have a video without its channel name",
    maxLength: 50
  },
  postedOn: {
    type: String,
    required: "Cannot have a video without its posting time",
  },
  subscriber: String,
  duration: String,
  description: {
    type: String,
    maxLength: 2000
  }
})

const Video = mongoose.model("Video", VideoSchema)

module.exports = { Video }