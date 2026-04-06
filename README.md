# 📊 Finance Dashboard Backend

A backend system for managing financial records and generating dashboard analytics with role-based access control.

---

## 🚀 Overview

This project is built as part of a backend engineering assignment. It provides APIs for managing users, financial transactions, and dashboard summaries.

The system supports different user roles with restricted access and delivers clean, structured data for a frontend dashboard.

---

## 🔐 Authentication & Security

- JWT-based authentication
- Password hashing using bcrypt
- Protected routes using middleware
- Role-based access control (RBAC)
- Rate limiting to prevent abuse

---

## 👤 User Roles

| Role    | Permissions |
|--------|------------|
| Admin  | Full access (users + records) |
| Analyst| View records + dashboard |
| Viewer | Read-only access |

---

## 💰 Features

### 👥 User Management
- Register new users
- Login with JWT token
- Update user status (active/inactive)
- Role-based authorization

### 📁 Financial Records
- Create, update, delete records
- Filter records (search, pagination)
- Soft delete support

### 📊 Dashboard Analytics
- Total income
- Total expense
- Net balance
- Category-wise totals
- Recent transactions
- Monthly trends

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MySQL (mysql2)
- JWT Authentication
- Swagger (API Documentation)

---

## 📂 Project Structure


finance-dashboard-backend/
│
├── config/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── validators/
├── .env
├── server.js
├── app.js
└── package.json


---

## ⚙️ Setup Instructions

### 1. Clone repo


git clone https://github.com/Tejas-Web-Design/finance-dashboard-backend.git

cd finance-dashboard-backend


---

### 2. Install dependencies


npm install


---

### 3. Setup environment variables

Create `.env` file:


PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=finance_dashboard
JWT_SECRET=your_secret_key


---

### 4. Run server


npm run dev


---

## 📘 API Documentation

Swagger UI available at:


http://localhost:5000/api-docs


---

## 🔑 Sample API Endpoints

### Auth
- `POST /api/users` → Register
- `POST /api/users/login` → Login

### Records
- `POST /api/records`
- `GET /api/records`
- `PUT /api/records/:id`
- `DELETE /api/records/:id`

### Dashboard
- `GET /api/dashboard`
