// DOM Element References
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks from LocalStorage on initialization
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render existing tasks on app startup
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <label class="task-label">
                <input type="checkbox" class="task-checkbox" onchange="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
            </label>
            <button class="delete-btn" onclick="deleteTask(${index})" aria-label="Delete task ${index + 1}">Delete</button>
        `;
        taskList.appendChild(li);
    });

    // Update task count and empty state
    const countEl = document.getElementById('task-count');
    const emptyMsg = document.getElementById('empty-msg');
    if (countEl) countEl.textContent = tasks.length;
    if (emptyMsg) emptyMsg.style.display = tasks.length ? 'none' : 'block';
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a brand new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    renderTasks();
}

// Toggle completion status
window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
};

// Delete target task from list
window.deleteTask = function(index) {
    tasks.splice(index, 1);
    renderTasks();
};

// Event Listeners for User Actions
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial Render
renderTasks();
