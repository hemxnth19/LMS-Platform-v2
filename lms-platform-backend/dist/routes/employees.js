"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get all employees with their course registrations
router.get('/', auth_1.auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            res.status(403).json({ message: 'Only admins can view employees' });
            return;
        }
        const employees = await User_1.User.find({ role: 'employee' })
            .select('-password')
            .populate('enrolledCourses', 'title');
        const employeesWithCourseCount = employees.map(emp => ({
            ...emp.toObject(),
            enrolledCoursesCount: emp.enrolledCourses.length
        }));
        res.json(employeesWithCourseCount);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching employees' });
    }
});
// Revoke employee access
router.put('/:id/revoke', auth_1.auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            res.status(403).json({ message: 'Only admins can revoke access' });
            return;
        }
        const employee = await User_1.User.findByIdAndUpdate(req.params.id, { status: 'revoked' }, { new: true }).select('-password');
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        res.json(employee);
    }
    catch (error) {
        res.status(400).json({ message: 'Error revoking access' });
    }
});
// Grant employee access
router.put('/:id/grant', auth_1.auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            res.status(403).json({ message: 'Only admins can grant access' });
            return;
        }
        const employee = await User_1.User.findByIdAndUpdate(req.params.id, { status: 'active' }, { new: true }).select('-password');
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        res.json(employee);
    }
    catch (error) {
        res.status(400).json({ message: 'Error granting access' });
    }
});
exports.default = router;
