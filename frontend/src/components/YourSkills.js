import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, LinearProgress, Button, TextField, Grid, Chip, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const trendIcons = {
  up: <ArrowUpwardIcon color="success" fontSize="small" />, 
  down: <ArrowDownwardIcon color="error" fontSize="small" />
};

const skillTypes = [
  { value: 'Technical', label: 'Technical' },
  { value: 'Soft Skills', label: 'Soft Skills' }
];

const initialSkills = [];

const YourSkills = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [form, setForm] = useState({
    name: '',
    percent: '',
    type: 'Technical',
    trend: 'up'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!form.name || !form.percent) return;
    setSkills([...skills, { ...form, percent: Number(form.percent) }]);
    setForm({ name: '', percent: '', type: 'Technical', trend: 'up' });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: '#1a7f37', mb: 2 }}>
          Your Skills
        </Typography>
        <Box component="form" onSubmit={handleAddSkill} sx={{ mb: 3 }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                label="Skill Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                size="small"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField
                label="%"
                name="percent"
                type="number"
                value={form.percent}
                onChange={handleChange}
                size="small"
                inputProps={{ min: 0, max: 100 }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl size="small" fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={form.type}
                  label="Type"
                  onChange={handleChange}
                >
                  {skillTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={2}>
              <FormControl size="small" fullWidth>
                <InputLabel>Trend</InputLabel>
                <Select
                  name="trend"
                  value={form.trend}
                  label="Trend"
                  onChange={handleChange}
                >
                  <MenuItem value="up">Up</MenuItem>
                  <MenuItem value="down">Down</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={1}>
              <Button type="submit" variant="contained" color="primary" size="small" fullWidth>
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
        {skills.length === 0 ? (
          <Typography color="textSecondary">No skills added yet.</Typography>
        ) : (
          skills.map((skill, idx) => (
            <Box key={idx} sx={{ mb: 2, p: 1, borderRadius: 2, background: '#f8fafc' }}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{skill.name}</Typography>
                  <Chip label={skill.type} size="small" sx={{ mt: 0.5 }} />
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>{skill.percent}%</Typography>
                    <LinearProgress variant="determinate" value={skill.percent} sx={{ flex: 1, height: 8, borderRadius: 5, background: '#e0e0e0', '& .MuiLinearProgress-bar': { backgroundColor: '#1a7f37' } }} />
                  </Box>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'right' }}>
                  {trendIcons[skill.trend]}
                </Grid>
              </Grid>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default YourSkills; 