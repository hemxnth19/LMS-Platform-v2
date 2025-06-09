import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms-platform';
console.log('Connecting to MongoDB:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB successfully');
  // List all collections
  mongoose.connection.db.listCollections().toArray()
    .then(collections => {
      console.log('Available collections:', collections.map(c => c.name));
    })
    .catch(err => {
      console.error('Error listing collections:', err);
    });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to LMS Platform API' });
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  // TODO: Implement login logic
  res.json({ message: 'Login endpoint' });
});

// Skills routes
app.get('/api/skills', (req, res) => {
  // TODO: Implement get skills logic
  res.json([
    { id: '1', name: 'JavaScript', level: 'intermediate', category: 'Programming' },
    { id: '2', name: 'React', level: 'beginner', category: 'Frontend' },
  ]);
});

// Courses routes
app.get('/api/courses', (req, res) => {
  // TODO: Implement get courses logic
  res.json([
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn React basics',
      level: 'beginner',
      duration: 10,
      price: 0,
      rating: 4.5,
      enrolledStudents: 100,
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      description: 'Deep dive into JavaScript',
      level: 'advanced',
      duration: 15,
      price: 49.99,
      rating: 4.8,
      enrolledStudents: 50,
    },
  ]);
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 