export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  skills: string[];
  status: 'active' | 'inactive' | 'enrolled' | 'completed';
  progress?: number;
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface SkillsState {
  skills: Skill[];
  loading: boolean;
  error: string | null;
}

export interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface Employee {
  id: string;
  userId: string;
  department: string;
  position: string;
  skills: Skill[];
  certifications: string[];
  enrolledCourses: string[];
  completedCourses: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeesState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  courses: CoursesState;
  skills: SkillsState;
  employees: EmployeesState;
}

export interface AuthResponse {
  user: User;
  token: string;
} 