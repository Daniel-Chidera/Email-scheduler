// TOGGLE MEU FOR THE INDEX.HTML
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  const toggleIcon = document.getElementById('menu-toggle');

  navLinks.classList.toggle('show');

  // Toggle icon
  if (navLinks.classList.contains('show')) {
    toggleIcon.innerHTML = '&times;'; // × Close
  } else {
    toggleIcon.innerHTML = '&#9776;'; // ☰ Hamburger
  }
}


// sign up MODAL
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Optional: Close when clicking outside the modal-content
window.onclick = function(event) {
  const modal = document.getElementById("signup-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Open Login Modal
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

// Close Login Modal
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Optional: Close when clicking outside modal-content
window.onclick = function(event) {
  const loginModal = document.getElementById('login-modal');
  if (event.target === loginModal) {
    loginModal.style.display = "none";
  }
}