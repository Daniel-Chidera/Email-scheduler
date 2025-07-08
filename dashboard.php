<?php
session_start();

require_once './php/db-config.php';

// FOR THE TIMEOUT 
$timeout_duration = 1200; //900 is 15 mins

// if the user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: index.html");
    exit();
}

// CHECK LAST ACTIVITY ON THE DASHBOARD and activating it on the last activity
if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {

    session_unset();
    session_destroy();
    header("Location: index.html?dashboard-timeout=true");
    exit();
}

// To update the time stamp
$_SESSION['LAST_ACTIVITY'] = time();


// FOR THE USER PROFILE INITIALS
$full_name = $_SESSION['full_name'] ?? 'User'; // Get full name from session or default to 'User'
$words = explode(' ', $full_name); // Split name into words
$initials = strtoupper(substr($words[0], 0, 1) . (isset($words[1]) ? substr($words[1], 0, 1) : '')); // Build initials
?>



<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email-Scheduler Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="Assets/css/dashboard.css">
</head>

<body>
    <div class="container">
        <aside class="sidebar">
            <div class="logo">Email-Scheduler</div>
            <nav>
                <ul>
                    <li><a href="#"><i class="fas fa-chart-line"></i> Dashboard</a></li>
                    <li><a href="#" onclick="openModal()"><i class="fas fa-plus-circle"></i> Create Reminder</a></li>
                    <li><a href="#"><i class="fas fa-history"></i> History</a></li>
                    <li><a href="#"><i class="fas fa-cog"></i> Settings</a></li>
                    <li id="deleteAllMenuItem">
                        <i class="fas fa-trash-alt"></i> Delete All Reminders
                    </li>
                    <li> <a href="php/logout.php"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                </ul>
            </nav>
        </aside>

        <main class="main-content full">
            <header class="header">
                <div class="menu-toggle" onclick="toggleMenu()">
                    <i id="menu-icon" class="fas fa-bars"></i>
                </div>

                <!-- MAKING IT DISPLAY THE NAME OF THE USER -->
                <div class="header-title">Welcome
                    <?php echo isset($_SESSION['user_name']) ? $_SESSION['user_name'] : ''; ?></div>

                <div class="search-user">
                    <input type="text" placeholder="Search...">
                    <div class="user-icon">
                        <?php echo $initials; ?>
                    </div>
                </div>
            </header>

            <!-- THE STATS SECTION  -->
            <?php
            include_once 'stats-section.php';
            ?>

            <section class="recent-reminders">
                <h2>Recent Reminders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Reminder</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Repeat</th>
                        </tr>
                    </thead>
                    <tbody id="reminder-list">
                        <?php
                        $user_id = $_SESSION['user_id'];

                        $sql = "SELECT * FROM reminder WHERE user_id = ?";
                        $stmt = $conn->prepare($sql);
                        $stmt->bind_param("i", $user_id);
                        $stmt->execute();
                        $result = $stmt->get_result();

                        if ($result->num_rows > 0):
                            while ($row = $result->fetch_assoc()):
                        ?>
                                <tr class="reminder-row" data-id="<?= $row['id'] ?>"
                                    data-text="<?= htmlspecialchars($row['description']) ?>"
                                    data-email="<?= htmlspecialchars($row['email']) ?>" data-date="<?= $row['reminder_date'] ?>"
                                    data-time="<?= $row['reminder_time'] ?>">
                                    <td><?= htmlspecialchars($row['description']) ?></td>
                                    <td><?= htmlspecialchars($row['email']) ?></td>
                                    <td><?= $row['reminder_date'] ?></td>
                                    <td><?= $row['reminder_time'] ?></td>
                                    <td><?= $row['frequency'] ? htmlspecialchars($row['frequency']) : 'None' ?></td>
                                </tr>
                            <?php endwhile;
                        else: ?>
                            <tr>
                                <td colspan="5">No reminders found.</td>
                            </tr>
                        <?php endif; ?>
                    </tbody>

                </table>

                <!-- Edit Reminder Modal File-->
                <?php include_once 'edit-dashboard.php' ?>

                <!-- Delete Confirmation Modal File -->
                <?php include_once 'edit-dashboard.php' ?>
            </section>



            <section class="calendar">
                <h2>Calendar</h2>
                <input type="date" id="date-picker">
            </section>

            <button class="add-reminder-btn" onclick="openModal()">Add New Reminder</button>
        </main>
    </div>

    <div class="modal" id="modal">
        <div class="modal-content">
            <form action="php/add-reminder.php" method="POST">

                <span class="close" onclick="closeModal()">&times;</span>
                <h2>Add New Reminder</h2>
                <input type="text" name="description" id="reminder-input" placeholder="Enter reminder">
                <input type="email" name="email" id="email-input"
                    value="<?php echo isset($_SESSION['user_email']) ? $_SESSION['user_email'] : ''; ?>"
                    placeholder="Enter email">
                <input type="date" name="reminder_date" id="date-input" value="<?php echo date('Y-m-d'); ?>" required>
                <input type="time" name="reminder_time" id="time-input" value="<?php echo date('H:i'); ?>" required>

                <div class="repeat-reminder">
                    <label class="repeat-toggle">
                        <input type="checkbox" id="repeat-checkbox" name="repeat_reminder">
                        Repeat Reminder?
                    </label>

                    <div id="repeat-options">
                        <label for="repeat-frequency">Repeat Frequency:</label>
                        <select id="repeat-frequency" name="frequency">
                            <option value="none">Don't Repeat</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                </div>

                <!-- <button onclick="addReminder()">Add</button> -->
                <button type="submit">Add</button>
            </form>
        </div>
    </div>


    <!-- THIS IS FOR THE DELETE ALL REMINDER -->
    <section class="delete-all-reminder-modal-wrapper" id="deleteAllReminderModal">
        <article class="delete-all-reminder-modal-box">
            <h3>Are you sure you want to delete all reminders?</h3>
            <div class="delete-all-reminder-modal-actions">
                <button id="confirmDeleteAllBtn">Yes, Delete</button>
                <button id="cancelDeleteAllBtn">Cancel</button>
            </div>
        </article>
    </section>

    <script src="Assets/js/dashboard.js"></script>
    <script src="Assets/js/remindermodal.js"></script>
</body>

</html>