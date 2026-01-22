# Teeth Clinic Management System

A full-stack web application for managing a teeth clinic, featuring patient management, authentication, and a modern UI.

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (via Sequelize ORM)
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
- **Patient Management**: CRUD operations (Create, Read, Update, Delete) for patients.
- **Protected Routes**: Frontend and Backend guards to ensure security.
- **UI/UX**: Loading spinners, toast notifications, and responsive design.

## Project Structure

```
teeth-clinic/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable components (Spinner, ProtectedRoute)
│   │   ├── context/        # Auth Context
│   │   ├── pages/          # Page views (Login, Patients)
│   │   ├── services/       # API integration
│   │   └── ...
├── server/                 # Backend Express Application
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route logic
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   └── ...
└── README.md
```

## Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project folder.

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

1.  **Start the Backend Server**
    ```bash
    cd server
    npm run dev
    # Server runs on http://localhost:5000
    ```

2.  **Start the Frontend Application**
    ```bash
    cd client
    npm run dev
    # Client runs on http://localhost:5173
    ```

### Usage
1.  Open the frontend URL.
2.  **Register/Login**: Since there is no registration UI implemented for security (internal clinic use), you can use a tool like Postman to register a user initially, or the system could be seeded.
    *   *Note*: For demonstration, you can register a user via Postman:
        *   POST `http://localhost:5000/api/auth/register`
        *   Body: `{ "username": "admin", "password": "password123" }`
    *   Then login with these credentials on the frontend.

## License
MIT
