# Learning Management System (LMS)

A comprehensive Learning Management System built with React, Node.js, and MongoDB.

## Features

- User Authentication (Admin and Employee roles)
- Training Management
- Course Management
- Skill Tracking
- Interactive Learning Features

## Tech Stack

- Frontend: React, Material-UI, TypeScript
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- Authentication: JWT

## Project Structure

```
lms-platform/
├── lms-platform-frontend/    # React frontend
└── lms-platform-backend/     # Node.js backend
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd lms-platform-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/lms-platform
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd lms-platform-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Admin
- POST `/api/admin/trainings` - Create new training
- GET `/api/admin/trainings` - Get all trainings

### Employee
- GET `/api/employee/trainings` - Get available trainings
- POST `/api/employee/trainings/:id/enroll` - Enroll in a training

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 