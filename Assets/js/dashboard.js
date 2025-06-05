// SIDE MENU BUTTON 
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



document.addEventListener('DOMContentLoaded', () => {
  const reminderList = document.getElementById('reminder-list');
  let currentActionRow = null;

  // Handle clicks on the reminder list to toggle action buttons row
  reminderList.addEventListener('click', (e) => {
    const clickedRow = e.target.closest('.reminder-row');
    if (!clickedRow) return;

    const reminderId = clickedRow.dataset.id;
    const text = clickedRow.dataset.text;
    const email = clickedRow.dataset.email;
    const date = clickedRow.dataset.date;
    const time = clickedRow.dataset.time;

    // Toggle existing action row
    if (
      clickedRow.nextElementSibling &&
      clickedRow.nextElementSibling.classList.contains('action-row')
    ) {
      clickedRow.nextElementSibling.remove();
      currentActionRow = null;
      return;
    }

    if (currentActionRow) {
      currentActionRow.remove();
      currentActionRow = null;
    }

    // Create new action row below the clicked reminder
    const actionRow = document.createElement('tr');
    actionRow.classList.add('action-row');
    actionRow.innerHTML = `
      <td colspan="5" class="action-cell">
        <div class="action-buttons" style="display:flex; gap:20px; align-items:center;">
          <button class="edit-btn"
            data-id="${reminderId}"
            data-text="${text}"
            data-email="${email}"
            data-date="${date}"
            data-time="${time}"
          >✏️ Edit</button>
          <button class="delete-btn" data-id="${reminderId}">🗑️ Delete</button>
        </div>
      </td>
    `;

    clickedRow.insertAdjacentElement('afterend', actionRow);
    currentActionRow = actionRow;
  });

  // Modal references
  const editModal = document.getElementById('editModal');
  const editModalCloseBtn = document.getElementById('editModalCloseBtn');
  const editModalForm = document.getElementById('editModalForm');
  const editModalText = document.getElementById('editModalText');
  const editModalEmail = document.getElementById('editModalEmail');
  const editModalDate = document.getElementById('editModalDate');
  const editModalTime = document.getElementById('editModalTime');
  const editModalId = document.getElementById('editModalId');

  const deleteModal = document.getElementById('deleteModal');
  const deleteModalConfirmBtn = document.getElementById('deleteModalConfirmBtn');
  const deleteModalCancelBtn = document.getElementById('deleteModalCancelBtn');
  let deleteReminderId = null;

  // Open Edit Modal
  reminderList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
      const btn = e.target;
      editModalText.value = btn.dataset.text;
      editModalEmail.value = btn.dataset.email;
      editModalDate.value = btn.dataset.date;
      editModalTime.value = btn.dataset.time;
      editModalId.value = btn.dataset.id;

      editModal.style.display = 'flex';
    }

    if (e.target.classList.contains('delete-btn')) {
      deleteReminderId = e.target.dataset.id;
      deleteModal.style.display = 'flex';
    }
  });

  // Close edit modal
  editModalCloseBtn.addEventListener('click', () => {
    editModal.style.display = 'none';
  });

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === editModal) editModal.style.display = 'none';
    if (e.target === deleteModal) deleteModal.style.display = 'none';
  });

  // Delete confirmation
  deleteModalConfirmBtn.addEventListener('click', () => {
    if (deleteReminderId) {
      window.location.href = `delete-reminder.php?id=${deleteReminderId}`;
    }
  });

  deleteModalCancelBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';
    deleteReminderId = null;
  });
});



// THIS IS FOR THE DELETE ALL REMINDERS
document.getElementById("deleteAllMenuItem").addEventListener("click", function () {
  document.getElementById("deleteAllReminderModal").style.display = "flex";
});

document.getElementById("cancelDeleteAllBtn").addEventListener("click", function () {
  document.getElementById("deleteAllReminderModal").style.display = "none";
});

document.getElementById("confirmDeleteAllBtn").addEventListener("click", function () {
  // Send request to delete all reminders
  window.location.href = "./php/delete_all.php";
});