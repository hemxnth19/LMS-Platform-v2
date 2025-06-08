import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const router = express.Router();

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  department?: string;
  position?: string;
  role?: 'admin' | 'employee';
}

// @ts-ignore
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body as LoginRequest;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        username: user.username,
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        department: user.department,
        position: user.position
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @ts-ignore
router.post('/register', async (req, res) => {
  try {
    const { 
      username, 
      password, 
      email, 
      firstName,
      lastName,
      department,
      position,
      role 
    } = req.body as RegisterRequest;

    console.log('Received registration data:', { 
      username, 
      email, 
      firstName,
      lastName,
      department,
      position,
      role 
    });

    // Validate required fields
    if (!username || !password || !email) {
      console.log('Missing required fields:', { username, email, password });
      return res.status(400).json({ 
        message: 'Missing required fields',
        fields: {
          username: !username ? 'Username is required' : undefined,
          password: !password ? 'Password is required' : undefined,
          email: !email ? 'Email is required' : undefined
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password strength
    if (password.length < 6) {
      console.log('Password too short:', password.length);
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Validate role
    if (role && !['admin', 'employee'].includes(role)) {
      console.log('Invalid role:', role);
      return res.status(400).json({ message: 'Invalid role specified' });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.log('User already exists:', { username, email });
      return res.status(400).json({ 
        message: 'User already exists',
        field: existingUser.username === username ? 'username' : 'email'
      });
    }

    // Create new user with explicit role
    const userRole = role || 'employee';
    console.log('Creating user with role:', userRole);

    const user = new User({
      username,
      password,
      email,
      firstName,
      lastName,
      department,
      position,
      role: userRole
    });

    console.log('Attempting to save user:', user.toObject());

    try {
      const savedUser = await user.save();
      console.log('User saved successfully:', savedUser.toObject());
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      throw saveError;
    }

    // Generate JWT token for immediate login
    const token = jwt.sign(
      { 
        userId: user._id,
        username: user.username,
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    const responseData = { 
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        department: user.department,
        position: user.position
      }
    };

    console.log('Sending response:', responseData);
    res.status(201).json(responseData);
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof Error) {
      res.status(500).json({ 
        message: 'Server error',
        error: error.message 
      });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

export default router; 