const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, maxLenght: 250 },
});

// Virtual for category`s URL
CategorySchema.virtual("url").get(() => {
  return `/catalog/category/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);