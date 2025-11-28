const API_BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:5mJKaeI4/todo";

// GET all tasks
async function fetchTasks() {
    const res = await fetch(API_BASE_URL);
    return await res.json();
}

// GET single task
async function fetchTask(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    return await res.json();
}

// POST new task
async function addTask(task) {
    const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });
    return await res.json();
}

// PUT update task
async function updateTask(id, task) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });
    return await res.json();
}

// DELETE task
async function deleteTaskById(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE"
    });
    return await res.json();
}

// PATCH toggle completed
async function toggleTaskCompletion(id, completed) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed })
    });
    return await res.json();
}
