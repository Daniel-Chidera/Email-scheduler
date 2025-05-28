<?php 
    session_start();

    //connecting the database
    require_once 'db-config.php';

    // CHECK THE REQUEST METHOD
    if ($_SERVER["REQUEST_METHOD"]  === "POST")  {
        $email = trim($_POST['email']);
        $password = $_POST['password'];

         // Prepare SQL to prevent SQL injection
        $stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);

        //EXECUTE THE QUERY
        $stmt->execute();
        $result = $stmt->get_result();
    
        // Check if a user with that email exists
        if($result->num_rows === 1){
            $user = $result->fetch_assoc();
            
            //VERIFY PASSWORD FOOR THE HASHED PASSWORD
            if (password_verify($password, $user['password'])) {
                // LOGIN SUCCESSFUL STORE THE USER DATA IN SESSION
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];

                //REDIRECTING TO THE DASHBOARD
                header("Location: ../dashboard.php");
                exit();
            }
            else{
                // WRONG PASSWORD
                echo "Invalid email or password";
            }
        }
        else{
            // IF THE ENAIL ISN'T FOUND IN THE DB
            echo "Email not found";
        }
    }
    else{
        // IF IT'S NOT A POST REQUEST
        header("Location: ../index.html");
        exit();
    }


?>