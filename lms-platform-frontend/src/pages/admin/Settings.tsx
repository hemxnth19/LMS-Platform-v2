import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  Alert,
  Snackbar,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const Settings: React.FC = () => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSave = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          System Settings
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  General Settings
                </Typography>
                <Stack spacing={3}>
                  <TextField
                    label="Platform Name"
                    defaultValue="Learning Management System"
                    fullWidth
                  />
                  <TextField
                    label="Support Email"
                    type="email"
                    defaultValue="support@company.com"
                    fullWidth
                  />
                  <TextField
                    label="Maximum File Upload Size (MB)"
                    type="number"
                    defaultValue="100"
                    fullWidth
                  />
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Notification Settings
                </Typography>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Email Notifications"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Push Notifications"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Weekly Digest"
                  />
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Security Settings
                </Typography>
                <Stack spacing={3}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Two-Factor Authentication"
                  />
                  <TextField
                    label="Session Timeout (minutes)"
                    type="number"
                    defaultValue="30"
                    fullWidth
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Password Expiration"
                  />
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  System Information
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Version
                    </Typography>
                    <Typography variant="body1">1.0.0</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Last Updated
                    </Typography>
                    <Typography variant="body1">March 18, 2024</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Database Size
                    </Typography>
                    <Typography variant="body1">2.5 GB</Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Maintenance
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    color="warning"
                    fullWidth
                  >
                    Clear Cache
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                  >
                    Reset System
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings; 