<?php
session_start();
include 'db-config.php';

$user_id = $_SESSION['user_id'] ?? null;

if ($user_id) {
    $sql = "DELETE FROM reminder WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    if ($stmt->execute()) {
        header("Location: ../dashboard.php?deleted=1");
        exit;
    } else {
        echo "Error deleting reminders.";
    }
} else {
    header("Location: ../index.html");
    exit;
}
?>
