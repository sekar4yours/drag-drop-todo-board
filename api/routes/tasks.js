
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get all tasks
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks ORDER BY createdAt DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// Get task by ID
router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

// Create new task
router.post('/', async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const [result] = await db.query(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      [title, description || '', status || 'to-do']
    );
    
    const [newTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(newTask[0]);
  } catch (error) {
    next(error);
  }
});

// Update task
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const taskId = req.params.id;
    
    // Check if task exists
    const [existingTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    
    if (existingTask.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await db.query(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
      [title, description, status, taskId]
    );
    
    const [updatedTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    res.json(updatedTask[0]);
  } catch (error) {
    next(error);
  }
});

// Delete task
router.delete('/:id', async (req, res, next) => {
  try {
    const taskId = req.params.id;
    
    // Check if task exists
    const [existingTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    
    if (existingTask.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
