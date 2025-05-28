-- THE CODE BASE FOR THE DB "EMAIL-SCHEDULER'
CREATE DATABASE IF NOT EXISTS `Email-Scheduler`;
USE `Email-Scheduler`;

-- THE CODE BASE FOR THE USER TABLE
CREATE TABLE IF NOT EXISTS `users` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- THE DASHBOARD
-- The Add Reminder Table
CREATE TABLE reminder (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL,
    reminder_date DATE NOT NULL,
    reminder_time TIME NOT NULL,
    repeat_interval ENUM('none', 'daily', 'weekly', 'monthly') DEFAULT 'none',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEy (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- REFERENCES users(id) - This tells the database which table and column the foreign key points to

-- ON DELETE CASCADE - This defines what happens when a user is deleted from the users table.