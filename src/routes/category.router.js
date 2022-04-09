const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/category/category.controller");

router
  .route("/")
  .get(CategoryController.getAllCategories)
  .post(CategoryController.createNewCategory);

router
  .route("/:id")
  .get(CategoryController.getCategoryById)
  .post(CategoryController.updateCategoryById)
  .delete(CategoryController.deleteCategoryById);

module.exports = router;
