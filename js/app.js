
//     const taskList = document.getElementById('task-list');
//     const addTaskBtn = document.getElementById('add-task-btn');
//     const modal = document.getElementById('task-modal');
//     const closeModal = document.getElementById('close-modal');
//     const taskForm = document.getElementById('task-form');
//     const modalTitle = document.getElementById('modal-title');
//     const taskIdInput = document.getElementById('task-id');
//     const taskTitleInput = document.getElementById('task-title');
//     const taskDescInput = document.getElementById('task-desc');
//     const taskDueInput = document.getElementById('task-due');

//     let tasks = [];

//     // Open modal
//     addTaskBtn.addEventListener('click', () => {
//         modal.style.display = 'block';
//         modalTitle.textContent = 'Add Task';
//         taskForm.reset();
//         taskIdInput.value = '';
//     });

//     // Close modal
//     closeModal.addEventListener('click', () => {
//         modal.style.display = 'none';
//     });

//     // Click outside modal closes it
//     window.addEventListener('click', (e) => {
//         if (e.target === modal) modal.style.display = 'none';
//     });

//     // Load and render tasks
//     async function loadTasks() {
//         tasks = await fetchTasks();
//         renderTasks();
//     }

//     // Render tasks
//     function renderTasks() {
//         taskList.innerHTML = '';
//         const now = new Date();

//         tasks.forEach(task => {
//             const li = document.createElement('li');

//             // Task title
//             const taskTitle = document.createElement('span');
//             taskTitle.textContent = task.title;
//             taskTitle.style.fontWeight = 'bold';

//             // Task description
//             const taskDesc = document.createElement('div');
//             taskDesc.textContent = task.description || '';
//             taskDesc.style.fontSize = '0.9rem';
//             taskDesc.style.color = '#555';

//             // Task due date
//             const taskDue = document.createElement('div');
//             const dueDate = new Date(task.due_date);
//             taskDue.textContent = `Due: ${dueDate.toLocaleString()}`;
//             taskDue.style.fontSize = '0.8rem';
//             taskDue.style.color = '#888';

//             // Actions container
//             const actions = document.createElement('div');
//             actions.className = 'actions';

//             // Complete button
//             const completeBtn = document.createElement('button');
//             completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
//             completeBtn.addEventListener('click', async () => {
//                 await toggleTaskCompletion(task.id, !task.completed);
//                 loadTasks();
//             });

//             // Edit button
//             const editBtn = document.createElement('button');
//             editBtn.textContent = 'Edit';
//             editBtn.addEventListener('click', () => {
//                 modal.style.display = 'block';
//                 modalTitle.textContent = 'Edit Task';
//                 taskIdInput.value = task.id;
//                 taskTitleInput.value = task.title;
//                 taskDescInput.value = task.description;
//                 taskDueInput.value = task.due_date.slice(0,16);
//             });

//             // Delete button
//             const deleteBtn = document.createElement('button');
//             deleteBtn.textContent = 'Delete';
//             deleteBtn.addEventListener('click', async () => {
//                 if(confirm('Are you sure you want to delete this task?')) {
//                     await deleteTaskById(task.id);
//                     loadTasks();
//                 }
//             });

//             actions.appendChild(completeBtn);
//             actions.appendChild(editBtn);
//             actions.appendChild(deleteBtn);

//             // Apply completed/overdue classes
//             if(task.completed) li.classList.add('completed');
//             else if(dueDate < now) li.classList.add('overdue');

//             // Append elements to li
//             li.appendChild(taskTitle);
//             li.appendChild(taskDesc);
//             li.appendChild(taskDue);
//             li.appendChild(actions);

//             taskList.appendChild(li);
//         });
//     }

//     // Handle form submit
//     taskForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const newTask = {
//             title: taskTitleInput.value,
//             description: taskDescInput.value,
//             due_date: taskDueInput.value,
//             completed: false
//         };

//         if(taskIdInput.value) {
//             // Update existing task
//             await updateTask(taskIdInput.value, newTask);
//         } else {
//             // Add new task
//             await addTask(newTask);
//         }

