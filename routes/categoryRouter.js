const router = require("express").Router();

const {
  categoryController: {
    addCategory,
    clearCategory,
    updateCategory,
    listOfCategories,
  },
} = require("../controllers");

router.post("/", addCategory);
router.put("/", updateCategory);
router.delete("/", clearCategory);
router.get("/", listOfCategories);

module.exports = router;
