import mongoose from 'mongoose';
import Course from '../models/Course';
import dotenv from 'dotenv';

dotenv.config();

const dummyCourses = [
  {
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. Perfect for beginners looking to start their journey in web development.',
    instructor: 'John Doe',
    level: 'beginner',
    duration: 40,
    price: 49.99,
    status: 'active'
  },
  {
    title: 'Advanced React Development',
    description: 'Master React hooks, context API, and state management. Learn to build complex, scalable applications with modern React practices.',
    instructor: 'Jane Smith',
    level: 'advanced',
    duration: 60,
    price: 79.99,
    status: 'active'
  },
  {
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js and Express. Learn RESTful API design, authentication, and database integration.',
    instructor: 'Mike Johnson',
    level: 'intermediate',
    duration: 50,
    price: 69.99,
    status: 'active'
  },
  {
    title: 'Database Design Fundamentals',
    description: 'Learn essential database design principles, SQL, and NoSQL databases. Understand data modeling, normalization, and optimization.',
    instructor: 'Sarah Wilson',
    level: 'beginner',
    duration: 30,
    price: 39.99,
    status: 'active'
  },
  {
    title: 'DevOps Essentials',
    description: 'Introduction to CI/CD, Docker, and Kubernetes. Learn to automate deployment and scale applications effectively.',
    instructor: 'Alex Brown',
    level: 'intermediate',
    duration: 45,
    price: 59.99,
    status: 'active'
  },
  {
    title: 'UI/UX Design Principles',
    description: 'Master the fundamentals of user interface and experience design. Learn to create intuitive and engaging digital products.',
    instructor: 'Emily Chen',
    level: 'beginner',
    duration: 35,
    price: 44.99,
    status: 'active'
  },
  {
    title: 'Cloud Architecture',
    description: 'Learn to design and implement cloud-based solutions using AWS, Azure, and Google Cloud Platform.',
    instructor: 'David Miller',
    level: 'advanced',
    duration: 55,
    price: 89.99,
    status: 'active'
  },
  {
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile applications using React Native. Learn to create native mobile experiences.',
    instructor: 'Lisa Anderson',
    level: 'intermediate',
    duration: 48,
    price: 64.99,
    status: 'active'
  }
];

const seedCourses = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms-platform');
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert dummy courses
    const courses = await Course.insertMany(dummyCourses);
    console.log('Added dummy courses:', courses);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedCourses(); 