
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskStatus } from '../types/task';
import { toast } from '@/hooks/use-toast';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
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
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        // Parse dates properly
        const parsedTasks = JSON.parse(savedTasks);
        return parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
      } catch (error) {
        console.error('Failed to parse tasks from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
    toast({
      title: "Task added",
      description: `"${taskData.title}" has been added successfully.`,
    });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
    toast({
      title: "Task updated",
      description: "The task has been updated successfully.",
    });
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: taskToDelete ? `"${taskToDelete.title}" has been deleted.` : "Task has been deleted.",
      variant: "destructive",
    });
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    toast({
      title: "Task moved",
      description: `Task moved to ${newStatus.replace('-', ' ')}.`,
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, moveTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
