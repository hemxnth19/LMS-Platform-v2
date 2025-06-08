import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    department?: string;
    position?: string;
    role: 'admin' | 'employee';
  }) => {
    console.log('Sending registration data:', userData);
    try {
      const response = await api.post('/auth/register', userData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data);
      throw error;
    }
  },

  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const coursesAPI = {
  getCourses: async () => {
    const response = await api.get('/courses');
    return response.data;
  },

  getCourse: async (id: string) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  createCourse: async (courseData: any) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },

  updateCourse: async (id: string, courseData: any) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },

  deleteCourse: async (id: string) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },
};

export const skillsAPI = {
  getSkills: async () => {
    const response = await api.get('/skills');
    return response.data;
  },

  getUserSkills: async (userId: string) => {
    const response = await api.get(`/skills/user/${userId}`);
    return response.data;
  },

  updateUserSkills: async (userId: string, skills: string[]) => {
    const response = await api.put(`/skills/user/${userId}`, { skills });
    return response.data;
  },
};

export const employeesAPI = {
  getEmployees: async () => {
    const response = await api.get('/employees');
    return response.data;
  },

  getEmployee: async (id: string) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  updateEmployee: async (id: string, employeeData: any) => {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  },
};

export const notificationsAPI = {
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  deleteNotification: async (id: string) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },
};

export default api; 