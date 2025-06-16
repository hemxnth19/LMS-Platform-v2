import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const locales = {
    'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

const Home = () => {
    const [trainings, setTrainings] = useState([]);
    const [upcomingTrainings, setUpcomingTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/trainings', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            const formattedTrainings = res.data.map(training => ({
                ...training,
                start: new Date(training.date),
                end: new Date(training.date),
                title: training.className
            }));
            setTrainings(formattedTrainings);
            
            // Get upcoming trainings (next 7 days)
            const today = new Date();
            const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            const upcoming = formattedTrainings.filter(
                training => training.start >= today && training.start <= nextWeek
            );
            setUpcomingTrainings(upcoming);
        } catch (err) {
            console.error('Error fetching trainings:', err);
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2, height: '600px' }}>
                        <Calendar
                            localizer={localizer}
                            events={trainings}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: '100%' }}
                            eventPropGetter={(event) => ({
                                style: {
                                    backgroundColor: '#1976d2',
                                    borderRadius: '4px'
                                }
                            })}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, height: '600px', overflow: 'auto' }}>
                        <Typography variant="h6" gutterBottom>
                            Upcoming Trainings
                        </Typography>
                        <List>
                            {upcomingTrainings.map((training, index) => (
                                <React.Fragment key={training._id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={training.className}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2">
                                                        {format(training.start, 'PPp')}
                                                    </Typography>
                                                    <br />
                                                    <Typography component="span" variant="body2">
                                                        Venue: {training.venue}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    {index < upcomingTrainings.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home; 
 