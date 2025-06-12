import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { coursesAPI } from '../../services/api';

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'employee';
  firstName?: string;
  lastName?: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  level: string;
  duration: number;
  price: number;
  status: string;
  enrolledStudents: string[];
  visibility: 'public' | 'private';
  visibleTo?: string[];
}

const MyCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAppSelector((state) => state.auth) as { user: User | null };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await coursesAPI.getEmployeeCourses();
      setCourses(response);
    } catch (error) {
      setError('Failed to fetch courses. Please try again later.');
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseResponse = async (courseId: string, response: 'accept' | 'decline') => {
    try {
      setError('');
      await coursesAPI.updateCourse(courseId, { status: response === 'accept' ? 'accepted' : 'declined' });
      fetchCourses();
    } catch (error) {
      setError('Failed to process course response. Please try again.');
      console.error('Error processing course response:', error);
    }
  };

  const isEnrolled = (course: Course) => {
    return course.enrolledStudents.includes(user?._id || '');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {courses.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No courses available at the moment.
        </Alert>
      ) : (
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
                  {isEnrolled(course) && (
                    <Chip
                      label="Enrolled"
                      color="success"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                  {course.visibility === 'private' && (
                    <Chip
                      label="Private"
                      color="secondary"
                      size="small"
                      sx={{ mt: 1, ml: 1 }}
                    />
                  )}
                </CardContent>
                <CardActions>
                  {!isEnrolled(course) && (
                    <>
                      <Button
                        color="primary"
                        onClick={() => handleCourseResponse(course._id, 'accept')}
                      >
                        Accept
                      </Button>
                      <Button
                        color="error"
                        onClick={() => handleCourseResponse(course._id, 'decline')}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyCourses; 