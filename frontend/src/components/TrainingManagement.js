import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    Snackbar
} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';

const TrainingManagement = () => {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        instructor: '',
        location: '',
        maxParticipants: ''
    });
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(null);

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
            setTrainings(res.data);
        } catch (err) {
            console.error('Error fetching trainings:', err);
            setAlert({
                open: true,
                message: 'Error fetching trainings',
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
            await axios.post(
                'http://localhost:5000/api/trainings',
                formData,
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                }
            );
            setOpen(false);
            fetchTrainings();
            setAlert({
                open: true,
                message: 'Training created successfully',
                severity: 'success'
            });
            setFormData({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                instructor: '',
                location: '',
                maxParticipants: ''
            });
        } catch (err) {
            console.error('Error creating training:', err);
            setAlert({
                open: true,
                message: 'Error creating training',
                severity: 'error'
            });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const handleEditOpen = (training) => {
        setEditData({ ...training, startDate: training.startDate?.slice(0, 16), endDate: training.endDate?.slice(0, 16) });
        setEditOpen(true);
    };

    const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:5000/api/trainings/${editData._id}`,
                editData,
                {
                    headers: {
                        'x-auth-token': localStorage.getItem('token')
                    }
                }
            );
            setEditOpen(false);
            setEditData(null);
            fetchTrainings();
            setAlert({
                open: true,
                message: 'Training updated successfully',
                severity: 'success'
            });
        } catch (err) {
            console.error('Error updating training:', err);
            setAlert({
                open: true,
                message: 'Error updating training',
                severity: 'error'
            });
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">Training Management</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpen(true)}
                >
                    Add New Training
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Instructor</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Max Participants</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trainings.map((training) => (
                            <TableRow key={training._id}>
                                <TableCell>{training.title}</TableCell>
                                <TableCell>{training.description}</TableCell>
                                <TableCell>{new Date(training.startDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(training.endDate).toLocaleDateString()}</TableCell>
                                <TableCell>{training.instructor}</TableCell>
                                <TableCell>{training.location}</TableCell>
                                <TableCell>{training.maxParticipants}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEditOpen(training)} startIcon={<EditIcon />} variant="outlined" size="small">
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Training</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            margin="normal"
                            multiline
                            rows={3}
                        />
                        <TextField
                            fullWidth
                            label="Start Date"
                            name="startDate"
                            type="datetime-local"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            label="End Date"
                            name="endDate"
                            type="datetime-local"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth
                            label="Instructor"
                            name="instructor"
                            value={formData.instructor}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Max Participants"
                            name="maxParticipants"
                            type="number"
                            value={formData.maxParticipants}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                <DialogTitle>Edit Training</DialogTitle>
                <DialogContent>
                    {editData && (
                        <Box component="form" sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={editData.title}
                                onChange={handleEditChange}
                                required
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={editData.description}
                                onChange={handleEditChange}
                                required
                                margin="normal"
                                multiline
                                rows={3}
                            />
                            <TextField
                                fullWidth
                                label="Start Date"
                                name="startDate"
                                type="datetime-local"
                                value={editData.startDate}
                                onChange={handleEditChange}
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                label="End Date"
                                name="endDate"
                                type="datetime-local"
                                value={editData.endDate}
                                onChange={handleEditChange}
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                label="Instructor"
                                name="instructor"
                                value={editData.instructor}
                                onChange={handleEditChange}
                                required
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={editData.location}
                                onChange={handleEditChange}
                                required
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Max Participants"
                                name="maxParticipants"
                                type="number"
                                value={editData.maxParticipants}
                                onChange={handleEditChange}
                                required
                                margin="normal"
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSubmit} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

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

export default TrainingManagement; 