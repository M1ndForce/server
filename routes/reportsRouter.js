const express = require("express");
const router = express.Router();
const {
  reportController: { createReport, createReportFromDate },
} = require("../controllers/index");

router.get("/report", createReport);

router.get("/reportfromdate", createReportFromDate);

module.exports = router;
