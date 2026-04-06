const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  updateUserStatus,
} = require("../controllers/userController");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validationMiddleware");

const { userValidator } = require("../validators/userValidator");


// ======================
// 🔹 CREATE USER
// ======================
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Tejasri
 *             email: tejas@test.com
 *             password: 12345
 *             role: viewer
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post("/", validate(userValidator), createUser);


// ======================
// 🔹 LOGIN USER
// ======================
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: tejas@test.com
 *             password: 12345
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginUser);


// ======================
// 🔹 UPDATE USER STATUS
// ======================
/**
 * @swagger
 * /api/users/{id}/status:
 *   put:
 *     summary: Update user status (active/inactive)
 *     description: Admin can activate or deactivate a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             status: active
 *     responses:
 *       200:
 *         description: User status updated successfully
 */
router.put("/:id/status", auth, role(["admin"]), updateUserStatus);


// ======================
// 🔹 GET PROFILE
// ======================
router.get("/profile", auth, (req, res) => {
  res.json({
    message: "Protected route ✅",
    user: req.user,
  });
});


// ======================
// 🔹 ADMIN ONLY ROUTE
// ======================
router.get("/admin", auth, role(["admin"]), (req, res) => {
  res.send("Admin only access 🔐");
});


// ======================
// 🔹 GET ALL USERS
// ======================
router.get("/", auth, role(["admin"]), async (req, res) => {
  const db = require("../config/db"); // ✅ FIX: import db
  const [users] = await db.query(
    "SELECT id, name, email, role, status FROM users"
  );
  res.json(users);
});


// ======================
// 🔹 UPDATE USER ROLE
// ======================
router.put("/:id/role", auth, role(["admin"]), async (req, res) => {
  const db = require("../config/db"); 
  const { role: newRole } = req.body;

  await db.query("UPDATE users SET role=? WHERE id=?", [
    newRole,
    req.params.id,
  ]);

  res.json({ message: "Role updated ✅" });
});


module.exports = router;