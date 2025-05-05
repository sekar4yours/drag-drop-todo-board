
import React from 'react';
import { TaskCard } from './TaskCard';
import { Task, TaskStatus } from '../types/task';

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: TaskStatus) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  status,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <div
      className={`task-column ${status}`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
    >
      <div className={`column-header ${status}`}>
        {title}
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
        ))}
      </div>
    </div>
  );
};
