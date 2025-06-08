import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
} from '@mui/material';
import {
  Event as EventIcon,
  Assignment as AssignmentIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'course' | 'assignment' | 'event';
  date: string;
  time: string;
  location?: string;
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Web Development Workshop',
    type: 'course',
    date: '2024-03-20',
    time: '10:00 AM - 12:00 PM',
    location: 'Room 101',
  },
  {
    id: '2',
    title: 'React Project Submission',
    type: 'assignment',
    date: '2024-03-22',
    time: '11:59 PM',
  },
  {
    id: '3',
    title: 'Team Building Event',
    type: 'event',
    date: '2024-03-25',
    time: '2:00 PM - 4:00 PM',
    location: 'Conference Hall',
  },
];

const getEventIcon = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'course':
      return <SchoolIcon color="primary" />;
    case 'assignment':
      return <AssignmentIcon color="warning" />;
    case 'event':
      return <EventIcon color="success" />;
  }
};

const getEventColor = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'course':
      return 'primary';
    case 'assignment':
      return 'warning';
    case 'event':
      return 'success';
  }
};

const Calendar = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Calendar
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {mockEvents.map((event, index) => (
            <React.Fragment key={event.id}>
              <ListItem>
                <ListItemIcon>{getEventIcon(event.type)}</ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1">{event.title}</Typography>
                      <Chip
                        label={event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        size="small"
                        color={getEventColor(event.type)}
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {event.date} at {event.time}
                      </Typography>
                      {event.location && (
                        <Typography variant="body2" color="text.secondary">
                          Location: {event.location}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              {index < mockEvents.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Calendar; 