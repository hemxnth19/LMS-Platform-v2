import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getToken = () => {
  return localStorage.getItem('token');
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export const trainingAPI = {
  // Get all trainings
  getAllTrainings: async () => {
    const response = await axios.get(`${API_URL}/trainings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  // Get a specific training
  getTrainingById: async (id: string) => {
    const response = await axios.get(`${API_URL}/trainings/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  // Create a new training
  createTraining: async (trainingData: any) => {
    const response = await axios.post(`${API_URL}/trainings`, trainingData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  // Join a training
  joinTraining: async (trainingId: string) => {
    const response = await axios.post(
      `${API_URL}/trainings/${trainingId}/join`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  },
};

export default api; 