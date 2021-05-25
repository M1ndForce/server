const purchaseModel = require("../models/Purchase");
const categoryModel = require("../models/Category");

class PurchaseService {
  async getCategoryRecordFromDB(purchaseData) {
    return categoryModel.findOne(purchaseData);
  }

  async savePurchaseRecordToDB(purchaseData) {
    return new purchaseModel(purchaseData).save();
  }

  async updateSnackCountInCategory(purchaseData, snackCount) {
    await categoryModel.findOneAndUpdate(purchaseData, snackCount);
  }

  async getCategoryPriceByName(data) {
    return categoryModel.findOne(data);
  }
}

module.exports = new PurchaseService();
