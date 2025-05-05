
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const tasksRoutes = require('./routes/tasks');
const dbConnection = require('./db/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Routes
app.use('/api/tasks', tasksRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await dbConnection.query('SELECT 1');
    console.log('Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
