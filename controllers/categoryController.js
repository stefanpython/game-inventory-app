const Product = require("../models/product");
const Category = require("../models/category");
const { body, validationResult } = "express-validator";
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}).sort({ name: 1 }).exec();

  res.render("category_list", {
    title: "Category List",
    category_list: allCategories,
  });
});
