import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './theme';
import { useAppSelector, useAppDispatch } from './hooks/useAppDispatch';
import { useEffect } from 'react';
import { fetchUserData } from './features/auth/authSlice';

// Layouts
import AdminLayout from './components/admin/AdminLayout';
import EmployeeLayout from './components/employee/EmployeeLayout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/Dashboard';
import EmployeeDashboard from './pages/employee/Dashboard';
import Courses from './pages/employee/Courses';
import Skills from './pages/employee/Skills';
import Calendar from './pages/employee/Calendar';
import CourseManagement from './pages/admin/CourseManagement';
import EmployeeManagement from './pages/admin/EmployeeManagement';
import Settings from './pages/admin/Settings';

const PrivateRoute = ({ children, role }: { children: React.ReactNode; role: 'admin' | 'employee' }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const token = localStorage.getItem('token');

  console.log('PrivateRoute check:', { isAuthenticated, user, token, requiredRole: role });

  // Check if we have a token
  if (!token) {
    console.log('No token, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // If we have a token but no user data, redirect to login
  if (!user) {
    console.log('No user data, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Check if user's role matches the required role
  if (user.role !== role) {
    console.log('Role mismatch:', { userRole: user.role, requiredRole: role });
    return <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
            <Routes>
            {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute role="admin">
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="employees" element={<EmployeeManagement />} />
              <Route path="settings" element={<Settings />} />
            </Route>
              
              {/* Employee Routes */}
            <Route
              path="/employee"
              element={
                <PrivateRoute role="employee">
                  <EmployeeLayout />
                </PrivateRoute>
              }
            >
                <Route index element={<EmployeeDashboard />} />
                <Route path="courses" element={<Courses />} />
                <Route path="skills" element={<Skills />} />
                <Route path="calendar" element={<Calendar />} />
              </Route>

            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
