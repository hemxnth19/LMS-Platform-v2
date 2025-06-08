import { useEffect } from 'react';
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
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

const EmployeeDashboard = () => {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses);
  const { skills } = useAppSelector((state) => state.skills);
  const { notifications } = useAppSelector((state) => state.notifications);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
      // Fetch courses
      dispatch(fetchCoursesStart());
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}
      </Typography>
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
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard; 