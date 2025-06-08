export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  enrolled?: boolean;
  progress?: number;
  instructor?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
} 