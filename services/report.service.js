const purchaseModel = require("../models/Purchase");

class reportService {
  async getAllReportsSortedByDate() {
    return purchaseModel.find().sort({ date: -1 });
  }
  async getCategoryPriceByName(data) {
    return purchaseModel.findOne(data);
  }
}

module.exports = new reportService();
