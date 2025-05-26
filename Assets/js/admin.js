function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

document.getElementById('edit-user-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // Placeholder for future PHP call to save changes
    closeModal();
});

// Example function to populate user table
function populateUser Table() {
    const userTableBody = document.getElementById('user-table-body');
    const users = [{
            username: 'john_doe',
            email: 'john@example.com',
            createdDate: '2023-01-01',
            status: 'Active'
        },
        {
            username: 'jane_doe',
            email: 'jane@example.com',
            createdDate: '2023-01-02',
            status: 'Inactive'
        },
    ];

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.createdDate}</td>
            <td>${user.status}</td>
            <td>
                <button onclick="openModal('${user.username}', '${user.email}')">Edit</button>
                <button>Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

function openModal(username, email) {
    document.getElementById('username').value = username;
    document.getElementById('email').value = email;
    document.getElementById('modal').style.display = 'block';
}

// Populate user table on load
window.onload = function () {
    populateUser Table();
};