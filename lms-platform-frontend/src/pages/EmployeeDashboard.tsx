import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {icon}
    </Box>
    <Typography component="p" variant="h4">
      {value}
    </Typography>
  </Paper>
);

const EmployeeDashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Enrolled Courses"
            value="3"
            icon={<SchoolIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Assignments"
            value="2"
            icon={<AssignmentIcon color="warning" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Upcoming Events"
            value="4"
            icon={<EventIcon color="success" />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Skills Progress"
            value="75%"
            icon={<TrendingUpIcon color="info" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard; 