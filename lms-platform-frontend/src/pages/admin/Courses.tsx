import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { coursesAPI } from '../../services/api';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  level: string;
  duration: number;
  price: number;
  status: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    level: 'beginner',
    duration: 0,
    price: 0,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await coursesAPI.getAdminCourses();
      setCourses(response);
    } catch (error) {
      setError('Failed to fetch courses');
    }
  };

  const handleOpenDialog = (course?: Course) => {
    if (course) {
      setSelectedCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        level: course.level,
        duration: course.duration,
        price: course.price,
      });
    } else {
      setSelectedCourse(null);
      setFormData({
        title: '',
        description: '',
        instructor: '',
        level: 'beginner',
        duration: 0,
        price: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
    setFormData({
      title: '',
      description: '',
      instructor: '',
      level: 'beginner',
      duration: 0,
      price: 0,
    });
  };

  const handleSubmit = async () => {
    try {
      if (selectedCourse) {
        await coursesAPI.updateCourse(selectedCourse._id, formData);
      } else {
        await coursesAPI.createCourse(formData);
      }
      handleCloseDialog();
      fetchCourses();
    } catch (error) {
      setError('Failed to save course');
    }
  };

  const handleDelete = async (courseId: string) => {
    try {
      await coursesAPI.deleteCourse(courseId);
      fetchCourses();
    } catch (error) {
      setError('Failed to delete course');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Course Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create Course
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Instructor: {course.instructor}
                </Typography>
                <Typography variant="body2">{course.description}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Level: {course.level} | Duration: {course.duration} hours
                </Typography>
                <Typography variant="body2">
                  Price: ${course.price}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenDialog(course)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(course._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCourse ? 'Edit Course' : 'Create New Course'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                SelectProps={{ native: true }}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Duration (hours)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedCourse ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Courses; 