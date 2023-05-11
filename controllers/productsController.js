const Product = require("../models/product");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of products and category counts (in parallel)
  const [numProducts, numCategories] = await Promise.all([
    Product.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Game Base Home",
    product_count: numProducts,
    category_count: numCategories,
    url: req.url,
  });
});

// Display list of all products.
exports.product_list = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find({}).exec();

  res.render("product_list", {
    title: "Games List",
    product_list: allProducts,
  });
});

// Get all categories
async function getCategoryById(categoryId) {
  const category = await Category.findById(categoryId).exec();
  return category ? category.name : "All";
}

// Display detail page for a specific product.
exports.product_detail = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .exec();

  if (product === null) {
    const err = new Error("Game not found");
    err.status = 404;
    return next(err);
  }

  const categoryName = await getCategoryById(product.category);

  res.render("product_detail", {
    name: product.name,
    product: product,
    categoryName: categoryName,
  });
});

// Display product create form on GET
exports.product_create_get = asyncHandler(async (req, res, next) => {
  let product = new Product();

  const allProducts = await Product.find().exec();
  const allCategories = await Category.find().populate("name").exec();

  res.render("product_form", {
    title: "Create Product",
    products: allProducts,
    category: allCategories,
  });
});
