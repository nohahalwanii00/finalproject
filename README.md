# Teeth Clinic Management System

A robust, full-stack web application for managing a dental clinic, built with modern architecture (CQRS) and security best practices (RBAC).

## 🚀 Key Features

### 🛡️ Security & Access Control
-   **Role-Based Access Control (RBAC)**:
    -   **Admin**: Full access (Create, Read, Update, Delete).
    -   **User**: Full access (Create, Read, Update, Delete). *Updated based on clinic requirements.*
-   **JWT Authentication**: Secure stateless authentication with token validation.
-   **Rate Limiting**: Protects the API from abuse and DDoS attacks.
-   **Secure Password Hashing**: Uses `bcryptjs` for storing credentials.

### 🏗️ Architecture & Performance
-   **CQRS Pattern**: Separation of **Command** (Write) and **Query** (Read) responsibilities for better scalability and maintainability.
-   **Caching**: In-memory caching (`node-cache`) for high-performance data retrieval.
-   **Transactions**: Atomic database operations to ensure data integrity.
-   **Global Error Handling**: Centralized error management for consistent API responses.

### 💻 Frontend (The "Face")
-   **Framework**: React (Vite) for a fast, modern UI.
-   **Styling**: Tailwind CSS for responsive design.
-   **State Management**: React Context API.
-   **UX**: Loading spinners, toast notifications, and protected routes.

### ⚙️ Backend (The "Brain")
-   **Runtime**: Node.js & Express.js.
-   **Database**: SQLite/MySQL (via Sequelize ORM).
-   **Documentation**: **Swagger UI** integrated at `/api-docs`.
-   **Testing**: Unit testing with **Jest**.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Axios, React Router |
| **Backend** | Node.js, Express.js, Sequelize |
| **Security** | JWT, Bcryptjs, Express-Rate-Limit, Helmet |
| **Architecture** | CQRS, MVC |
| **Testing** | Jest, Supertest |
| **Docs** | Swagger UI, OpenAPI 3.0 |

---

## 📂 Project Structure

```
teeth-clinic/
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── context/        # Auth Context
│   │   ├── pages/          # Login, Patients Dashboard
│   │   └── services/       # API Integration
│
├── server/                 # Backend Application
│   ├── src/
│   │   ├── config/         # DB & Swagger Config
│   │   ├── controllers/    # Request Handlers
│   │   ├── cqrs/           # Command & Query Handlers (Business Logic)
│   │   ├── middleware/     # Auth, Role, Error, RateLimit Middleware
│   │   ├── models/         # Database Models
│   │   └── routes/         # API Routes
│   ├── tests/              # Unit Tests
│   └── server.js           # Entry Point
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v14 or higher)
-   npm (Node Package Manager)

### 1. Installation

**Clone the repository and install dependencies:**

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 2. Running the Application

**Start the Backend Server:**
```bash
cd server
npm run dev
```
*   Server runs on: `http://localhost:5000`
*   **Swagger Docs**: `http://localhost:5000/api-docs`

**Start the Frontend Client:**
```bash
cd client
npm run dev
```
*   Client runs on: `http://localhost:5173`

---

## 🧪 Testing

The backend includes a comprehensive suite of unit tests for the CQRS logic.

**Run Tests:**
```bash
cd server
npm test
```

---

## 👥 Default Users (Auto-Created)

When you run the server for the first time, a default admin is created:

| Role | Username | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `password123` | View, Add, Edit, Delete |
| **User** | *(Register via API)* | *(Set during registration)* | View, Add, Edit, Delete |

> **Tip**: You can create new users with specific roles (`admin` or `user`) using the Swagger UI Registration endpoint.

---

## 📝 API Documentation

Complete API documentation is available via Swagger UI.
1.  Start the server.
2.  Navigate to `http://localhost:5000/api-docs`.
3.  Use the `Authorize` button to test protected routes with your JWT token.
