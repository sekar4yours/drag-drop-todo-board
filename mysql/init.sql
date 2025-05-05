
CREATE DATABASE IF NOT EXISTS task_manager;
USE task_manager;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('to-do', 'in-progress', 'completed') DEFAULT 'to-do',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO tasks (title, description, status) VALUES 
  ('Complete project documentation', 'Write comprehensive documentation for the task manager project', 'to-do'),
  ('Fix login bug', 'Address issues with login functionality', 'in-progress'),
  ('Deploy to production', 'Deploy application to production environment', 'completed');
