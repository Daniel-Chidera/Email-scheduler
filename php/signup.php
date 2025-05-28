<?php
require_once 'db-config.php';

// IF THE FORM IS SUBMITTED WITH POST METHOD
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    // trim removes whitespace from the beginning and end of the string
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // validate input
    if (empty($name) || empty($email) || empty($password)) {
        echo "Please Fill In All Info.";
        exit;
    }

    // valiidating email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid Email Format";
        exit;
    }

    // CHECKING IF THE EMAIL ALREADY EXIST
    $checkQuery = "SELECT id FROM users WHERE email = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "Email's Already Registered";
        $stmt->close();
        exit;
    }
    $stmt->close();


    // HASHING THE PASSWORD
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // INSERT THE NEW USER
    $insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($insertQuery);
    $stmt->bind_param("sss", $name, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo "Signup Successful";
        header("Location: ../index.html?signup=success");
        exit();
    }
    else {
        echo "Error: " . $stmt->error; 
    }

    $stmt->close();
    $conn->close();
}
else {
    // NOT A POST REQUEST?
    echo "INVALID REQUEST METHOD";
    exit;
}