
import React, { useState } from 'react';
import { TaskColumn } from './TaskColumn';
import { AddTaskDialog } from './AddTaskDialog';
import { useTaskContext } from '../context/TaskContext';
import { TaskStatus } from '../types/task';

export const TaskBoard: React.FC = () => {
  const { tasks, moveTask } = useTaskContext();
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    
    if (draggedTaskId) {
      const task = tasks.find((t) => t.id === draggedTaskId);
      if (task && task.status !== status) {
        moveTask(draggedTaskId, status);
      }
      setDraggedTaskId(null);
    }
  };

  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Task Management Board</h1>
        <AddTaskDialog />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskColumn
          title="To Do"
          status="todo"
          tasks={todoTasks}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <TaskColumn
          title="In Progress"
          status="in-progress"
          tasks={inProgressTasks}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <TaskColumn
          title="Completed"
          status="completed"
          tasks={completedTasks}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      </div>
    </div>
  );
};
