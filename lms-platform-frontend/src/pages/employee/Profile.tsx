import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Profile: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Box>
        <Typography variant="body1">
          Profile content will be added here.
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile; 