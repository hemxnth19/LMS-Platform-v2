import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import TrainingManagement from './components/TrainingManagement';
import EmployeeManagement from './components/EmployeeManagement';
import Profile from './components/Profile';
import Layout from './components/Layout';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

const getUserFromLocalStorage = () => {
    const userStr = localStorage.getItem('user');
    let user = null;
    try {
        user = userStr ? JSON.parse(userStr) : null;
    } catch (e) {
        user = null;
    }
    return user;
};

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const user = getUserFromLocalStorage();
    return token && user?.role === 'admin' ? children : <Navigate to="/login" />;
};

const EmployeeRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const user = getUserFromLocalStorage();
    return token && user?.role === 'employee' ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <AdminRoute>
                                <Layout>
                                    <AdminDashboard />
                                </Layout>
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/employee-dashboard"
                        element={
                            <EmployeeRoute>
                                <Layout>
                                    <EmployeeDashboard />
                                </Layout>
                            </EmployeeRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <Layout>
                                    <AdminDashboard />
                                </Layout>
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/trainings"
                        element={
                            <AdminRoute>
                                <Layout>
                                    <TrainingManagement />
                                </Layout>
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/employees"
                        element={
                            <AdminRoute>
                                <Layout>
                                    <EmployeeManagement />
                                </Layout>
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Profile />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
