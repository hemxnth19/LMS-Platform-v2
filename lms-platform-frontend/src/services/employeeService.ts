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
<<<<<<< HEAD
      const response = await axios.get(`${API_URL}/auth/users`, {
=======
      const response = await axios.get(`${API_URL}/users`, {
>>>>>>> 8466164199ee7646163a02125470e8e0d004456b
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
<<<<<<< HEAD
      const response = await axios.get(`${API_URL}/admin/employees/${id}`, {
=======
      const response = await axios.get(`${API_URL}/users/${id}`, {
>>>>>>> 8466164199ee7646163a02125470e8e0d004456b
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
<<<<<<< HEAD
      return response.data.employee;
=======
      return response.data;
>>>>>>> 8466164199ee7646163a02125470e8e0d004456b
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
  },

  updateEmployee: async (id: string, data: Partial<Employee>): Promise<Employee> => {
    try {
<<<<<<< HEAD
      const response = await axios.put(`${API_URL}/admin/employees/${id}`, data, {
=======
      const response = await axios.put(`${API_URL}/users/${id}`, data, {
>>>>>>> 8466164199ee7646163a02125470e8e0d004456b
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