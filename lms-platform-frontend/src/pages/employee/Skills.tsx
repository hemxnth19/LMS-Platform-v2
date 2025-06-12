import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  Chip,
  Stack,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  progress: number;
  targetLevel: number;
}

const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'React',
    level: 4,
    category: 'Frontend Development',
    progress: 80,
    targetLevel: 5,
  },
  {
    id: '2',
    name: 'Node.js',
    level: 3,
    category: 'Backend Development',
    progress: 60,
    targetLevel: 4,
  },
  {
    id: '3',
    name: 'Python',
    level: 4,
    category: 'Programming',
    progress: 90,
    targetLevel: 5,
  },
];

const Skills: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              My Skills
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                color="primary"
              >
                Add New Skill
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Skill Progress Overview
                </Typography>
                {mockSkills.map((skill) => (
                  <Box key={skill.id} sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1">{skill.name}</Typography>
                      <Chip
                        label={`Level ${skill.level}`}
                        size="small"
                        color="primary"
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.progress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {skill.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Target: Level {skill.targetLevel}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Skill Insights
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon sx={{ mr: 1, color: 'success.main' }} />
                    <Typography>
                      Most Improved: React (+2 levels this quarter)
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StarIcon sx={{ mr: 1, color: 'warning.main' }} />
                    <Typography>
                      Top Skill: Python (Level 4)
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Recommended Skills
                </Typography>
                <Stack spacing={1}>
                  <Chip label="TypeScript" />
                  <Chip label="AWS" />
                  <Chip label="Docker" />
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Skills; 