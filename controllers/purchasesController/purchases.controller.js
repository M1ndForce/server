const text = require("../../const/text");
const {
  getCategoryRecordFromDB,
  savePurchaseRecordToDB,
  updateSnackCountInCategory,
  getCategoryPriceByName,
} = require("../../services/purchase.service");

class PurchasesController {
  async createPurchase(req, res) {
    try {
      const item = await getCategoryPriceByName({ name: req.body?.name });
      if (!item) {
        throw new Error("No item for purchase");
      }
      const itemToSave = {
        name: req.body?.name,
        date: req.body?.date,
        price: item?.price,
      };
      const snackData = await getCategoryRecordFromDB({
        name: `${req.body?.name}`,
      });
      if (snackData?.count > 0) {
        await updateSnackCountInCategory(
          { name: `${req.body?.name}` },
          { count: snackData?.count - 1 }
        );
        const purchase = await savePurchaseRecordToDB(itemToSave);
        res.json(purchase);
      } else if (snackData?.count === 0) {
        res.json({ name: text.NO_ITEMS });
      }
    } catch (e) {
      res.json({
        message: e.message,
        statusCode: 404,
      });
    }
  }
}

module.exports = new PurchasesController();
