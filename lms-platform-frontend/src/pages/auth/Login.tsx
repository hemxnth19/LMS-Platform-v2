import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import { authAPI } from '../../services/api';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
} from '@mui/material';

const Login = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      dispatch(loginStart());

      // Call the API to login
      const response = await authAPI.login(formData);
      console.log('Login response:', response);
      
      // Save the token and user data in localStorage
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      // Update Redux store with user data
      dispatch(loginSuccess({ user: response.user, token: response.token }));
      
      // Redirect based on role
      const redirectPath = response.user.role === 'admin' ? '/admin' : '/employee';
      console.log('Redirecting to:', redirectPath, 'for role:', response.user.role);
      
      // Use window.location for a full page reload to ensure proper state initialization
      window.location.href = redirectPath;
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
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
          Sign in
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
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
            onChange={handleChange}
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/register" variant="body2">
              Don't have an account? Sign up
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login; 