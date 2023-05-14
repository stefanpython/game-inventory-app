const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const product_controller = require("../controllers/productsController");

/// PRODUCT ROUTES ///

// Get catalog home page
router.get("/", product_controller.index);

// GET request for creating a Product.
router.get("/product/create", product_controller.product_create_get);

// POST request for creating product
router.post("/product/create", product_controller.product_create_post);

// GET request to delete product
router.get("/product/:id/delete", product_controller.product_delete_get);

// POST request to delete product
router.post("/product/:id/delete", product_controller.product_delete_post);

// GET request to update product
router.get("/product/:id/update", product_controller.product_update_get);

// POST request to update product
router.post("/product/:id/update", product_controller.product_update_post);

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
router.get("/categories", category_controller.category_list);

module.exports = router;
