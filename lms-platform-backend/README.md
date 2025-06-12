# LMS Platform Backend

This is the backend server for the Learning Management System platform.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/lms-platform
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

## Development

To run the server in development mode with hot reloading:
```bash
npm run dev
```

## Building

To build the project:
```bash
npm run build
```

## Production

To run the server in production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login user
- GET `/api/users/profile` - Get user profile (protected)
- PUT `/api/users/profile` - Update user profile (protected)

### Courses
- GET `/api/courses` - Get all courses
- GET `/api/courses/:id` - Get course by ID
- POST `/api/courses` - Create new course (admin only)
- PUT `/api/courses/:id` - Update course (admin only)
- DELETE `/api/courses/:id` - Delete course (admin only)

### Skills
- GET `/api/skills` - Get all skills
- GET `/api/skills/:id` - Get skill by ID
- POST `/api/skills` - Create new skill (admin only)
- PUT `/api/skills/:id` - Update skill (admin only)
- DELETE `/api/skills/:id` - Delete skill (admin only)

### Events
- GET `/api/events` - Get all events
- GET `/api/events/:id` - Get event by ID
- POST `/api/events` - Create new event (admin only)
- PUT `/api/events/:id` - Update event (admin only)
- DELETE `/api/events/:id` - Delete event (admin only)

## Testing

To run tests:
```bash
npm test
``` 