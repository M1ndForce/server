const categoryModel = require("../models/Category");

class CategoryService {
  async findCategory(data) {
    return categoryModel.findOne(data).exec();
  }
  async updateItemsLeft(name, count) {
    return categoryModel.findOneAndUpdate(name, count).exec();
  }
  async addcategory(data) {
    return new categoryModel(data).save();
  }
  async findAndDeleteWhereCountZero() {
    return categoryModel.deleteMany({ count: 0 });
  }
  async findAndReturnItemsWhereCountZero(){
    return categoryModel.find({ count: 0 });
  }
  async findAllCategories (){
    return categoryModel.find()
  }
}

module.exports = new CategoryService();
