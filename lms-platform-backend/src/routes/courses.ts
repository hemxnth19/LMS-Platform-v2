import express, { Request, Response, NextFunction } from 'express';
import Course from '../models/Course';
import { auth } from '../middleware/auth';
import { requireAdmin, requireEmployee } from '../middleware/roleAuth';
import { User } from '../models/User';

type EnrollmentStatus = 'pending' | 'accepted' | 'declined';

const router = express.Router();

// Create a new course (Admin only)
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create courses' });
    }

    const course = new Course({
      ...req.body,
      createdBy: req.user._id,
      lastModifiedBy: req.user._id
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(400).json({ message: 'Error creating course', error });
  }
});

// Get all courses (Admin view)
router.get('/admin', auth, async (req: Request, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const courses = await Course.find()
      .populate('createdBy', 'username')
      .populate('lastModifiedBy', 'username')
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    console.error('Error getting admin courses:', error);
    res.status(500).json({ message: 'Error getting courses' });
  }
});

// Get all courses (Employee view)
router.get('/employee', auth, async (req: Request, res: Response) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const courses = await Course.find({ status: 'active' })
      .populate('instructor')
      .sort({ createdAt: -1 });

    // Add enrollment status for the current employee
    const coursesWithEnrollment = courses.map(course => {
      const enrollment = course.enrolledStudents.find(
        e => e.student.toString() === req.user._id
      );
      return {
        ...course.toObject(),
        enrollmentStatus: enrollment ? enrollment.status : null
      };
    });

    res.json(coursesWithEnrollment);
  } catch (error) {
    console.error('Error getting employee courses:', error);
    res.status(500).json({ message: 'Error getting courses' });
  }
});

// Get a specific course
router.get('/:id', auth, async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error getting course' });
  }
});

// Update course (Admin only)
router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        lastModifiedBy: req.user._id,
        lastModifiedAt: new Date()
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Error updating course' });
  }
});

// Delete course (Admin only)
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Error deleting course' });
  }
});

// Enroll in course (Employee only)
router.post('/:id/enroll', auth, async (req: Request, res: Response) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = course.enrolledStudents.find(
      e => e.student.toString() === req.user._id
    );

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add enrollment
    course.enrolledStudents.push({
      student: req.user._id,
      status: 'pending' as EnrollmentStatus,
      enrolledAt: new Date()
    });

    await course.save();
    res.json({ message: 'Enrollment request submitted successfully' });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: 'Error enrolling in course' });
  }
});

// Update enrollment status (Employee only)
router.put('/:id/enrollment/:status', auth, async (req: Request, res: Response) => {
  try {
    if (req.user.role !== 'employee') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const status = req.params.status as EnrollmentStatus;
    if (!['accepted', 'declined'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollment = course.enrolledStudents.find(
      e => e.student.toString() === req.user._id
    );

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.status = status;
    await course.save();

    res.json({ message: `Enrollment ${status} successfully` });
  } catch (error) {
    console.error('Error updating enrollment:', error);
    res.status(500).json({ message: 'Error updating enrollment' });
  }
});

// Admin Course Management Routes
router.post('/admin/courses', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, instructor, level, duration, price, visibility, visibleTo } = req.body;
    
    const course = new Course({
      title,
      description,
      instructor,
      level,
      duration,
      price,
      visibility,
      visibleTo,
      createdBy: req.user?.id
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
});

router.put('/admin/courses/:id/instructor', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { instructor } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { 
        instructor,
        lastModifiedBy: req.user?.id,
        lastModifiedAt: new Date()
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    next(error);
  }
});

router.put('/admin/courses/:id/visibility', requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { visibility, visibleTo } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { 
        visibility,
        visibleTo,
        lastModifiedBy: req.user?.id,
        lastModifiedAt: new Date()
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    next(error);
  }
});

// Employee Course Portal Routes
router.get('/employee/courses', requireEmployee, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await Course.find({
      $or: [
        { visibility: 'public' },
        { visibleTo: req.user?.id }
      ],
      status: 'active'
    }).populate('instructor', 'firstName lastName');

    res.json(courses);
  } catch (error) {
    next(error);
  }
});

router.post('/employee/courses/:id/response', requireEmployee, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, note } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollment = course.enrolledStudents.find(
      e => e.student.toString() === req.user?.id
    );

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.status = status;
    enrollment.responseDate = new Date();
    enrollment.responseNote = note;

    await course.save();
    res.json(course);
  } catch (error) {
    next(error);
  }
});

// Get course details
router.get('/courses/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'firstName lastName')
      .populate('enrolledStudents.student', 'firstName lastName');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    next(error);
  }
});

export default router; 