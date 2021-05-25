const {
  getAllReportsSortedByDate,
  getCategoryPriceByName,
} = require("../../services/report.service");
const calculateReport = require("../../helpers/calculateReportHelper");

class ReportController {
  async createReportFromDate(req, res) {
    try {
      if (req?.query?.date?.length < 10) {
        throw new Error("To short date");
      }

      const reportsArr = await getAllReportsSortedByDate();
      const reportResult = reportsArr.filter(
        (item) => item.date >= `${req?.query?.date}`
      );
      const result = await calculateReport(
        getCategoryPriceByName,
        reportResult
      );
      res.json(result);
    } catch (e) {
      res.json({
        message: e.message,
        statusCode: 404,
      });
    }
  }

  async createReport(req, res) {
    try {
      if (req?.query?.date?.length < 7) {
        throw new Error("To short date");
      }
      const reportsArr = await getAllReportsSortedByDate({
        name: req?.query?.name,
      });
      const reportResult = reportsArr?.filter((item) =>
        item.date.startsWith(`${req?.query?.date}`)
      );
      const result = await calculateReport(
        getCategoryPriceByName,
        reportResult
      );

      res.json(result);
    } catch (e) {
      res.json({
        message: e.message,
        statusCode: 404,
      });
    }
  }
}

module.exports = new ReportController();
