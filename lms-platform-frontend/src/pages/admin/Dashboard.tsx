import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } from '../../features/courses/coursesSlice';
import { fetchEmployeesStart, fetchEmployeesSuccess, fetchEmployeesFailure } from '../../features/employees/employeesSlice';
import { coursesAPI } from '../../services/api';
import { employeesAPI } from '../../services/api';
import type { Course } from '../../types';
import type { Employee } from '../../types';
import type { Notification } from '../../types';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses);
  const { employees } = useAppSelector((state) => state.employees);
  const { notifications } = useAppSelector((state) => state.notifications);

  useEffect(() => {
    const fetchData = async () => {
      try {
      // Fetch courses
      dispatch(fetchCoursesStart());
        const coursesData = await coursesAPI.getCourses();
        dispatch(fetchCoursesSuccess(coursesData));

        // Fetch employees
        dispatch(fetchEmployeesStart());
        const employeesData = await employeesAPI.getEmployees();
        dispatch(fetchEmployeesSuccess(employeesData));
      } catch (error) {
        dispatch(fetchCoursesFailure('Failed to fetch data'));
        dispatch(fetchEmployeesFailure('Failed to fetch data'));
      }
    };

    fetchData();
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Employees',
      value: employees.length,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Active Courses',
      value: courses.filter((course: Course) => course.status === 'active').length,
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: 'Pending Approvals',
      value: notifications.filter((n: Notification) => !n.read).length,
      icon: <NotificationsIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
    {
      title: 'Total Skills',
      value: employees.reduce((acc: number, emp: Employee) => acc + emp.skills.length, 0),
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
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

        {/* Recent Courses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Courses
            </Typography>
            <List>
              {courses.slice(0, 5).map((course: Course) => (
                <ListItem key={course.id}>
                  <ListItemText
                    primary={course.title}
                    secondary={`${course.instructor} • ${course.level}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Employees */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Employees
            </Typography>
            <List>
              {employees.slice(0, 5).map((employee: Employee) => (
                <ListItem key={employee.id}>
                <ListItemText
                    primary={employee.userId}
                    secondary={`${employee.department} • ${employee.position}`}
                />
              </ListItem>
              ))}
            </List>
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

export default AdminDashboard;