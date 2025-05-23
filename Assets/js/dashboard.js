document.addEventListener('DOMContentLoaded', () => {
    // Initial sample reminders data
    const reminders = [
      { text: "Doctor's Appointment", email: "doc@example.com", date: "2025-05-25", time: "10:00" },
      { text: "Team Meeting", email: "team@example.com", date: "2025-05-26", time: "14:00" },
      { text: "Grocery Shopping", email: "shop@example.com", date: "2025-05-27", time: "17:00" }
    ];
  
    const reminderList = document.getElementById('reminder-list'); // Table body container for reminders
    let currentActionRow = null; // Tracks the currently open action row (edit/delete buttons)
    let deleteModalIndex = null; // Stores index of the reminder to be deleted when delete modal is open
  
    // Function to render the reminders into the table body
    function renderReminders() {
      reminderList.innerHTML = ''; // Clear existing rows
  
      reminders.forEach((reminder, index) => {
        const row = document.createElement('tr');
        row.classList.add('reminder-row');
        row.dataset.index = index; // Save index for reference in events
  
        // Populate row with reminder data
        row.innerHTML = `
          <td>${reminder.text}</td>
          <td>${reminder.email}</td>
          <td>${reminder.date}</td>
          <td>${reminder.time}</td>
        `;
        reminderList.appendChild(row);
      });
    }
  
    renderReminders(); // Initial render on page load
  
    // Handle clicks on the reminder list to toggle action buttons row
    reminderList.addEventListener('click', (e) => {
      const clickedRow = e.target.closest('.reminder-row');
      if (!clickedRow) return; // Ignore clicks outside reminder rows
  
      const index = clickedRow.dataset.index;
  
      // If the next row is already an action row for this reminder, close it
      if (
        clickedRow.nextElementSibling &&
        clickedRow.nextElementSibling.classList.contains('action-row')
      ) {
        clickedRow.nextElementSibling.remove();
        currentActionRow = null;
        return;
      }
  
      // Close any previously opened action row
      if (currentActionRow) {
        currentActionRow.remove();
        currentActionRow = null;
      }
  
      // Create new action row below the clicked reminder
      const actionRow = document.createElement('tr');
      actionRow.classList.add('action-row');
      actionRow.innerHTML = `
        <td colspan="4" class="action-cell">
          <div class="action-buttons" style="display:flex; gap:20px; align-items:center;">
            <button class="edit-btn" data-index="${index}">✏️ Edit</button>
            <button class="delete-btn" data-index="${index}">🗑️ Delete</button>
          </div>
        </td>
      `;
  
      // Insert action row after clicked row
      clickedRow.insertAdjacentElement('afterend', actionRow);
      currentActionRow = actionRow; // Save reference
    });
  
    // Modal elements references
    const editModal = document.getElementById('editModal');
    const editModalCloseBtn = document.getElementById('editModalCloseBtn');
    const editModalForm = document.getElementById('editModalForm');
    const editModalText = document.getElementById('editModalText');
    const editModalEmail = document.getElementById('editModalEmail');
    const editModalDate = document.getElementById('editModalDate');
    const editModalTime = document.getElementById('editModalTime');
    const editModalIndex = document.getElementById('editModalIndex');
  
    const deleteModal = document.getElementById('deleteModal');
    const deleteModalConfirmBtn = document.getElementById('deleteModalConfirmBtn');
    const deleteModalCancelBtn = document.getElementById('deleteModalCancelBtn');
  
    // Close edit modal when clicking the close (X) button
    editModalCloseBtn.addEventListener('click', () => {
      editModal.style.display = 'none';
    });
  
    // Close modals when clicking outside the modal content area
    window.addEventListener('click', (e) => {
      if (e.target === editModal) editModal.style.display = 'none';
      if (e.target === deleteModal) deleteModal.style.display = 'none';
    });
  
    // Handle clicks on edit and delete buttons inside action row using event delegation
    reminderList.addEventListener('click', (e) => {
      // Edit button clicked
      if (e.target.classList.contains('edit-btn')) {
        const index = e.target.dataset.index;
        const reminder = reminders[index];
  
        // Pre-fill edit modal form fields with selected reminder data
        editModalText.value = reminder.text;
        editModalEmail.value = reminder.email;
        editModalDate.value = reminder.date;
        editModalTime.value = reminder.time;
        editModalIndex.value = index; // Store index for updating later
  
        editModal.style.display = 'flex'; // Show the edit modal
      }
  
      // Delete button clicked
      if (e.target.classList.contains('delete-btn')) {
        deleteModalIndex = e.target.dataset.index; // Save index of reminder to delete
        deleteModal.style.display = 'flex'; // Show delete confirmation modal
      }
    });
  
    // Handle saving changes from edit modal form submission
    editModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const index = editModalIndex.value;
  
      // Update the reminder with edited values
      reminders[index] = {
        text: editModalText.value,
        email: editModalEmail.value,
        date: editModalDate.value,
        time: editModalTime.value
      };
  
      renderReminders(); // Re-render reminders to reflect edits
      editModal.style.display = 'none'; // Hide edit modal
  
      // Remove action row if open (clean up UI)
      if (currentActionRow) {
        currentActionRow.remove();
        currentActionRow = null;
      }
    });
  
    // Confirm deletion of reminder in delete modal
    deleteModalConfirmBtn.addEventListener('click', () => {
      if (deleteModalIndex !== null) {
        // Remove reminder from array
        reminders.splice(deleteModalIndex, 1);
  
        renderReminders(); // Refresh reminder list
        deleteModal.style.display = 'none'; // Hide delete modal
        deleteModalIndex = null; // Reset index
  
        // Remove action row if open
        if (currentActionRow) {
          currentActionRow.remove();
          currentActionRow = null;
        }
      }
    });
  
    // Cancel deletion and hide delete modal
    deleteModalCancelBtn.addEventListener('click', () => {
      deleteModal.style.display = 'none';
      deleteModalIndex = null;
    });
  });
  


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
