const router = require("express").Router();

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const checkActive = require("../middlewares/checkActive");
const validate = require("../middlewares/validationMiddleware");

const { recordValidator } = require("../validators/recordValidator");

const {
  createRecord,
  getRecords,
  deleteRecord,
  updateRecord,
} = require("../controllers/recordController");


// ======================
// 🔹 CREATE RECORD
// ======================
/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create financial record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 5000
 *             type: income
 *             category: Salary
 *             date: 2026-04-02
 *             notes: Monthly salary
 *     responses:
 *       200:
 *         description: Record created successfully
 */
router.post(
  "/",
  auth,
  checkActive,
  role(["admin"]),
  validate(recordValidator),
  createRecord
);


// ======================
// 🔹 GET RECORDS
// ======================
/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all financial records
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword (category/type)
 *     responses:
 *       200:
 *         description: List of records
 */
router.get(
  "/",
  auth,
  checkActive,
  role(["admin", "analyst", "viewer"]),
  getRecords
);


// ======================
// 🔹 UPDATE RECORD
// ======================
/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a financial record
 *     tags: [Records]
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
 *             amount: 6000
 *             category: Freelance
 *     responses:
 *       200:
 *         description: Record updated successfully
 */
router.put(
  "/:id",
  auth,
  checkActive,
  role(["admin"]),
  updateRecord
);


// ======================
// 🔹 DELETE RECORD
// ======================
/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record deleted successfully
 */
router.delete(
  "/:id",
  auth,
  checkActive,
  role(["admin"]),
  deleteRecord
);


module.exports = router;