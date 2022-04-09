const { Category } = require("../../models/category.model");

const doesCategoryExist = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new HttpError(404, "Category does not exist");
  }
  return category;
};

module.exports = { doesCategoryExist };
