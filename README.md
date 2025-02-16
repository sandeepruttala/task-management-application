# Task Management Application

![Task Management App](https://img.shields.io/badge/Frontend-React+Vite-blue) ![Backend](https://img.shields.io/badge/Backend-Express.js-green) ![Database](https://img.shields.io/badge/Database-MongoDB-orange) ![hosted](https://img.shields.io/badge/Hosted-Vercel%20%7CRender-blueviolet)

A full-stack task management application built with **React + Vite** for the frontend, **Express.js** for the backend, and **MongoDB** for the database. This application allows users to register, log in, and manage their tasks efficiently.

## Key Features

- **User Authentication**: Register and log in with email and password.
- **Task Management**:
    - Create, read, update, and delete tasks.
    - Mark tasks as completed.
    - Undo task completion.
- **Secure API**: JWT-based authentication for secure API access.
- **Protected Routes**: Only authenticated users can access task management features.
- **Testing**: Unit and integration tests for the frontend and backend.
- **API Validation**: Proper validation for all incoming API requests.
- **Error Handling**: Proper error handling for all API requests.
- **Responsive Design**: Works seamlessly on all devices (laptop, tablet, phone, 4K screens).

## Live Demo

Check out the live demo of the application: [Task Management App](https://task-management-application-chi-navy.vercel.app/)

**Demo Credentials**:

- **Email**: `john@mail.com`
- **Password**: `Password@123`

**Hosting Platforms**:

- **Frontend**: Vercel
- **Backend**: Render

## GitHub Repository

Explore the code on GitHub: [Task Management Application](https://github.com/sandeepruttala/task-management-application)

## Project Architecture

### Frontend

- **React + Vite**: A fast and modern frontend framework.
- **Tailwind CSS**: Utility-first CSS framework for responsive and consistent design.
- **React Hot Toast**: For displaying toast notifications.
- **React Router**: For navigation between pages.

### Backend

- **Express.js**: A Node.js framework for building RESTful APIs.
- **MongoDB**: A NoSQL database for storing tasks and user data.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **Jest + Supertest**: For testing the backend API.
- **Bcrypt**: For hashing user passwords.
- **Express Validator**: For validating incoming API requests.
- **Dotenv**: For loading environment variables from a `.env` file.
- **ESLint + Prettier**: For code linting and formatting.

### Folder Structure

```plaintext
task-management-application
├── backend
│   ├── models            # MongoDB models (Task, User)
│   ├── controllers       # API controllers (authController, taskController)
│   ├── middleware        # Middleware (authMiddleware)
│   ├── routes            # API routes (authRoutes, taskRoutes)
│   └── server.js         # Entry point for the backend
├── frontend
│   ├── src
│   │   ├── components    # Reusable components
│   │   ├── pages         # Page components (RegisterPage, LoginPage)
│   │   ├── styles        # css files
│   │   ├── App.jsx       # Main app component (Home Page)
│   │   ├── App.css       # styles for App.jsx
│   │   ├── Index.css     # styles
│   │   ├── Config.js     # configuratin files like SERVER_URL, REGEX
│   │   └── main.jsx      # Entry point for the frontend
│   └── index.html        # html file
└── README.md             # Project documentation
```

## Setup Instructions

### Prerequisites

- **Node.js**: Install Node.js (v16.x or higher) from [nodejs.org](https://nodejs.org/).
- **MongoDB**: Install MongoDB locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Step 1: Clone the Repository

```bash
git clone https://github.com/sandeepruttala/task-management-application.git
cd task-management-application
```

### Step 2: Set Up the Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend folder and add the following environment variables:

```env
MONGO_URI=your_mongodb_uri or (mongodb://localhost:27017/task-manager)
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

Update CORS origins: In server.js, add http://localhost:5173 to the allowed origins:

```bash
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
```

Start the backend server:

```bash
npm start
```

### Step 3: Set Up the Frontend

Navigate to the frontend folder:

```bash
cd ../frontend
```

Change SERVER_URL in `src/Config.js` to your backend server URL.

```javascript
export const SERVER_URL = "http://localhost:3000";
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Open your browser and visit:

```plaintext
http://localhost:5173
```

## Design Decisions

### Backend

- **RESTful API**: The backend follows REST principles for clean and scalable API design.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **MongoDB**: Chosen for its flexibility and scalability in handling unstructured data.
- **Mongoose**: Provides a schema-based solution for modeling MongoDB data.
- **Jest + Supertest**: For testing the backend API.
- **Express Validator**: For validating incoming API requests.
- **Error Handling**: Proper error handling for all API requests.

### Frontend

- **React + Vite**: Provides a fast and modern development experience.
- **Tailwind CSS**: Enables rapid prototyping and responsive design.
- **Component-Based Architecture**: Reusable components for better code organization and maintainability.

## Additional Notes for Reviewers

- **Testing**: Comprehensive unit and integration tests have been implemented for both the frontend and backend. The backend tests ensure that the API endpoints function correctly, while the frontend tests verify the UI components and user interactions.
- **API Validation**: All incoming API requests are validated using `Express Validator` to ensure data integrity and prevent malicious input. This includes validation for user registration, login, and task management endpoints.
- **Responsiveness**: The application is designed to be fully responsive, providing a seamless user experience across various devices, including desktops, tablets, and mobile phones. Tailwind CSS has been used to achieve a consistent and adaptive layout.
- **Error Handling**: Proper error handling mechanisms are in place for both the frontend and backend. This ensures that users receive meaningful error messages and that the application can gracefully handle unexpected issues.
- **Security**: User authentication is handled using JWT (JSON Web Tokens), ensuring secure access to the API. Passwords are hashed using `Bcrypt` before being stored in the database.
- **Code Quality**: The project follows best practices for code quality, including the use of `ESLint` and `Prettier` for linting and formatting. This helps maintain a clean and readable codebase.

These notes should provide a comprehensive overview of the key aspects of the project for reviewers.

## Contact

For any questions or feedback, feel free to reach out:

### Sandeep Ruttala

Email: itssandeepruttala@gmail.com

Mobile: +91 9182452741

GitHub: [sandeepruttala](https://github.com/sandeepruttala)
