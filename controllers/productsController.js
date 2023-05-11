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

// Handle product create on POST
exports.product_create_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  // Validate and sanitize fields
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category.*").escape(),
  body("price", "Price must not be 0").trim().isLength({ min: 1 }).escape(),
  body("number_of_items", "Number of items must not be 0")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_of_items: req.body.number_of_items,
    });

    if (!errors.isEmpty()) {
      const [allProducts, allCategories] = await Promise.all([
        Product.find().exec(),
        Category.find().populate("name").exec(),
      ]);

      // Mark our selected genres as checked.
      for (const category of allCategories) {
        if (product.category.indexOf(category._id) > -1) {
          category.checked = "true";
        }
      }

      res.render("product_form", {
        title: "Create Product",
        products: allProducts,
        cateogies: allCategories,
        product: product,
        errors: errors.array(),
      });
    } else {
      await product.save();
      res.redirect(product.url);
    }
  }),
];

// Display delete product form on GET
exports.product_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of all products
  const product = await Product.findById(req.params.id)
    .populate("name")
    .populate("category")
    .exec();

  if (product === null) {
    res.redirect("/catalog/products");
  }

  res.render("product_delete", {
    title: "Delete Game",
    product: product,
  });
});

// Handle delete product on POST
exports.product_delete_post = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  .exec();

  if (product === null) {
    res.redirect("/catalog/products");
  } else {
    await Product.findByIdAndRemove(req.params.id);
    res.redirect("/catalog/products");
  }
});
