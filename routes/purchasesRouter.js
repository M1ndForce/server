const express = require("express");
const router = express.Router();
const {
  purchasesController: { createPurchase },
} = require("../controllers/index");

router.post("/", createPurchase);

module.exports = router;
