//config/swagger.js


const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Finance Dashboard API",
      version: "1.0.0",
      description: `
📘 Finance Dashboard Backend API

This project is a backend system designed to manage financial data and provide analytics for a finance dashboard. It demonstrates backend engineering concepts such as API design, role-based access control, data processing, and secure authentication.

🚀 Overview:
The system allows users to manage financial transactions (income and expenses) and view aggregated insights through dashboard APIs. It is built with a focus on clean architecture, scalability, and maintainability.

🔐 Authentication & Security:
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes using middleware
- Rate limiting to prevent abuse

👤 Role-Based Access Control:
- Admin → Full access (manage users & records)
- Analyst → View records and dashboard analytics
- Viewer → Read-only access to dashboard data

💰 Financial Records Management:
- Create, view, and delete financial records
- Filter records by type, category, and search keyword
- Pagination support for large datasets
- Soft delete functionality (records are not permanently removed)

📊 Dashboard & Analytics:
- Total Income, Total Expense, Net Balance
- Category-wise financial breakdown
- Recent transactions overview
- Monthly income vs expense trends

⚙️ Backend Features:
- RESTful API design
- MySQL database with connection pooling
- Service-based architecture (separation of concerns)
- Centralized error handling
- Input validation support (express-validator)
- API documentation using Swagger

📦 Tech Stack:
- Node.js + Express.js
- MySQL (mysql2 with promise-based pooling)
- JWT Authentication
- Swagger for API documentation

🎯 Purpose:
This project is built as part of a backend engineering assessment to demonstrate practical skills in designing scalable, secure, and maintainable backend systems.

---
      `,
      contact: {
        name: "Tejasri",
        email: "tejasrikonidena@gmail.com", 
      },
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
          },
        },

        Record: {
          type: "object",
          properties: {
            id: { type: "integer" },
            user_id: { type: "integer" },
            amount: { type: "number" },
            type: { type: "string", example: "income" },
            category: { type: "string" },
            date: { type: "string", format: "date" },
            notes: { type: "string" },
          },
        },

        Dashboard: {
          type: "object",
          properties: {
            totalIncome: { type: "number", example: 25000 },
            totalExpense: { type: "number", example: 2000 },
            balance: { type: "number", example: 23000 },

            categoryTotals: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  category: { type: "string", example: "Salary" },
                  total: { type: "number", example: 25000 },
                },
              },
            },

            recentTransactions: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Record",
              },
            },

            monthlyTrends: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  month: { type: "string", example: "2026-04" },
                  income: { type: "number", example: 25000 },
                  expense: { type: "number", example: 2000 },
                },
              },
            },
          },
        },
      },
    },

    security: [{ bearerAuth: [] }],

    tags: [
      { name: "Users", description: "User authentication and management" },
      { name: "Records", description: "Financial records operations" },
      { name: "Dashboard", description: "Summary analytics and insights" },
    ],
  },

  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);