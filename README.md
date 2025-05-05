
# Task Manager Application

A full-stack task management application with a React frontend and PHP backend with MySQL database.

## Project Structure

- `/src` - React frontend code
- `/api` - PHP backend API
- `/mysql` - MySQL initialization scripts

## Setup and Running

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)

### Running with Docker

1. Clone this repository
2. Create a `.env` file in the `/api` directory (you can copy from `.env.example`)
3. Start the services:

```bash
docker-compose up -d
```

This will start:
- The PHP/Apache API on port 5000
- MySQL database on port 3306

### API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Development

For local development:

1. Install dependencies:
```bash
npm install
```

2. Run the frontend in development mode:
```bash
npm run dev
```

## Database

The MySQL database includes a `tasks` table with the following structure:

- `id` (INT, auto-increment, primary key)
- `title` (VARCHAR, required)
- `description` (TEXT)
- `status` (ENUM: 'to-do', 'in-progress', 'completed')
- `createdAt` (TIMESTAMP)
