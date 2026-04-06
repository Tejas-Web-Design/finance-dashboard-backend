//services/dashboard.js
const db = require("../config/db");

exports.getSummary = async (userId) => {

  // ✅ Total Income
  const [income] = await db.query(
    "SELECT SUM(amount) as total FROM records WHERE type='income' AND deleted_at IS NULL AND user_id=?",
    [userId]
  );

  // ✅ Total Expense
  const [expense] = await db.query(
    "SELECT SUM(amount) as total FROM records WHERE type='expense' AND deleted_at IS NULL AND user_id=?",
    [userId]
  );

  // ✅ Category-wise totals
  const [categories] = await db.query(`
    SELECT category, SUM(amount) as total
    FROM records
    WHERE deleted_at IS NULL AND user_id=?
    GROUP BY category
  `, [userId]);

  // ✅ Recent activity (last 5 records)
  const [recent] = await db.query(`
    SELECT id, amount, type, category, date, notes
    FROM records
    WHERE deleted_at IS NULL AND user_id=?
    ORDER BY created_at DESC
    LIMIT 5
  `, [userId]);

  // ✅ Monthly trends (income vs expense)
  const [monthly] = await db.query(`
    SELECT 
      DATE_FORMAT(date, '%Y-%m') as month,
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as income,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) as expense
    FROM records
    WHERE deleted_at IS NULL AND user_id=?
    GROUP BY month
    ORDER BY month DESC
  `, [userId]);

  return {
    totalIncome: income[0].total || 0,
    totalExpense: expense[0].total || 0,
    balance: (income[0].total || 0) - (expense[0].total || 0),

    categoryTotals: categories,
    recentTransactions: recent,
    monthlyTrends: monthly
  };
}; 