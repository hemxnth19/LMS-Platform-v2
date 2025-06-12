import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  status: 'active' | 'draft' | 'archived';
  enrolled: number;
  instructor: string;
  lastUpdated: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced React Development',
    category: 'Development',
    level: 'Advanced',
    status: 'active',
    enrolled: 1234,
    instructor: 'John Doe',
    lastUpdated: '2024-03-15',
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    category: 'Data Science',
    level: 'Intermediate',
    status: 'active',
    enrolled: 2345,
    instructor: 'Jane Smith',
    lastUpdated: '2024-03-10',
  },
  {
    id: '3',
    title: 'Machine Learning Basics',
    category: 'AI/ML',
    level: 'Beginner',
    status: 'draft',
    enrolled: 0,
    instructor: 'Mike Johnson',
    lastUpdated: '2024-03-18',
  },
];

const CourseManagement: React.FC = () => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              Course Management
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
              >
                Create New Course
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Enrolled</TableCell>
                  <TableCell>Instructor</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.level}</TableCell>
                    <TableCell>
                      <Chip
                        label={course.status}
                        color={
                          course.status === 'active'
                            ? 'success'
                            : course.status === 'draft'
                            ? 'warning'
                            : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{course.enrolled}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.lastUpdated}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton size="small">
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Course</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Course Title"
              fullWidth
              required
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category">
                <MenuItem value="development">Development</MenuItem>
                <MenuItem value="data-science">Data Science</MenuItem>
                <MenuItem value="ai-ml">AI/ML</MenuItem>
                <MenuItem value="design">Design</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>
              <Select label="Level">
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Instructor"
              fullWidth
              required
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Create Course
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CourseManagement; 