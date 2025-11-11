// ELEMENTS
// ============================
const addTaskBtn = document.getElementById("add-task-btn");
const modal = document.getElementById("task-modal");
const overlay = document.getElementById("overlay");
const cancelBtn = document.getElementById("cancel-btn");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const saveTaskBtn = document.getElementById("save-task-btn");
const confirmModal = document.getElementById("confirm-modal");
const confirmMessageEl = document.getElementById("confirm-message");
const confirmYesBtn = document.getElementById("confirm-yes");
const confirmNoBtn = document.getElementById("confirm-no");

let isSubmitting = false;

// ============================
// MODAL OPEN/CLOSE
// ============================
addTaskBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

// Helper: show a custom confirm dialog. Returns a Promise<boolean>.
function showConfirm(message) {
  return new Promise((resolve) => {
    confirmMessageEl.textContent = message;
    confirmModal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    // Handlers
    const cleanup = (result) => {
      confirmModal.classList.add("hidden");
      overlay.classList.add("hidden");
      confirmYesBtn.removeEventListener("click", onYes);
      confirmNoBtn.removeEventListener("click", onNo);
      overlay.removeEventListener("click", onOverlay);
      resolve(result);
    };

    const onYes = () => cleanup(true);
    const onNo = () => cleanup(false);
    const onOverlay = () => cleanup(false);

    confirmYesBtn.addEventListener("click", onYes);
    confirmNoBtn.addEventListener("click", onNo);
    overlay.addEventListener("click", onOverlay);
  });
}

// ============================
// RENDER TASKS
// ============================
async function renderTasks() {
  const tasks = await getTasks(); // fetch from Xano
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.style.display = "block";
    return;
  } else {
    emptyMessage.style.display = "none";
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";

    // Check if task is overdue
    const now = new Date();
    const dueDate = task.due_date ? new Date(task.due_date) : null;
    const isOverdue = dueDate && dueDate < now && !task.completed;

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} class="complete-checkbox" data-id="${task.id}">
      <div class="task-details ${task.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""}">
        <h3>${task.title}</h3>
        ${task.description ? `<p>${task.description}</p>` : ""}
        ${task.due_date ? `<small>Due: ${new Date(task.due_date).toLocaleString()}</small>` : ""}
      </div>
      <button class="delete-btn" data-id="${task.id}">Delete</button>
    `;

    taskList.appendChild(li);
  });

  // Add event listeners for checkboxes and delete buttons
  document.querySelectorAll(".complete-checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", async (e) => {
      const id = e.target.dataset.id;
      const completed = e.target.checked;

      // Optimistic UI: toggle completed class immediately for instant feedback
      const li = e.target.closest('.task-item');
      const details = li ? li.querySelector('.task-details') : null;
      if (details) details.classList.toggle('completed', completed);

      // Temporarily disable checkbox to avoid rapid toggles
      e.target.disabled = true;

      try {
        await updateTask(id, { completed });
      } catch (err) {
        // Revert UI on error
        if (details) details.classList.toggle('completed', !completed);
        e.target.checked = !completed;
        console.error('Failed to update task:', err);
        alert('Failed to update task. Please try again.');
      } finally {
        e.target.disabled = false;
      }
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      const confirmed = await showConfirm("Are you sure you want to delete this task?");
      if (confirmed) {
        await deleteTask(id);
        renderTasks();
      }
    });
  });
}

// ============================
// ADD NEW TASK
// ============================
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const dueDate = document.getElementById("due-date").value;

  if (!title) return alert("Please enter a task title!");

  const newTask = {
    title,
    description,
    due_date: dueDate || null,
    completed: false
  };

  // Prevent duplicate submissions
  if (isSubmitting) return;
  isSubmitting = true;
  if (saveTaskBtn) {
    saveTaskBtn.disabled = true;
    saveTaskBtn.textContent = "Saving...";
  }

  try {
    await addTask(newTask);
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    taskForm.reset();
    await renderTasks();
  } catch (err) {
    console.error("Failed to add task:", err);
    alert("Failed to add task. Please try again.");
  } finally {
    isSubmitting = false;
    if (saveTaskBtn) {
      saveTaskBtn.disabled = false;
      saveTaskBtn.textContent = "Save Task";
    }
  }
});

// ============================
// INITIAL LOAD
// ============================
renderTasks();
