<?php
session_start();

require_once 'db-config.php';

// CHECKING IF THE FORM WAS SUBMITTED
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = $_SESSION['user_id']; //if the user id is stored in the session
    $description = trim($_POST['description']);
    $email = trim($_POST['email']);
    $date = $_POST['reminder_date'];
    $time = $_POST['reminder_time'];

    // FOR THE REPEAT OPTION
    $repeat = isset($_POST['repeat_reminder']) ? 1 : 0;
    $frequency = $repeat ? $_POST['frequency'] : null;

    // sql statement
    $stmt = $conn->prepare("INSERT INTO reminder (user_id, description, email, reminder_date, reminder_time, repeat_reminder, frequency) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issssss", $user_id, $description, $email, $date, $time, $repeat, $frequency);
    // EXECUTE AND CHECK THE RESULT
    if ($stmt->execute()) {
        // Redirect to dashboard after success
        header("Location: ../dashboard.php?success=1");
        exit();
    } else {
        // Redirect back with error
        header("Location: ../dashboard.php?error=1");
        exit();
    }

    // Step 7: Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    header("Location: ../dashboard.php");
}
