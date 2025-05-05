
<?php
require_once __DIR__ . '/../models/Task.php';

class TaskController {
    private $taskModel;

    public function __construct() {
        $this->taskModel = new Task();
    }

    public function getAll() {
        $tasks = $this->taskModel->getAll();
        header('Content-Type: application/json');
        echo json_encode($tasks);
    }

    public function getById($id) {
        $task = $this->taskModel->getById($id);
        
        if ($task) {
            header('Content-Type: application/json');
            echo json_encode($task);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Task not found']);
        }
    }

    public function create() {
        // Get posted data
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Validate required fields
        if (!isset($data['title'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Title is required']);
            return;
        }

        // Set defaults for optional fields
        $data['description'] = $data['description'] ?? '';
        $data['status'] = $data['status'] ?? 'todo';
        
        $id = $this->taskModel->create($data);
        
        if ($id) {
            $task = $this->taskModel->getById($id);
            http_response_code(201); // Created
            header('Content-Type: application/json');
            echo json_encode($task);
        } else {
            http_response_code(500); // Server error
            echo json_encode(['error' => 'Failed to create task']);
        }
    }

    public function update($id) {
        // Check if task exists
        $task = $this->taskModel->getById($id);
        if (!$task) {
            http_response_code(404);
            echo json_encode(['error' => 'Task not found']);
            return;
        }
        
        // Get posted data
        $data = json_decode(file_get_contents("php://input"), true);
        
        $result = $this->taskModel->update($id, $data);
        
        if ($result) {
            $updated_task = $this->taskModel->getById($id);
            header('Content-Type: application/json');
            echo json_encode($updated_task);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update task']);
        }
    }

    public function delete($id) {
        // Check if task exists
        $task = $this->taskModel->getById($id);
        if (!$task) {
            http_response_code(404);
            echo json_encode(['error' => 'Task not found']);
            return;
        }
        
        $result = $this->taskModel->delete($id);
        
        if ($result) {
            http_response_code(200);
            echo json_encode(['message' => 'Task deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete task']);
        }
    }
}
