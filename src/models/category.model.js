const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: "Cannot have a category without its name",
    unique: true
  }
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = { Category }