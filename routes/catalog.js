const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const product_controller = require("../controllers/productsController");

/// PRODUCT ROUTES ///

// Get catalog home page
router.get("/", product_controller.index);

// Get request for creating a Product.
router.get("/product/create", (req, res, next) => {
  res.send("IMPLEMENT CREATE GET PRODUCT");
});

// POST request for creating product
router.post("/product/create", (req, res, next) => {
  res.send("IMPLEMENT CREATE POST PRODUCT");
});

// GET request to delete product
router.get("/product/:id/delete", (req, res, next) => {
  res.send("IMPLEMENT GET DELETE PRODUCT");
});

// POST request to delete product
router.post("/product/:id/delete", (req, res, next) => {
  res.send("IMPLEMENT POST DELETE PRODUCT");
});

// GET request to update product
router.get("/product/:id/update", (req, res, next) => {
  res.send("IMPLEMENT GET UPDATE PRODUCT");
});

// POST request to update product
router.post("/product/:id/update", (req, res, next) => {
  res.send("IMPLEMENT GET UPDATE PRODUCT");
});

// GET request for one product
router.get("/product/:id", product_controller.product_detail);

// GET request for list of all products
router.get("/products", product_controller.product_list);

/// CATEGORY ROUTES ///

// Get request for creating a category.
router.get("/category/create", (req, res, next) => {
  res.send("IMPLEMENT CREATE GET CATEGORY");
});

// POST request for creating category
router.post("/category/create", (req, res, next) => {
  res.send("IMPLEMENT CREATE POST CATEGORY");
});

// GET request to delete category
router.get("/category/:id/delete", (req, res, next) => {
  res.send("IMPLEMENT GET DELETE CATEGORY");
});

// POST request to delete category
router.post("/category/:id/delete", (req, res, next) => {
  res.send("IMPLEMENT POST DELETE CATEGORY");
});

// GET request to update category
router.get("/category/:id/update", (req, res, next) => {
  res.send("IMPLEMENT GET UPDATE CATEGORY");
});

// POST request to update category
router.post("/category/:id/update", (req, res, next) => {
  res.send("IMPLEMENT GET UPDATE CATEGORY");
});

// GET request for one category
router.get("/category/:id", (req, res, next) => {
  res.send("IMPLEMENT GET ONE CATEGORY");
});

// GET request for list of all categories
router.get("/categories", (req, res, next) => {
  res.send("IMPLEMENT GET ALL CATEGORIES");
});

module.exports = router;
