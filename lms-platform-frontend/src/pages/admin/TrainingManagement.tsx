import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  Paper,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { trainingAPI } from '../../services/api';

interface Training {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  startDate: Date;
  endDate: Date;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  type: 'workshop' | 'seminar' | 'certification' | 'other';
  prerequisites?: string[];
  materials?: string[];
}

const TrainingManagement = () => {
  const [open, setOpen] = useState(false);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    maxParticipants: 10,
    type: 'workshop',
    prerequisites: [] as string[],
    materials: [] as string[],
  });
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (field: 'startDate' | 'endDate') => (date: Date | null) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        [field]: date,
      }));
    }
  };

  const fetchTrainings = async () => {
    try {
      const trainings = await trainingAPI.getAllTrainings();
      setTrainings(trainings);
    } catch (error) {
      console.error('Error fetching trainings:', error);
      setError('Failed to fetch trainings');
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate dates
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    
    if (end <= start) {
      setError('End date must be after start date');
      return;
    }

    try {
      const trainingResponse = await trainingAPI.createTraining(formData);
      console.log('Training created:', trainingResponse);
      setOpen(false);
      setFormData({
        title: '',
        description: '',
        instructor: '',
        startDate: new Date(),
        endDate: new Date(),
        location: '',
        maxParticipants: 10,
        type: 'workshop',
        prerequisites: [],
        materials: []
      });
      // Refresh trainings list
      fetchTrainings();
    } catch (error) {
      console.error('Error creating training:', error);
      setError('Failed to create training');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Training Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Create Training
        </Button>
      </Box>

      {/* Training List */}
      <Grid container spacing={3}>
        {trainings.map((training) => (
          <Grid item xs={12} md={6} lg={4} key={training._id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" gutterBottom>
                    {training.title}
                  </Typography>
                  <Box>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {training.type}
                </Typography>
                <Typography variant="body2" paragraph>
                  {training.description}
                </Typography>
                <Typography variant="body2">
                  Instructor: {training.instructor}
                </Typography>
                <Typography variant="body2">
                  Location: {training.location}
                </Typography>
                <Typography variant="body2">
                  Participants: {training.currentParticipants}/{training.maxParticipants}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Training Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Create New Training</DialogTitle>
        <DialogContent>
          {error && (
            <Typography color="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Instructor"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={handleDateChange('startDate')}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="End Date"
                    value={formData.endDate}
                    onChange={handleDateChange('endDate')}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Maximum Participants"
                  name="maxParticipants"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={handleInputChange}
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Training Type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="workshop">Workshop</MenuItem>
                  <MenuItem value="seminar">Seminar</MenuItem>
                  <MenuItem value="certification">Certification</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <DialogActions sx={{ mt: 3 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Create Training
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TrainingManagement; 