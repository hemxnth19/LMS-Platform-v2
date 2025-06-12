import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Stack,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

interface Event {
  id: string;
  title: string;
  type: 'training' | 'workshop' | 'assignment';
  date: string;
  time: string;
  location: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'React Advanced Workshop',
    type: 'workshop',
    date: '2024-03-20',
    time: '10:00 AM',
    location: 'Room 101',
  },
  {
    id: '2',
    title: 'Python Certification Exam',
    type: 'training',
    date: '2024-03-22',
    time: '2:00 PM',
    location: 'Online',
  },
  {
    id: '3',
    title: 'Project Submission',
    type: 'assignment',
    date: '2024-03-25',
    time: '11:59 PM',
    location: 'LMS Platform',
  },
];

const Calendar: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Training Calendar
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar
                  sx={{
                    width: '100%',
                    '& .MuiPickersCalendarHeader-root': {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    },
                  }}
                />
              </LocalizationProvider>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6">Upcoming Events</Typography>
                <Button variant="outlined" size="small">
                  View All
                </Button>
              </Box>
              <List>
                {mockEvents.map((event) => (
                  <ListItem
                    key={event.id}
                    divider
                    sx={{
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon>
                      {event.type === 'workshop' && <SchoolIcon />}
                      {event.type === 'training' && <EventIcon />}
                      {event.type === 'assignment' && <AssignmentIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            {event.date} at {event.time}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            • {event.location}
                          </Typography>
                        </Stack>
                      }
                    />
                    <Chip
                      label={event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      size="small"
                      color={
                        event.type === 'workshop'
                          ? 'primary'
                          : event.type === 'training'
                          ? 'success'
                          : 'warning'
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<EventIcon />}
                    fullWidth
                  >
                    Schedule Training
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<SchoolIcon />}
                    fullWidth
                  >
                    Request Workshop
                  </Button>
                </Stack>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Training Summary
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Completed This Month
                    </Typography>
                    <Typography variant="h4">5</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Upcoming This Week
                    </Typography>
                    <Typography variant="h4">3</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Calendar; 