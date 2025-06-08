export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
} 