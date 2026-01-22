# Teeth Clinic Management System

A full-stack web application for managing a teeth clinic, featuring patient management, authentication, and a modern UI.

## Tech Stack

### Backend (The "Brain")
- **Runtime**: Node.js
- **Framework**: Express.js (Handles API requests)
- **Database**: SQLite (via Sequelize ORM) - *Changed from MySQL for easier local setup*
- **Authentication**: JWT (JSON Web Tokens) for secure access
- **Documentation**: Swagger UI (for API testing)
- **Security**: bcryptjs (Password Hashing) & CORS

### Frontend (The "Face")
- **Framework**: React (Vite) - *Fast and modern*
- **Styling**: Tailwind CSS - *Responsive and beautiful UI*
- **State Management**: React Context API (AuthContext)
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast

## Features
- **Authentication**: Secure Login/Logout with JWT. Auto-fill disabled for security.
- **Patient Management**: Complete CRUD (Create, Read, Update, Delete) operations.
- **Interactive Dashboard**:
    - **Status Indicators**: Color-coded statuses (Completed, Cancelled, Pending).
    - **Search & Filter**: (Future enhancement capability).
    - **Responsive Design**: Works on mobile and desktop.
- **Protected Routes**: Ensures only logged-in admins can access the dashboard.
- **API Documentation**: Integrated Swagger UI at `/api-docs`.

## Project Structure (Architecture)

```
teeth-clinic/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI parts (ProtectedRoute, Spinner)
│   │   ├── context/        # Global State (AuthContext)
│   │   ├── pages/          # Main Views (Login, Patients)
│   │   └── services/       # API connection (axios setup)
│
├── server/                 # Backend Express Application
│   ├── src/
│   │   ├── config/         # Database & Swagger config
│   │   ├── controllers/    # Business Logic (authController, patientController)
│   │   ├── middleware/     # Security Guards (authMiddleware)
│   │   ├── models/         # Database Schemas (Patient, User)
│   │   └── routes/         # API Endpoints
│   └── server.js           # Entry Point
└── README.md
```

## Getting Started

### Prerequisites
- Node.js installed.

### Installation

1.  **Clone the repository**
2.  **Setup Backend**
    ```bash
    cd server
    npm install
    ```
3.  **Setup Frontend**
    ```bash
    cd client
    npm install
    ```

### Running the Application

1.  **Start Backend**:
    ```bash
    cd server
    npm run dev
    ```
    *Server runs on: `http://localhost:5000`*
    *Swagger Docs: `http://localhost:5000/api-docs`*

2.  **Start Frontend**:
    ```bash
    cd client
    npm run dev
    ```
    *Client runs on: `http://localhost:5173`*

### Usage Guide
1.  **Login**: Access the secure dashboard using admin credentials.
    *   *Default Admin*: Created automatically on first run (check server console).
2.  **Dashboard**:
    *   **View**: See all upcoming appointments.
    *   **Add**: Register a new patient.
    *   **Edit**: Update appointment details.
    *   **Delete**: Remove records safely.
