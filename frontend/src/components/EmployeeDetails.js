import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip
} from '@mui/material';
import axios from 'axios';

const EmployeeDetails = () => {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users/employees', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setEmployees(res.data);
        } catch (err) {
            console.error('Error fetching employees:', err);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Employee Details
            </Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((employee) => (
                                    <TableRow hover key={employee._id}>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
                                        <TableCell>{employee.department || 'N/A'}</TableCell>
                                        <TableCell>{employee.position || 'N/A'}</TableCell>
                                        <TableCell>{employee.phone || 'N/A'}</TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={employee.role} 
                                                color={employee.role === 'admin' ? 'primary' : 'default'}
                                                size="small"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={employees.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default EmployeeDetails; 