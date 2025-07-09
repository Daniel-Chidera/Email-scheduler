 <!-- Edit Reminder Modal -->
 <div id="editModal" class="edit-modal">
     <div class="edit-modal-content">
         <span class="edit-modal-close" id="editModalCloseBtn">&times;</span>
         <h2>Edit Reminder</h2>
         <form id="editModalForm">
             <label for="editModalText">Reminder:</label>
             <input type="text" id="editModalText" name="editModalText" required />

             <label for="editModalEmail">Email:</label>
             <input type="email" id="editModalEmail" name="editModalEmail" required />

             <label for="editModalDate">Date:</label>
             <input type="date" id="editModalDate" name="editModalDate" required />

             <label for="editModalTime">Time:</label>
             <input type="time" id="editModalTime" name="editModalTime" required />

             <input type="hidden" id="editModalIndex" name="editModalIndex" />

             <button type="submit">Save Changes</button>
         </form>
     </div>
 </div>