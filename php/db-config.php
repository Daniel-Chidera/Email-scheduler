<?php 
    $host = 'localhost:3307';
    $username = 'root';
    $password = 12345;
    $database = 'Email-Scheduler';


        $conn = mysqli_connect($host, $username, $password, $database);

    // CHHECKING THE CONNECTION
    if(!$conn) {
        die("Connection Failed: ". mysqli_connect_error());
    }
?>