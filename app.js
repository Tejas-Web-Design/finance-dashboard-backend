const express = require("express");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");

const specs = require("./config/swagger");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();


// ======================
// 🔹 MIDDLEWARES
// ======================
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests, try again later",
});

app.use(limiter);


// ======================
// 🔹 API DOCUMENTATION
// ======================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/api-docs.json", (req, res) => {
  res.json(specs);
});


// ======================
// 🔹 ROUTES
// ======================
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));


// ======================
// 🔹 SERVER CHECK
// ======================
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});


// ======================
// 🔹 ERROR HANDLER 
// ======================
app.use(errorHandler);


module.exports = app;