import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import axios from 'axios';

const Training = () => {
    const [formData, setFormData] = useState({
        className: '',
        description: '',
        maxEnrollments: '',
        date: new Date(),
        time: '',
        venue: ''
    });

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/trainings');
            setTrainings(res.data);
        } catch (err) {
            console.error('Error fetching trainings:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (newDate) => {
        setFormData({
            ...formData,
            date: newDate
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/trainings', formData, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            fetchTrainings();
            setFormData({
                className: '',
                description: '',
                maxEnrollments: '',
                date: new Date(),
                time: '',
                venue: ''
            });
        } catch (err) {
            console.error('Error creating training:', err);
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Create Training Class
            </Typography>
            <Paper sx={{ p: 3, mb: 4 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Class Name"
                                name="className"
                                value={formData.className}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Maximum Enrollments"
                                name="maxEnrollments"
                                type="number"
                                value={formData.maxEnrollments}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="Date and Time"
                                    value={formData.date}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Venue"
                                name="venue"
                                value={formData.venue}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Create Training Class
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            <Typography variant="h4" gutterBottom>
                Training Classes
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Class Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Venue</TableCell>
                            <TableCell>Enrollments</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trainings.map((training) => (
                            <TableRow key={training._id}>
                                <TableCell>{training.className}</TableCell>
                                <TableCell>{training.description}</TableCell>
                                <TableCell>
                                    {new Date(training.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{training.time}</TableCell>
                                <TableCell>{training.venue}</TableCell>
                                <TableCell>
                                    {training.currentEnrollments}/{training.maxEnrollments}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Training; 