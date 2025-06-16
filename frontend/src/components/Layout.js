import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Toolbar,
    AppBar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    School as SchoolIcon,
    Person as PersonIcon,
    ExitToApp as LogoutIcon
} from '@mui/icons-material';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const userStr = localStorage.getItem('user');
    let user = null;
    try {
        user = userStr ? JSON.parse(userStr) : null;
    } catch (e) {
        user = null;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Menu items based on role
    let menuItems = [];
    if (user?.role === 'admin') {
        menuItems = [
            { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
            { text: 'Employees', icon: <PeopleIcon />, path: '/employees' },
            { text: 'Trainings', icon: <SchoolIcon />, path: '/trainings' },
            { text: 'Profile', icon: <PersonIcon />, path: '/profile' }
        ];
    } else if (user?.role === 'employee') {
        menuItems = [
            { text: 'Dashboard', icon: <DashboardIcon />, path: '/employee-dashboard' },
            { text: 'My Trainings', icon: <SchoolIcon />, path: '/my-trainings' },
            { text: 'Profile', icon: <PersonIcon />, path: '/profile' }
        ];
    }

    const drawer = (
        <Box sx={{ width: 250 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    LMS Portal
                </Typography>
            </Toolbar>
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        component="button"
                        key={item.text}
                        onClick={() => {
                            navigate(item.path);
                            setDrawerOpen(false);
                        }}
                        sx={{
                            border: 'none',
                            boxShadow: 'none',
                            borderRadius: 0,
                            '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.08)', // MUI primary.main with opacity
                            },
                            transition: 'background 0.2s',
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            <List>
                <ListItem component="button" onClick={handleLogout} sx={{ border: 'none', boxShadow: 'none', borderRadius: 0, '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' }, transition: 'background 0.2s' }}>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => setDrawerOpen(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {user?.role === 'admin' ? 'Admin Dashboard' : 'Employee Dashboard'}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                {drawer}
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: '100%',
                    minHeight: '100vh',
                    backgroundColor: '#f5f5f5'
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout; 