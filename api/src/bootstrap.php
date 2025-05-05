
<?php
// Load environment variables
require_once __DIR__ . '/config/env.php';

// Set up error handling and display
if (getenv('APP_ENV') === 'development') {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Parse the URL to determine the route
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = trim($path, '/');
$segments = explode('/', $path);

// Basic routing
if (empty($segments[0]) || $segments[0] !== 'api') {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
    exit;
}

if (isset($segments[1]) && $segments[1] === 'tasks') {
    require_once __DIR__ . '/controllers/TaskController.php';
    $controller = new TaskController();
    
    // Handle different HTTP methods
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (isset($segments[2])) {
                // Get a specific task
                $controller->getById($segments[2]);
            } else {
                // Get all tasks
                $controller->getAll();
            }
            break;
        case 'POST':
            // Create a new task
            $controller->create();
            break;
        case 'PUT':
            if (isset($segments[2])) {
                // Update a specific task
                $controller->update($segments[2]);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Task ID is required']);
            }
            break;
        case 'DELETE':
            if (isset($segments[2])) {
                // Delete a specific task
                $controller->delete($segments[2]);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Task ID is required']);
            }
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
            break;
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
