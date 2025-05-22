document.addEventListener('DOMContentLoaded', () => {
    const reminders = [{
            text: "Doctor's Appointment",
            email: "doc@example.com",
            date: "2025-05-25",
            time: "10:00"
        },
        {
            text: "Team Meeting",
            email: "team@example.com",
            date: "2025-05-26",
            time: "14:00"
        },
        {
            text: "Grocery Shopping",
            email: "shop@example.com",
            date: "2025-05-27",
            time: "17:00"
        }
    ];

    const reminderList = document.getElementById('reminder-list');
    reminders.forEach(reminder => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${reminder.text}</td><td>${reminder.email}</td><td>${reminder.date}</td><td>${reminder.time}</td>`;
        reminderList.appendChild(row);
    });

    document.getElementById('total-reminders').innerText = reminders.length;
    document.getElementById('upcoming-events').innerText = reminders.length;
    document.getElementById('emails-sent').innerText = 10;
    document.getElementById('missed-alerts').innerText = 1;
});

function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const menuIcon = document.getElementById('menu-icon');

    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        mainContent.classList.remove('shifted');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    } else {
        sidebar.classList.add('active');
        mainContent.classList.add('shifted');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    }
}

function openModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function addReminder() {
    const text = document.getElementById('reminder-input').value;
    const email = document.getElementById('email-input').value;
    const date = document.getElementById('date-input').value;
    const time = document.getElementById('time-input').value;

    const reminderList = document.getElementById('reminder-list');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${text}</td><td>${email}</td><td>${date}</td><td>${time}</td>`;
    reminderList.appendChild(row);

    document.getElementById('reminder-input').value = '';
    document.getElementById('email-input').value = '';
    document.getElementById('date-input').value = '';
    document.getElementById('time-input').value = '';

    closeModal();
}