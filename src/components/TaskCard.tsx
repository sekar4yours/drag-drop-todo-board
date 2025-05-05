
import React, { useState } from 'react';
import { Task } from '../types/task';
import { useTaskContext } from '../context/TaskContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTask(task.id, {
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-sm">{task.title}</h3>
        <div className="flex space-x-1">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="w-full"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => deleteTask(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {task.description && (
        <p className="text-sm text-gray-500 mt-2">{task.description}</p>
      )}
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-gray-400">
          {formatDate(task.createdAt)}
        </span>
        {task.priority && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              task.priority === 'high'
                ? 'bg-red-100 text-red-800'
                : task.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {task.priority}
          </span>
        )}
      </div>
    </Card>
  );
};
