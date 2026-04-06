//controller/dashboardController.js
const { getSummary } = require("../services/dashboardService");

exports.getDashboard = async (req, res, next) => {
  try {
    const data = await getSummary(req.user.id);
    res.json({
      success: true,
      data
    });
  } catch (err) {
  next(err);
}
};