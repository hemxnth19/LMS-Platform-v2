import express, { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { requireAdmin } from '../middleware/roleAuth';
import { User } from '../models/User';
import Course from '../models/Course';

const router = express.Router();

// Utility to wrap async route handlers
function wrapAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

// Get all employees
router.get('/admin/employees', requireAdmin, wrapAsync(async (req, res, next) => {
  const employees = await User.find({ role: 'employee' })
    .select('-password')
    .sort({ createdAt: -1 });
  res.json(employees);
}));

// Revoke employee account
router.put('/admin/employees/:id/revoke', requireAdmin, wrapAsync(async (req, res, next) => {
  const { reason } = req.body;
  const employee = await User.findById(req.params.id);
  if (!employee) {
    res.status(404).json({ message: 'Employee not found' });
    return;
  }
  if (employee.role !== 'employee') {
    res.status(400).json({ message: 'Can only revoke employee accounts' });
    return;
  }
  if (req.user?.id) {
    employee.revokedBy = new Types.ObjectId(req.user.id);
  }
  employee.accountStatus = 'revoked';
  employee.revokedAt = new Date();
  employee.revocationReason = reason;
  await employee.save();
  // Remove employee from all course enrollments
  await Course.updateMany(
    { 'enrolledStudents.student': employee._id },
    { $pull: { enrolledStudents: { student: employee._id } } }
  );
  res.json({ message: 'Employee account revoked successfully' });
}));

// Get employee details
router.get('/admin/employees/:id', requireAdmin, wrapAsync(async (req, res, next) => {
  const employee = await User.findById(req.params.id)
    .select('-password');
  if (!employee) {
    res.status(404).json({ message: 'Employee not found' });
    return;
  }
  // Get employee's course enrollments
  const enrollments = await Course.find({
    'enrolledStudents.student': employee._id
  }).select('title status enrolledStudents.$');
  res.json({
    employee,
    enrollments
  });
}));

export default router; 