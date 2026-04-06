//controller/userController.js
const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
      [name, email, hash, role]
    );

    res.status(201).json({ message: "User created successfully ✅" });
  } catch (err) {
  next(err);
}
};

const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (!users.length) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ message: "Login success ✅", token });
  } catch (err) {
  next(err);
}
};

exports.updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query(
      "UPDATE users SET status=? WHERE id=?",
      [status, id]
    );

    res.json({ message: "User status updated ✅" });
  } catch (err) {
  next(err);
}
}; 