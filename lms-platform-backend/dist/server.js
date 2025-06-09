"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms-platform';
console.log('Connecting to MongoDB:', MONGODB_URI);
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    // Initialize test data
    const initializeTestData = async () => {
        try {
            // Check if we already have courses
            const courseCount = await mongoose_1.default.connection.db.collection('courses').countDocuments();
            if (courseCount === 0) {
                // Add test courses
                await mongoose_1.default.connection.db.collection('courses').insertMany([
                    {
                        title: 'Introduction to Web Development',
                        description: 'Learn the basics of HTML, CSS, and JavaScript',
                        instructor: 'John Doe',
                        level: 'Beginner',
                        duration: '8 weeks',
                        price: 99.99,
                        status: 'active',
                        enrolledStudents: []
                    },
                    {
                        title: 'Advanced React',
                        description: 'Master React hooks, context, and performance optimization',
                        instructor: 'Jane Smith',
                        level: 'Advanced',
                        duration: '6 weeks',
                        price: 149.99,
                        status: 'active',
                        enrolledStudents: []
                    }
                ]);
                console.log('Test courses added successfully');
            }
            // Check if we have any users
            const userCount = await mongoose_1.default.connection.db.collection('users').countDocuments();
            if (userCount === 0) {
                // Add test users
                await mongoose_1.default.connection.db.collection('users').insertMany([
                    {
                        username: 'admin',
                        email: 'admin@example.com',
                        password: 'admin123', // In production, this should be hashed
                        firstName: 'Admin',
                        lastName: 'User',
                        role: 'admin',
                        status: 'active'
                    },
                    {
                        username: 'employee1',
                        email: 'employee1@example.com',
                        password: 'employee123', // In production, this should be hashed
                        firstName: 'John',
                        lastName: 'Employee',
                        role: 'employee',
                        status: 'active'
                    }
                ]);
                console.log('Test users added successfully');
            }
        }
        catch (error) {
            console.error('Error initializing test data:', error);
        }
    };
    initializeTestData();
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
// Middleware for role-based access control
const checkRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.headers['x-user-role'];
        if (!userRole || !roles.includes(userRole)) {
            res.status(403).json({ message: 'Unauthorized access' });
            return;
        }
        next();
    };
};
// Routes
app.use('/api/auth', auth_1.default);
// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to LMS Platform API' });
});
// Auth routes
app.post('/api/auth/login', (req, res) => {
    // TODO: Implement login logic
    res.json({ message: 'Login endpoint' });
});
// Users/Employees routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await mongoose_1.default.connection.db.collection('users').find({}).toArray();
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});
//@ts-ignore
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await mongoose_1.default.connection.db.collection('users').findOne({ _id: new mongoose_1.default.Types.ObjectId(req.params.id) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
});
// Admin Course Management Routes
app.get('/api/admin/courses', checkRole(['admin']), async (req, res) => {
    try {
        const courses = await mongoose_1.default.connection.db.collection('courses').find({}).toArray();
        res.json(courses);
    }
    catch (error) {
        console.error('Error fetching admin courses:', error);
        res.status(500).json({ message: 'Error fetching courses' });
    }
});
app.post('/api/admin/courses', checkRole(['admin']), async (req, res) => {
    try {
        const courseData = {
            ...req.body,
            status: 'active',
            enrolledStudents: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const result = await mongoose_1.default.connection.db.collection('courses').insertOne(courseData);
        res.status(201).json({ ...courseData, _id: result.insertedId });
    }
    catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Error creating course' });
    }
});
app.put('/api/admin/courses/:id/instructor', checkRole(['admin']), async (req, res) => {
    try {
        const { instructor } = req.body;
        const result = await mongoose_1.default.connection.db.collection('courses').updateOne({ _id: new mongoose_1.default.Types.ObjectId(req.params.id) }, { $set: { instructor } });
        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        res.json({ message: 'Instructor updated successfully' });
    }
    catch (error) {
        console.error('Error updating instructor:', error);
        res.status(500).json({ message: 'Error updating instructor' });
    }
});
// Admin Employee Management Routes
app.get('/api/admin/employees', checkRole(['admin']), async (req, res) => {
    try {
        const employees = await mongoose_1.default.connection.db.collection('users')
            .find({ role: 'employee' })
            .toArray();
        res.json(employees);
    }
    catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Error fetching employees' });
    }
});
app.put('/api/admin/employees/:id/revoke', checkRole(['admin']), async (req, res) => {
    try {
        const result = await mongoose_1.default.connection.db.collection('users').updateOne({ _id: new mongoose_1.default.Types.ObjectId(req.params.id) }, { $set: { status: 'revoked' } });
        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        res.json({ message: 'Employee account revoked successfully' });
    }
    catch (error) {
        console.error('Error revoking employee account:', error);
        res.status(500).json({ message: 'Error revoking employee account' });
    }
});
// Employee Course Routes
app.get('/api/employee/courses', checkRole(['employee']), async (req, res) => {
    try {
        const courses = await mongoose_1.default.connection.db.collection('courses')
            .find({ status: 'active' })
            .toArray();
        res.json(courses);
    }
    catch (error) {
        console.error('Error fetching employee courses:', error);
        res.status(500).json({ message: 'Error fetching courses' });
    }
});
app.post('/api/employee/courses/:id/response', checkRole(['employee']), async (req, res) => {
    try {
        const { response } = req.body;
        const userId = req.headers['x-user-id'];
        if (!['accept', 'decline'].includes(response)) {
            res.status(400).json({ message: 'Invalid response' });
            return;
        }
        const courseId = new mongoose_1.default.Types.ObjectId(req.params.id);
        const course = await mongoose_1.default.connection.db.collection('courses').findOne({ _id: courseId });
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        if (response === 'accept') {
            await mongoose_1.default.connection.db.collection('courses').updateOne({ _id: courseId }, { $addToSet: { enrolledStudents: userId } });
        }
        await mongoose_1.default.connection.db.collection('course_responses').insertOne({
            userId,
            courseId,
            response,
            timestamp: new Date()
        });
        res.json({ message: `Course ${response}ed successfully` });
    }
    catch (error) {
        console.error('Error processing course response:', error);
        res.status(500).json({ message: 'Error processing course response' });
    }
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
app.use((err, req, res, next) => {
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
