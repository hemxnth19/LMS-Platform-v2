<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======
import { useEffect } from 'react';
>>>>>>> 8466164199ee7646163a02125470e8e0d004456b
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } from '../../features/courses/coursesSlice';
import { fetchSkillsStart, fetchSkillsSuccess, fetchSkillsFailure } from '../../features/skills/skillsSlice';
import { coursesAPI } from '../../services/api';
import { skillsAPI } from '../../services/api';
import type { Course } from '../../types';
import type { Skill } from '../../types';
import type { Notification } from '../../types';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
<<<<<<< HEAD
  Container,
  Button,
  CircularProgress,
  Alert,
=======
>>>>>>> 8466164199ee7646163a02125470e8e0d004456b
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { trainingAPI } from '../../services/api';

interface Training {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  currentParticipants: number;
  maxParticipants: number;
}
=======
>>>>>>> 8466164199ee7646163a02125470e8e0d004456b

const EmployeeDashboard = () => {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses);
  const { skills } = useAppSelector((state) => state.skills);
  const { notifications } = useAppSelector((state) => state.notifications);
  const { user } = useAppSelector((state) => state.auth);
<<<<<<< HEAD
  const [upcomingTrainings, setUpcomingTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
=======
>>>>>>> 8466164199ee7646163a02125470e8e0d004456b

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        // Fetch courses
        dispatch(fetchCoursesStart());
=======
      // Fetch courses
      dispatch(fetchCoursesStart());
>>>>>>> 8466164199ee7646163a02125470e8e0d004456b
        const coursesData = await coursesAPI.getCourses();
        dispatch(fetchCoursesSuccess(coursesData));

        // Fetch skills
        dispatch(fetchSkillsStart());
        const skillsData = await skillsAPI.getSkills();
        dispatch(fetchSkillsSuccess(skillsData));
      } catch (error) {
        dispatch(fetchCoursesFailure('Failed to fetch data'));
        dispatch(fetchSkillsFailure('Failed to fetch data'));
      }
    };

    fetchData();
  }, [dispatch]);

<<<<<<< HEAD
  useEffect(() => {
    fetchUpcomingTrainings();
  }, []);

  const fetchUpcomingTrainings = async () => {
    try {
      setLoading(true);
      const trainings = await trainingAPI.getAllTrainings();
      const upcomingTrainings = trainings
        .filter((training: Training) => new Date(training.startDate) > new Date())
        .slice(0, 3); // Get only 3 upcoming trainings
      setUpcomingTrainings(upcomingTrainings);
    } catch (err) {
      setError('Failed to fetch upcoming trainings');
      console.error('Error fetching trainings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAllTrainings = () => {
    navigate('/employee/trainings');
  };

=======
>>>>>>> 8466164199ee7646163a02125470e8e0d004456b
  const stats = [
    {
      title: 'Enrolled Courses',
      value: courses.filter((course: Course) => course.status === 'enrolled').length,
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Completed Courses',
      value: courses.filter((course: Course) => course.status === 'completed').length,
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: 'Skills Acquired',
      value: skills.length,
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
    {
      title: 'Notifications',
      value: notifications.filter((n: Notification) => !n.read).length,
      icon: <NotificationsIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
  ];

<<<<<<< HEAD
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>

=======
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>
>>>>>>> 8466164199ee7646163a02125470e8e0d004456b
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: stat.color, mr: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h6" component="div">
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4" component="div">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Current Courses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Current Courses
            </Typography>
              <List>
              {courses
                .filter((course: Course) => course.status === 'enrolled')
                .slice(0, 5)
                .map((course: Course) => (
                  <ListItem key={course.id}>
                    <ListItemText
                      primary={course.title}
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={course.progress || 0}
                            sx={{ mb: 1 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            Progress: {course.progress || 0}%
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
          </Paper>
        </Grid>

        {/* Skills Overview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Skills Overview
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skills.map((skill: Skill) => (
                <Chip
                  key={skill.id}
                  label={skill.name}
                  color="primary"
                  variant="outlined"
                />
                  ))}
            </Box>
          </Paper>
        </Grid>

        {/* Recent Notifications */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Notifications
            </Typography>
            <List>
              {notifications.slice(0, 5).map((notification: Notification) => (
                <ListItem key={notification.id}>
                  <ListItemText
                    primary={notification.title}
                    secondary={notification.message}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
<<<<<<< HEAD

        {/* Upcoming Trainings Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Upcoming Trainings</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleViewAllTrainings}
                >
                  View All Trainings
                </Button>
              </Box>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {upcomingTrainings.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No upcoming trainings available.
                </Typography>
              ) : (
                <Grid container spacing={2}>
                  {upcomingTrainings.map((training) => (
                    <Grid item xs={12} md={4} key={training._id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {training.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {training.description}
                          </Typography>
                          <Typography variant="body2">
                            Start Date: {new Date(training.startDate).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2">
                            Participants: {training.currentParticipants}/{training.maxParticipants}
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ mt: 1 }}
                            onClick={handleViewAllTrainings}
                          >
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
=======
      </Grid>
    </Box>
>>>>>>> 8466164199ee7646163a02125470e8e0d004456b
  );
};

export default EmployeeDashboard; 