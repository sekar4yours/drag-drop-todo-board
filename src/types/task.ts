
export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  priority?: TaskPriority;
}
