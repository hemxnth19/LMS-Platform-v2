import React, { useState } from 'react';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Link,
    ToggleButton,
    ToggleButtonGroup,
    Avatar
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [role, setRole] = useState('employee');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (event, newRole) => {
        if (newRole) setRole(newRole);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { ...formData, role });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            if (res.data.user.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/employee-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Container maxWidth="xs">
                <Paper elevation={6} sx={{ borderRadius: 4, p: 4, mt: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mb: 2 }}>
                            <SchoolIcon sx={{ fontSize: 40 }} />
                        </Avatar>
                        <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
                            Academy LMS
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
                            Professional Development Platform
                        </Typography>
                        <Typography variant="body2" color="success.main" align="center" sx={{ mb: 2 }}>
                            Empowering Growth Through Learning
                        </Typography>
                        <Typography variant="h6" fontWeight={600} align="center" sx={{ mt: 2, mb: 1 }}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                            Sign in to continue your learning journey
                        </Typography>
                        <ToggleButtonGroup
                            value={role}
                            exclusive
                            onChange={handleRoleChange}
                            sx={{ mb: 2, width: '100%' }}
                        >
                            <ToggleButton value="employee" sx={{ flex: 1 }}>
                                Employee
                            </ToggleButton>
                            <ToggleButton value="admin" sx={{ flex: 1 }}>
                                Admin
                            </ToggleButton>
                        </ToggleButtonGroup>
                        {error && (
                            <Typography color="error" align="center" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formData.email}
                                onChange={handleChange}
                                sx={{ background: '#f5f7fa', borderRadius: 2 }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                sx={{ background: '#f5f7fa', borderRadius: 2 }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ mt: 3, mb: 2, borderRadius: 2, fontWeight: 600, fontSize: 18 }}
                                startIcon={<SchoolIcon />}
                            >
                                Access Learning Dashboard
                            </Button>
                            <Box sx={{ textAlign: 'center' }}>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login; 