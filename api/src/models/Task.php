
<?php
require_once __DIR__ . '/../config/Database.php';

class Task {
    private $conn;
    private $table = 'tasks';

    public function __construct() {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getAll() {
        $query = "SELECT * FROM {$this->table} ORDER BY createdAt DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $query = "SELECT * FROM {$this->table} WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $query = "INSERT INTO {$this->table} (title, description, status) VALUES (:title, :description, :status)";
        $stmt = $this->conn->prepare($query);
        
        // Sanitize data
        $title = htmlspecialchars(strip_tags($data['title']));
        $description = htmlspecialchars(strip_tags($data['description']));
        $status = htmlspecialchars(strip_tags($data['status']));
        
        // Bind parameters
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':status', $status);
        
        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        
        return false;
    }

    public function update($id, $data) {
        // Build the update query based on provided fields
        $updateFields = [];
        $params = [':id' => $id];
        
        if (isset($data['title'])) {
            $updateFields[] = "title = :title";
            $params[':title'] = htmlspecialchars(strip_tags($data['title']));
        }
        
        if (isset($data['description'])) {
            $updateFields[] = "description = :description";
            $params[':description'] = htmlspecialchars(strip_tags($data['description']));
        }
        
        if (isset($data['status'])) {
            $updateFields[] = "status = :status";
            $params[':status'] = htmlspecialchars(strip_tags($data['status']));
        }
        
        if (empty($updateFields)) {
            return true; // Nothing to update
        }
        
        $query = "UPDATE {$this->table} SET " . implode(', ', $updateFields) . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        
        return $stmt->execute($params);
    }

    public function delete($id) {
        $query = "DELETE FROM {$this->table} WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        
        return $stmt->execute();
    }
}
