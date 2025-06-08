import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import { AccessTime, Person } from '@mui/icons-material';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  image: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    instructor: 'John Doe',
    duration: '8 weeks',
    level: 'Beginner',
    image: 'https://source.unsplash.com/random/300x200?web-development',
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    description: 'Master advanced React patterns and best practices for building scalable applications.',
    instructor: 'Jane Smith',
    duration: '6 weeks',
    level: 'Advanced',
    image: 'https://source.unsplash.com/random/300x200?react',
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    description: 'Build robust backend services using Node.js and Express.',
    instructor: 'Mike Johnson',
    duration: '10 weeks',
    level: 'Intermediate',
    image: 'https://source.unsplash.com/random/300x200?nodejs',
  },
];

const Courses = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={3}>
        {mockCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip
                    icon={<Person />}
                    label={course.instructor}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    icon={<AccessTime />}
                    label={course.duration}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Chip
                  label={course.level}
                  color={
                    course.level === 'Beginner'
                      ? 'success'
                      : course.level === 'Intermediate'
                      ? 'warning'
                      : 'error'
                  }
                  size="small"
                />
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Enroll Now
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Courses; 