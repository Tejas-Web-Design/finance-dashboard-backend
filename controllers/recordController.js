//controller/recordController.js
const db = require("../config/db");

exports.createRecord = async (req, res, next) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    await db.query(
      "INSERT INTO records (user_id,amount,type,category,date,notes) VALUES (?,?,?,?,?,?)",
      [req.user.id, amount, type, category, date, notes]
    );

    res.status(201).json({ message: "Record created successfully ✅" });
  } catch (err) {
  next(err);
}
};

exports.getRecords = async (req, res, next) => {
  try {
    const { type, date, category, search = "", page = 1, limit = 5 } = req.query;
    

    let query = "SELECT * FROM records WHERE deleted_at IS NULL";
    let values = [];

    if (type) {
      query += " AND type = ?";
      values.push(type);
    }

    if (category) {
      query += " AND category = ?";
      values.push(category);
    }

    if (search) {
      query += " AND (category LIKE ? OR notes LIKE ?)";
      values.push(`%${search}%`, `%${search}%`);
    }

    

    if (date) {
      query += " AND DATE(date) = ?";
      values.push(date);
    }

    const offset = (page - 1) * limit;

    query += " LIMIT ? OFFSET ?";
    values.push(Number(limit), Number(offset));

    const [data] = await db.query(query, values);

    res.json(data);
  } catch (err) {
  next(err);
}
};
exports.deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    await db.query(
      "UPDATE records SET deleted_at = NOW() WHERE id =  ?",
      [id]
    );

    res.json({ message: "Record deleted (soft) ✅" });
  } catch (err) {
  next(err);
}
};


exports.updateRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, type, category, date, notes } = req.body;

    await db.query(
      `UPDATE records 
       SET amount=?, type=?, category=?, date=?, notes=? 
       WHERE id=?`,
      [amount, type, category, date, notes, id]
    );

    res.json({ message: "Record updated ✅" });
  } catch (err) {
  next(err);
}
};