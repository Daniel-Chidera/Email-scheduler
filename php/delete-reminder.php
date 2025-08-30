<?php
require_once 'db-config.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: ../index.html");
    exit();
}

// Check if reminder ID is provided
if (!empty($_GET['id'])) {
    $reminder_id = intval($_GET['id']);
    $user_id = $_SESSION['user_id'];

    // Delete reminder only if it belongs to the logged-in user
    $stmt = $conn->prepare("DELETE FROM reminder WHERE id = ? AND user_id = ?");
    $stmt->bind_param('ii', $reminder_id, $user_id);

    if ($stmt->execute()) {
        // Check if a row was actually deleted
        if ($stmt->affected_rows > 0) {
            header("Location: ../dashboard.php?deleted=1");
        } else {
            // No rows affected - reminder doesn't exist or doesn't belong to user
            header("Location: ../dashboard.php?error=not_found");
        }
    } else {
        // Database error
        header("Location: ../dashboard.php?error=delete_failed");
    }

    $stmt->close();
} else {
    // No ID provided
    header("Location: ../dashboard.php?error=no_id");
}

$conn->close();
?>

<!-- Delete Confirmation Modal -->
<div id="deleteModal" class="delete-modal">
    <div class="delete-modal-content">
        <h3>Are you sure you want to delete this reminder?</h3>
        <div class="delete-modal-buttons">
            <button id="deleteModalConfirmBtn">Yes, Delete</button>
            <button id="deleteModalCancelBtn">Cancel</button>
        </div>
    </div>
</div>