//         modal.style.display = 'none';
//         loadTasks();
//     });

//     // Initial load
//     loadTasks();
// });
document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');
    const modal = document.getElementById('task-modal');
    const closeModal = document.getElementById('close-modal');
    const taskForm = document.getElementById('task-form');
    const modalTitle = document.getElementById('modal-title');
    const taskIdInput = document.getElementById('task-id');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescInput = document.getElementById('task-desc');
    const taskDueInput = document.getElementById('task-due');

    let tasks = [];

    // Open modal
    addTaskBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        modalTitle.textContent = 'Add Task';
        taskForm.reset();
        taskIdInput.value = '';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Click outside modal closes it
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Load and render tasks
    async function loadTasks() {
        tasks = await fetchTasks();
        renderTasks();
        notifyOverdueTasks(); // Check overdue tasks and alert
    }

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        const now = new Date();

        tasks.forEach(task => {
            const li = document.createElement('li');

            // Task title
            const taskTitle = document.createElement('span');
            taskTitle.textContent = task.title;
            taskTitle.style.fontWeight = 'bold';

            // Task description
            const taskDesc = document.createElement('div');
            taskDesc.textContent = task.description || '';
            taskDesc.style.fontSize = '0.9rem';
            taskDesc.style.color = '#555';

            // Task due date
            const taskDue = document.createElement('div');
            const dueDate = new Date(task.due_date);
            taskDue.textContent = `Due: ${dueDate.toLocaleString()}`;
            taskDue.style.fontSize = '0.8rem';
            taskDue.style.color = '#888';

            // Actions container
            const actions = document.createElement('div');
            actions.className = 'actions';

            // Complete button
            const completeBtn = document.createElement('button');
            completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
            completeBtn.style.backgroundColor = task.completed ? '#6c757d' : '#bfeecaff'; // grey for undo, green for complete
            completeBtn.addEventListener('click', async () => {
                await toggleTaskCompletion(task.id, !task.completed);
                loadTasks();
            });

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.style.backgroundColor = '#ffd966ff'; // yellow for edit
            editBtn.addEventListener('click', () => {
                modal.style.display = 'block';
                modalTitle.textContent = 'Edit Task';
                taskIdInput.value = task.id;
                taskTitleInput.value = task.title;
                taskDescInput.value = task.description;
                taskDueInput.value = task.due_date.slice(0,16);
            });

            // Delete button remains the same
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.backgroundColor = '#ff6b6bff'; // red for delete
            deleteBtn.addEventListener('click', async () => {
                if(confirm('Are you sure you want to delete this task?')) {
                    await deleteTaskById(task.id);
                    loadTasks();
                }
            });

            actions.appendChild(completeBtn);
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);

            // Apply completed/overdue classes
            if(task.completed) li.classList.add('completed');
            else if(dueDate < now) li.classList.add('overdue');

            // Append elements to li
            li.appendChild(taskTitle);
            li.appendChild(taskDesc);
            li.appendChild(taskDue);
            li.appendChild(actions);

            taskList.appendChild(li);
        });
    }

    // Handle form submit
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newTask = {
            title: taskTitleInput.value,
            description: taskDescInput.value,
            due_date: taskDueInput.value,
            completed: false
        };

        if(taskIdInput.value) {
            await updateTask(taskIdInput.value, newTask);
        } else {
            await addTask(newTask);
        }

        modal.style.display = 'none';
        loadTasks();
    });

    // Notify about overdue tasks
    function notifyOverdueTasks() {
        const now = new Date();
        const overdueTasks = tasks.filter(task => {
            const dueDate = new Date(task.due_date);
            return !task.completed && dueDate < now;
        });

        if(overdueTasks.length > 0) {
            const titles = overdueTasks.map(t => t.title).join(', ');
            alert(`⚠️ You have overdue tasks: ${titles}`);
        }
    }

    // Initial load
    loadTasks();
});
