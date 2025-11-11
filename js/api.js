// API CONFIGURATION
// ============================
const API_BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:5mJKaeI4/todo";

// ============================
// FETCH ALL TASKS
// ============================
async function getTasks() {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return data; // returns an array of tasks
  } catch (error) {
    console.error("❌ Failed to fetch tasks:", error);
    return [];
  }
}

// ============================
// ADD A NEW TASK
// ============================
async function addTask(task) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return data; // returns the created task with id
  } catch (error) {
    console.error("❌ Failed to add task:", error);
  }
}

// ============================
// UPDATE TASK
// ============================
async function updateTask(id, updates) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Failed to update task:", error);
  }
}

// ============================
// DELETE TASK
// ============================
async function deleteTask(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
    return response.ok;
  } catch (error) {
    console.error("❌ Failed to delete task:", error);
  }
}