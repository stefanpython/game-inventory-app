const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, maxLenght: 100 },
  description: { type: String, maxLenght: 250 },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  price: Number,
  number_of_items: Number,
  image: { type: String }, // Add the image field
});

// Virtual for product`s URL
ProductSchema.virtual("url").get(function () {
  return `/catalog/product/${this._id}`;
});

// Populate name and description fields when querying products
ProductSchema.pre("find", function (next) {
  this.populate("name").populate("description");
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
