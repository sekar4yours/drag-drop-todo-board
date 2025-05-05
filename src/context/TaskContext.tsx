
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskStatus } from '../types/task';
import { toast } from '@/hooks/use-toast';
import { fetchTasks, createTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from '../services/api';

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, newStatus: TaskStatus) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
      toast({
        title: "Error",
        description: "Failed to fetch tasks",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      setError(null);
      const newTask = await createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      toast({
        title: "Task added",
        description: `"${taskData.title}" has been added successfully.`,
      });
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding task:', err);
      toast({
        title: "Error",
        description: "Failed to add task",
        variant: "destructive",
      });
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      setError(null);
      const updatedTask = await apiUpdateTask(id, updates);
      setTasks(
        tasks.map((task) => (task.id === id ? updatedTask : task))
      );
      toast({
        title: "Task updated",
        description: "The task has been updated successfully.",
      });
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setError(null);
      const taskToDelete = tasks.find(task => task.id === id);
      await apiDeleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      toast({
        title: "Task deleted",
        description: taskToDelete ? `"${taskToDelete.title}" has been deleted.` : "Task has been deleted.",
        variant: "destructive",
      });
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  const moveTask = async (taskId: string, newStatus: TaskStatus) => {
    try {
      setError(null);
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;
      
      const updatedTask = await apiUpdateTask(taskId, { status: newStatus });
      setTasks(
        tasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      toast({
        title: "Task moved",
        description: `Task moved to ${newStatus.replace('-', ' ')}.`,
      });
    } catch (err) {
      setError('Failed to move task');
      console.error('Error moving task:', err);
      toast({
        title: "Error",
        description: "Failed to move task",
        variant: "destructive",
      });
    }
  };

  return (
    <TaskContext.Provider
      value={{ 
        tasks, 
        isLoading, 
        error,
        addTask, 
        updateTask, 
        deleteTask, 
        moveTask,
        refreshTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
