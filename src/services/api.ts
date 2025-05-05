
import { Task } from '../types/task';

const API_URL = 'http://localhost:5000/api';

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    return data.map((task: any) => ({
      ...task,
      id: task.id.toString(), // Convert to string to match our frontend ID format
      createdAt: new Date(task.createdAt)
    }));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    
    const data = await response.json();
    return {
      ...data,
      id: data.id.toString(), // Convert to string to match our frontend ID format
      createdAt: new Date(data.createdAt)
    };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    
    const data = await response.json();
    return {
      ...data,
      id: data.id.toString(), // Convert to string to match our frontend ID format
      createdAt: new Date(data.createdAt)
    };
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
