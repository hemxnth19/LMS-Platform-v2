import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
    Snackbar
} from '@mui/material';
import axios from 'axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        position: ''
    });
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users/profile', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setFormData({
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone || '',
                department: res.data.department || '',
                position: res.data.position || ''
            });
        } catch (err) {
            console.error('Error fetching profile:', err);
            setAlert({
                open: true,
                message: 'Error fetching profile',
                severity: 'error'
            });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                'http://localhost:5000/api/users/profile',
                formData,
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                }
            );
            setAlert({
                open: true,
                message: 'Profile updated successfully',
                severity: 'success'
            });
        } catch (err) {
            console.error('Error updating profile:', err);
            setAlert({
                open: true,
                message: 'Error updating profile',
                severity: 'error'
            });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            <Paper sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} columns={12}>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formData.email}
                                disabled
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Position"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Update Profile
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alert.severity}
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Profile; 