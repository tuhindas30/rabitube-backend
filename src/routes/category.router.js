const express = require("express");
const router = express.Router();
const { Category } = require("../models/category.model");
const CategoryController = require("../controllers/category.controller");

router.param("categoryId", CategoryController.findCategory);

router.route("/")
  .get(CategoryController.getAllCategories)
  .post(CategoryController.createNewCategory);

router.route("/:categoryId")
  .get(CategoryController.getCategory)
  .delete(CategoryController.deleteCategory);

module.exports = router;