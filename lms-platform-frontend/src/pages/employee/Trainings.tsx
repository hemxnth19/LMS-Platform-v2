import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import { DateTime } from 'luxon';
import { trainingAPI } from '../../services/api';

interface Training {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  startDate: string;
  endDate: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  status: string;
  type: string;
  level: string;
}

const Trainings: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const fetchTrainings = async () => {
    try {
      setLoading(true);
      const data = await trainingAPI.getAllTrainings();
      setTrainings(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch trainings. Please try again later.');
      console.error('Error fetching trainings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleViewDetails = (training: Training) => {
    setSelectedTraining(training);
  };

  const handleCloseDetails = () => {
    setSelectedTraining(null);
    setJoinSuccess(false);
  };

  const handleJoinTraining = async () => {
    if (!selectedTraining) return;

    try {
      await trainingAPI.joinTraining(selectedTraining._id);
      setJoinSuccess(true);
      // Refresh the trainings list
      fetchTrainings();
    } catch (err) {
      setError('Failed to join training. Please try again later.');
      console.error('Error joining training:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return DateTime.fromISO(dateString).toLocaleString(DateTime.DATETIME_FULL);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Trainings
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Available Trainings" />
          <Tab label="My Trainings" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {trainings.map((training) => (
          <Grid item xs={12} sm={6} md={4} key={training._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {training.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Instructor: {training.instructor}
                </Typography>
                <Typography variant="body2" paragraph>
                  {training.description}
                </Typography>
                <Box display="flex" gap={1} mb={1}>
                  <Chip label={training.type} size="small" color="primary" />
                  <Chip label={training.level} size="small" color="secondary" />
                  <Chip label={training.status} size="small" color="info" />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  {formatDate(training.startDate)} - {formatDate(training.endDate)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Location: {training.location}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Participants: {training.currentParticipants}/{training.maxParticipants}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleViewDetails(training)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!selectedTraining} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        {selectedTraining && (
          <>
            <DialogTitle>{selectedTraining.title}</DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedTraining.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                <strong>Instructor:</strong> {selectedTraining.instructor}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                <strong>Date:</strong> {formatDate(selectedTraining.startDate)} -{' '}
                {formatDate(selectedTraining.endDate)}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                <strong>Location:</strong> {selectedTraining.location}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                <strong>Type:</strong> {selectedTraining.type}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                <strong>Level:</strong> {selectedTraining.level}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                <strong>Status:</strong> {selectedTraining.status}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Participants:</strong> {selectedTraining.currentParticipants}/
                {selectedTraining.maxParticipants}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails}>Close</Button>
              {selectedTraining.currentParticipants < selectedTraining.maxParticipants && (
                <Button
                  onClick={handleJoinTraining}
                  color="primary"
                  variant="contained"
                  disabled={joinSuccess}
                >
                  {joinSuccess ? 'Joined Successfully' : 'Join Training'}
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Trainings; 