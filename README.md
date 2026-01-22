# Teeth Clinic Management System

A full-stack web application for managing a teeth clinic, featuring patient management, authentication, and a modern UI.

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (via Sequelize ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast

## Features
- **Authentication**: Secure Login/Logout with JWT.
- **Patient Management**: CRUD operations with MySQL backend.
- **Fields**: Patient Name, Doctor Name, Date, Time, Status.
- **Protected Routes**: Frontend and Backend guards.
- **UI/UX**: Loading spinners, toast notifications, and responsive design.

## Project Structure

```
teeth-clinic/
├── client/                 # Frontend React Application
├── server/                 # Backend Express Application
│   ├── src/
│   │   ├── config/         # Database configuration (MySQL)
│   │   ├── models/         # Sequelize models (Patient, User)
│   │   └── ...
└── README.md
```

## Getting Started

### Prerequisites
- Node.js installed.
- **MySQL Database** running locally or remotely.

### Installation

1.  **Clone the repository**
2.  **Setup Backend**
    ```bash
    cd server
    npm install
    ```
3.  **Configure Environment**
    Create a `.env` file in `server/` with your MySQL credentials:
    ```env
    PORT=5000
    JWT_SECRET=your_secret
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=teeth_clinic
    DB_DIALECT=mysql
    ```
4.  **Setup Frontend**
    ```bash
    cd client
    npm install
    ```

### Running the Application

1.  **Start Backend**: `cd server && npm run dev`
2.  **Start Frontend**: `cd client && npm run dev`

### Usage
- **Login**: Use default credentials seeded on first run (or register via API).
- **Dashboard**: Manage patients (Add, Edit, Delete).
