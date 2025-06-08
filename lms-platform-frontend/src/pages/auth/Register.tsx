import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { registerStart, registerSuccess, registerFailure } from '../../features/auth/authSlice';
import { authAPI } from '../../services/api';
import type { SelectChangeEvent } from '@mui/material';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Link,
} from '@mui/material';

type Role = 'admin' | 'employee';

const Register = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'employee' as Role,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      role: e.target.value as Role,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      dispatch(registerStart());
      
      // Call the API to register the user
      const response = await authAPI.register(formData);
      
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      
      // Update Redux store with user data
      dispatch(registerSuccess({ user: response.user, token: response.token }));
      
      // Show success message
      setSuccess('Registration successful! Redirecting to dashboard...');
      
      // Redirect based on role with full URL
      const redirectPath = `http://localhost:5173/${response.user.role}`;
      console.log('Redirecting to:', redirectPath, 'for role:', response.user.role);
      
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 1000);
    } catch (err: any) {
      console.error('Registration error details:', err.response?.data);
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      dispatch(registerFailure(errorMessage));
      setError(errorMessage);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
            {success}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleTextChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleTextChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleTextChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleTextChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleTextChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={formData.role}
              label="Role"
              onChange={handleRoleChange}
            >
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register; 