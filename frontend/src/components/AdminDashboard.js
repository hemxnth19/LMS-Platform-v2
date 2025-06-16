import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    IconButton,
    AppBar,
    Toolbar,
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

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
        { text: 'Employees', icon: <PeopleIcon />, path: '/employees' },
        { text: 'Trainings', icon: <SchoolIcon />, path: '/trainings' },
        { text: 'Profile', icon: <PersonIcon />, path: '/profile' }
    ];

    const drawer = (
        <Box sx={{ width: 250 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    LMS Portal
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => {
                            navigate(item.path);
                            setDrawerOpen(false);
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button onClick={handleLogout}>
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
                        Admin Dashboard
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
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3} columns={12}>
                        <Grid md={4}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Total Employees
                                    </Typography>
                                    <Typography variant="h4">
                                        150
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid md={4}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Active Trainings
                                    </Typography>
                                    <Typography variant="h4">
                                        12
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid md={4}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Completed Trainings
                                    </Typography>
                                    <Typography variant="h4">
                                        45
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Quick Actions
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<PeopleIcon />}
                                            onClick={() => navigate('/employees')}
                                        >
                                            Manage Employees
                                        </Button>
                                    </Grid>
                                    <Grid>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SchoolIcon />}
                                            onClick={() => navigate('/trainings')}
                                        >
                                            Manage Trainings
                                        </Button>
                                    </Grid>
                                    <Grid>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<PersonIcon />}
                                            onClick={() => navigate('/profile')}
                                        >
                                            Update Profile
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Recent Activities
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="New employee registered"
                                            secondary="2 hours ago"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Training session completed"
                                            secondary="5 hours ago"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="New training scheduled"
                                            secondary="1 day ago"
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default AdminDashboard; 