
<?php
// Load environment variables from .env file if it exists
$env_file = __DIR__ . '/../../.env';
if (file_exists($env_file)) {
    $lines = file($env_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        
        if (!empty($name)) {
            putenv("$name=$value");
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

// Set default environment variables if not set
if (!getenv('DB_HOST')) putenv('DB_HOST=localhost');
if (!getenv('DB_USER')) putenv('DB_USER=root');
if (!getenv('DB_PASSWORD')) putenv('DB_PASSWORD=');
if (!getenv('DB_NAME')) putenv('DB_NAME=task_manager');
if (!getenv('APP_ENV')) putenv('APP_ENV=development');
