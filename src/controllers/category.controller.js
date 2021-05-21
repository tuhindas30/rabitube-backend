const { Category } = require("../models/category.model");
const { HttpError } = require("../utils/helper");

const getAllCategories = async (_, res, next) => {
  try {
    const categories = await Category.find({});

    if (!categories) {
      throw new HttpError(404, "No categories exists");
    }
    return res.json({ status: "SUCCESS", message: "Categories found", categories });
  } catch (err) {
    next(err);
  }
}

const findCategory = async (req, res, next, categoryId) => {
  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new HttpError(401, "Category does not exist");
    }
    req.category = category;
    next();
  } catch (err) {
    next(err);
  }
}


const getCategory = async (req, res, next) => {
  let { category } = req;
  category.__v = undefined;
  res.json({ status: "SUCCESS", message: "Category found", category })
}

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const deletedItem = await Category.findByIdAndDelete(categoryId);
    res.json({ status: "SUCCESS", message: `Category ${categoryId} deleted successfully` })
  } catch (err) {
    next(err);
  }
}

const createNewCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const newCategory = await new Category({ title }).save();
    res.json({ status: "SUCCESS", message: "Category created successfully", category: newCategory });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllCategories, findCategory, getCategory, deleteCategory, createNewCategory };