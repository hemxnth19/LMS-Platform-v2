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
    School as SchoolIcon,
    Person as PersonIcon,
    ExitToApp as LogoutIcon
} from '@mui/icons-material';

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/employee-dashboard' },
        { text: 'My Trainings', icon: <SchoolIcon />, path: '/my-trainings' },
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
                        Employee Dashboard
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
                    <Grid container spacing={3}>
                        {/* Quick Stats */}
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Enrolled Trainings
                                    </Typography>
                                    <Typography variant="h4">
                                        3
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Completed Trainings
                                    </Typography>
                                    <Typography variant="h4">
                                        5
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Upcoming Trainings
                                    </Typography>
                                    <Typography variant="h4">
                                        2
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Quick Actions */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Quick Actions
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SchoolIcon />}
                                            onClick={() => navigate('/my-trainings')}
                                        >
                                            View My Trainings
                                        </Button>
                                    </Grid>
                                    <Grid item>
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

                        {/* Recent Activities */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Recent Activities
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary="Completed 'Advanced JavaScript' training"
                                            secondary="2 days ago"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Enrolled in 'React Development' course"
                                            secondary="1 week ago"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Updated profile information"
                                            secondary="2 weeks ago"
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

export default EmployeeDashboard; 