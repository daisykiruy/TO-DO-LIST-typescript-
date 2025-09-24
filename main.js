// main.ts
// DOM elements
var taskInput = document.querySelector('.task-input');
var addBtn = document.querySelector('.addTask-btn');
var card = document.querySelector('.card');
// Container to hold tasks
var tasks = [];
var taskIdCounter = 0;
// Create the task list container
var taskList = document.createElement('ul');
taskList.className = 'task-list';
taskList.style.listStyle = 'none';
taskList.style.padding = '0';
taskList.style.marginTop = '70px';
taskList.style.overflowY = 'auto'; // vertical scroll
taskList.style.maxHeight = '300px'; // height of list area inside card
card.appendChild(taskList);
// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear existing tasks
    tasks.forEach(function (task) {
        var li = document.createElement('li');
        li.className = 'task-item';
        li.style.display = 'flex';
        li.style.alignItems = '';
        li.style.justifyContent = 'space-between';
        li.style.marginBottom = '10px';
        li.style.padding = '8px';
        li.style.paddingLeft = '10px';
        li.style.border = '1px solid var(--color-secondary)';
        li.style.borderRadius = '6px';
        li.style.backgroundColor = task.completed ? '#d3ffd3' : '#fff';
        // Task text
        var span = document.createElement('span');
        span.textContent = task.text;
        span.style.cursor = 'pointer';
        if (task.completed)
            span.style.textDecoration = 'line-through';
        li.appendChild(span);
        // Buttons container
        var btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.gap = '5px';
        // Edit button
        var editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.style.background = 'var(--color-accent)';
        editBtn.style.border = 'none';
        editBtn.style.padding = '5px 10px';
        editBtn.style.marginLeft = '50px';
        editBtn.style.borderRadius = '5px';
        editBtn.style.cursor = 'pointer';
        editBtn.onclick = function () { return editTask(task.id); };
        btnContainer.appendChild(editBtn);
        // Delete button
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.background = '#ff6b6b';
        deleteBtn.style.border = 'none';
        deleteBtn.style.padding = '5px 10px';
        deleteBtn.style.borderRadius = '5px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.onclick = function () { return deleteTask(task.id); };
        btnContainer.appendChild(deleteBtn);
        // Toggle complete on click of task text
        span.onclick = function () { return toggleComplete(task.id); };
        li.appendChild(btnContainer);
        taskList.appendChild(li);
    });
}
// Add Task
addBtn.addEventListener('click', function () {
    var text = taskInput.value.trim();
    if (!text)
        return alert('Please enter a task!');
    tasks.push({ id: taskIdCounter++, text: text, completed: false });
    taskInput.value = '';
    renderTasks();
});
// Similarly for editTask
function editTask(id) {
    var task = tasks.find(function (t) { return t.id === id; });
    if (task === undefined)
        return;
    var newText = prompt('Edit Task:', task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        renderTasks();
    }
}
// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    renderTasks();
}
// Toggle Complete
function toggleComplete(id) {
    // Use explicit type and check for undefined
    var task = tasks.find(function (t) { return t.id === id; });
    if (task === undefined)
        return; // exit if not found
    task.completed = !task.completed;
    renderTasks();
}
// Initial render
renderTasks();
