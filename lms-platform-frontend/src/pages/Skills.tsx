import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Chip,
  Button,
} from '@mui/material';
import {
  Code as CodeIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

interface Skill {
  id: string;
  name: string;
  category: string;
  progress: number;
  icon: React.ReactNode;
}

const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'JavaScript',
    category: 'Programming',
    progress: 85,
    icon: <CodeIcon />,
  },
  {
    id: '2',
    name: 'UI/UX Design',
    category: 'Design',
    progress: 65,
    icon: <PaletteIcon />,
  },
  {
    id: '3',
    name: 'Database Management',
    category: 'Backend',
    progress: 75,
    icon: <StorageIcon />,
  },
  {
    id: '4',
    name: 'Security',
    category: 'Security',
    progress: 45,
    icon: <SecurityIcon />,
  },
];

const Skills = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Skills Development
        </Typography>
        <Button variant="contained" color="primary">
          Add New Skill
        </Button>
      </Box>
      <Grid container spacing={3}>
        {mockSkills.map((skill) => (
          <Grid item xs={12} md={6} key={skill.id}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ mr: 2 }}>{skill.icon}</Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{skill.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {skill.category}
                  </Typography>
                </Box>
                <Chip
                  label={`${skill.progress}%`}
                  color={
                    skill.progress >= 80
                      ? 'success'
                      : skill.progress >= 60
                      ? 'warning'
                      : 'error'
                  }
                />
              </Box>
              <LinearProgress
                variant="determinate"
                value={skill.progress}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Skills; 