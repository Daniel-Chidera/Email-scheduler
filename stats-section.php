<section class="stats">
    <div class="stat-card">Total Reminders:
        <span id="total-reminders">

            <?php
                $user_id = $_SESSION['user_id'];
                $totalQuery = "SELECT COUNT(*) as total FROM reminder WHERE user_id = ?";
                $stmt = $conn->prepare($totalQuery);
                $stmt->bind_param("i", $user_id);
                $stmt->execute();
                $result = $stmt->get_result();
                $count = $result->fetch_assoc();
                echo $count['total'];
            ?>
        </span>
    </div>
    <div class="stat-card">Upcoming Events:
        <span id="upcoming-events">
            <?php
                $user_id = $_SESSION['user_id'];
                $totalQuery = "SELECT COUNT(*) as total FROM reminder WHERE user_id = ?";
                $stmt = $conn->prepare($totalQuery);
                $stmt->bind_param("i", $user_id);
                $stmt->execute();
                $result = $stmt->get_result();
                $count = $result->fetch_assoc();
                echo $count['total'];
            ?>
        </span>
    </div>
    <div class="stat-card">Emails Sent: <span id="emails-sent">0</span></div>
    <div class="stat-card">Missed Alerts: <span id="missed-alerts">0</span></div>
</section>

<!-- 
🧠 Explanation Line-by-Line
✅ $_SESSION['user_id'];
This grabs the currently logged-in user's ID from the session.

You must have set this during login (like: $_SESSION['user_id'] = $user_id;).

✅ SELECT COUNT(*) as total FROM reminder WHERE user_id = ?
This SQL query counts how many reminders exist in the reminder table for this specific user.

COUNT(*) returns the number of rows.

as total lets us access the result as $count['total'].

✅ $conn->prepare($totalQuery);
Prepares the SQL query using a prepared statement, which is safer (protects against SQL injection).

✅ $stmt->bind_param("i", $user_id);
Binds the user_id to the ? placeholder in the SQL.

"i" means the value is an integer.

✅ $stmt->execute();
Runs the SQL query.

✅ $result = $stmt->get_result();
Retrieves the result of the query.

✅ $count = $result->fetch_assoc();
Fetches the result as an associative array (e.g., ['total' => 5]).

✅ echo $count['total'];
Displays the total number inside the HTML <span>. -->