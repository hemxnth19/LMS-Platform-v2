import express from 'express';
import { auth } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import User from '../models/User';

const router = express.Router();

// Get all users (admin only)
router.get('/', auth, async (req, res, next) => {
  try {
    if (req.user?.role !== 'admin') {
      throw new AppError('Not authorized to access this resource', 403);
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get user profile
router.get('/profile', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      throw new AppError('User not found', 404);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.put('/profile', auth, async (req, res, next) => {
  try {
    const { name, email, department, position } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user?.id,
      { name, email, department, position },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Delete user (admin only)
router.delete('/:id', auth, async (req, res, next) => {
  try {
    if (req.user?.role !== 'admin') {
      throw new AppError('Not authorized to perform this action', 403);
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router; 