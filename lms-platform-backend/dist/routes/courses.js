"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Course_1 = __importDefault(require("../models/Course"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get all courses (admin)
router.get('/admin', auth_1.auth, async (req, res) => {
    try {
        const courses = await Course_1.default.find();
        res.json(courses);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching courses' });
    }
});
// Get active courses (employee)
router.get('/employee', auth_1.auth, async (req, res) => {
    try {
        const courses = await Course_1.default.find({ status: 'active' });
        res.json(courses);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching courses' });
    }
});
// Create course (admin only)
router.post('/', auth_1.auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            res.status(403).json({ message: 'Only admins can create courses' });
            return;
        }
        const course = new Course_1.default(req.body);
        await course.save();
        res.status(201).json(course);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating course' });
    }
});
// Update course (admin only)
router.put('/:id', auth_1.auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            res.status(403).json({ message: 'Only admins can update courses' });
            return;
        }
        const course = await Course_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        res.json(course);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating course' });
    }
});
// Delete course (admin only)
router.delete('/:id', auth_1.auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            res.status(403).json({ message: 'Only admins can delete courses' });
            return;
        }
        const course = await Course_1.default.findByIdAndDelete(req.params.id);
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        res.json({ message: 'Course deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting course' });
    }
});
exports.default = router;
