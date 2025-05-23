// MODAL FOR ADD REMINDER
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

// THE CODE FOR REMINDER REPEAT
document.addEventListener('DOMContentLoaded', () => {
    const repeatCheckbox = document.getElementById('repeat-checkbox');
    const repeatOptions = document.getElementById('repeat-options');

    repeatCheckbox.addEventListener('change', () => {
        repeatOptions.style.display = repeatCheckbox.checked ? 'block' : 'none';
    });
});