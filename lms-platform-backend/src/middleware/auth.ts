import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No Bearer token found in header');
      return res.status(401).json({ message: 'No Bearer token provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token:', token);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Decoded token:', decoded);

    if (!decoded || typeof decoded === 'string') {
      console.log('Invalid token format');
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Get user from database
    const userId = (decoded as any).userId;
    console.log('Looking for user with ID:', userId);

    const user = await User.findById(userId);
    console.log('Found user:', user);

    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request
    req.user = user;
    console.log('User attached to request:', req.user);
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ 
      message: 'Authentication failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 