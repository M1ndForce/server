const {
  addcategory,
  findCategory,
  updateItemsLeft,
  findAndDeleteWhereCountZero,
  findAndReturnItemsWhereCountZero,
  findAllCategories,
} = require("../../services/category.service");
const sortByItemsLeft = require("../../helpers/listHelper");

class CategoryController {
  async addCategory(req, res) {
    try {
      const newCategory = req.body;

      const isCategoryAlreadyExists = await findCategory({
        name: newCategory.name,
      });
      if (isCategoryAlreadyExists) {
        throw new Error("Category already exists");
      }
      const result = await addcategory(newCategory);

      res.json(result);
    } catch (e) {
      res.json({
        message: e.message,
        statusCode: 400,
      });
    }
  }
  async updateCategory(req, res) {
    try {
      const updateData = req.body;
      const foundItem = await findCategory({ name: updateData.name });
      if (!foundItem) {
        throw new Error("Category not found");
      }
      const updatedItem = await updateItemsLeft(
        { name: foundItem.name },
        {
          count: foundItem.count + updateData.count,
        }
      );
      res.json(updatedItem);
    } catch (e) {
      res.json({
        message: e.message,
        statusCode: 400,
      });
    }
  }
  async clearCategory(req, res) {
    try {
      const result = await findAndReturnItemsWhereCountZero();

      if (!result?.length) {
        throw new Error("Nothing to clear");
      }

      await findAndDeleteWhereCountZero();

      res.json(result);
    } catch (e) {
      res.json({
        message: e.message,
        statusCode: 404,
      });
    }
  }
  async listOfCategories(req, res) {
    try {
      const allCategories = await findAllCategories();
      const result = sortByItemsLeft(allCategories);
      res.json(result);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new CategoryController();
