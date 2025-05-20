document.addEventListener('DOMContentLoaded', () => {
    // Simulated dynamic updates
    document.getElementById('total-reminders').innerText = 5;
    document.getElementById('upcoming-events').innerText = 3;
    document.getElementById('emails-sent').innerText = 10;
    document.getElementById('missed-alerts').innerText = 1;

    // Simulated recent reminders
    const reminders = [
        "Doctor's Appointment - 10 AM",
        "Meeting with Team - 2 PM",
        "Grocery Shopping - 5 PM"
    ];
    const reminderList = document.getElementById('reminder-list');
    reminders.forEach(reminder => {
        const li = document.createElement('li');
        li.innerText = reminder;
        reminderList.appendChild(li);
    });
});

function openModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function addReminder() {
    const reminderInput = document.getElementById('reminder-input');
    const reminderList = document.getElementById('reminder-list');
    const li = document.createElement('li');
    li.innerText = reminderInput.value;
    reminderList.appendChild(li);
    reminderInput.value = '';
    closeModal();
}
