import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import { employeeService } from '../../services/employeeService';
import type { Employee } from '../../services/employeeService';

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getAllEmployees();
      // Filter only employees with role 'employee'
      const employeeData = data.filter(emp => emp.role === 'employee');
      setEmployees(employeeData);
    } catch (err) {
      setError('Failed to fetch employees. Please try again later.');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmployee(null);
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  const handleRevokeAccess = async (employee: Employee) => {
    try {
      await employeeService.updateEmployee(employee._id, { status: 'revoked' });
      fetchEmployees();
    } catch (err) {
      setError('Failed to revoke employee access');
      console.error('Error revoking access:', err);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              Employee Management
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
              >
                Add Employee
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Last Active</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2 }}>
                        {employee.firstName?.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body1">
                          {employee.firstName} {employee.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          @{employee.username}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{employee.department || 'N/A'}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={employee.status || 'active'}
                      color={employee.status === 'revoked' ? 'error' : 'success'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    {new Date(employee.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewEmployee(employee)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      {employee.status !== 'revoked' && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRevokeAccess(employee)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedEmployee ? 'Employee Details' : 'Add New Employee'}
        </DialogTitle>
        <DialogContent>
          {selectedEmployee ? (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 64, height: 64, mr: 2 }}>
                    {selectedEmployee.firstName?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">
                      {selectedEmployee.firstName} {selectedEmployee.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedEmployee.email}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Department
                </Typography>
                <Typography variant="body1">{selectedEmployee.department || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Position
                </Typography>
                <Typography variant="body1">{selectedEmployee.position || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Username
                </Typography>
                <Typography variant="body1">@{selectedEmployee.username}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Role
                </Typography>
                <Typography variant="body1">{selectedEmployee.role}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Created At
                </Typography>
                <Typography variant="body1">
                  {new Date(selectedEmployee.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Updated
                </Typography>
                <Typography variant="body1">
                  {new Date(selectedEmployee.updatedAt).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                label="First Name"
                fullWidth
                required
              />
              <TextField
                label="Last Name"
                fullWidth
                required
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
              />
              <TextField
                label="Username"
                fullWidth
                required
              />
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select label="Department">
                  <MenuItem value="engineering">Engineering</MenuItem>
                  <MenuItem value="data-science">Data Science</MenuItem>
                  <MenuItem value="design">Design</MenuItem>
                  <MenuItem value="marketing">Marketing</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <Select label="Position">
                  <MenuItem value="developer">Developer</MenuItem>
                  <MenuItem value="data-scientist">Data Scientist</MenuItem>
                  <MenuItem value="designer">Designer</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {selectedEmployee ? (
            <>
              {selectedEmployee.status !== 'revoked' && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRevokeAccess(selectedEmployee)}
                >
                  Revoke Access
                </Button>
              )}
              <Button variant="contained" color="primary">
                Edit Profile
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary">
              Add Employee
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmployeeManagement; 