import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface Employee {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  role: string;
  status: 'active' | 'revoked';
  createdAt: string;
  updatedAt: string;
}

export const employeeService = {
  getAllEmployees: async (): Promise<Employee[]> => {
    try {
      const response = await axios.get(`${API_URL}/auth/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  },

  getEmployeeById: async (id: string): Promise<Employee> => {
    try {
      const response = await axios.get(`${API_URL}/admin/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.employee;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  },

  updateEmployee: async (id: string, data: Partial<Employee>): Promise<Employee> => {
    try {
      const response = await axios.put(`${API_URL}/admin/employees/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  },
}; 