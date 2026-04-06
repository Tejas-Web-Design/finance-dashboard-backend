//middlewares/checkActive.js
const db = require("../config/db");

module.exports = async (req, res, next) => {
  const [user] = await db.query(
    "SELECT status FROM users WHERE id=?",
    [req.user.id]
  );

  if (!user.length || user[0].status === "inactive") {
    return res.status(403).json({ message: "User inactive" });
  }

  next();
};