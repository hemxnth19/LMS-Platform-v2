import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const requireRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.accountStatus !== 'active') {
        return res.status(403).json({ message: 'Account is not active' });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const requireAdmin = requireRole(['admin']);
export const requireEmployee = requireRole(['employee']); 