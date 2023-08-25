const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const newTaskInput = document.getElementById('newTask');
const selectOption = document.getElementById('selectOption');
const errorMessage = document.getElementById('errorMessage');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    // Fetch data from the JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            // Clear existing tasks
            taskList.innerHTML = '';

            // Loop through the fetched data and create tasks
            data.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task">${task.title}</span>
                    <button class="edit"><i class="fas fa-edit"></i></button>
                    <button class="delete"><i class="fas fa-trash"></i></button>
                `;
                taskList.appendChild(li);
                li.querySelector('.edit').addEventListener('click', editTask);
                li.querySelector('.delete').addEventListener('click', deleteTask);

                li.querySelector('.checkbox').addEventListener('change', (event) => {
                    const span = event.target.closest('li').querySelector('.task');
                    span.style.textDecoration = event.target.checked ? 'line-through' : 'none';
                });
                errorMessage.textContent = '';
            });
        })
        .catch(error => {
            errorMessage.textContent = 'Failed to fetch tasks.';
        });
}

function editTask(event) {
    const li = event.target.closest('li');
    const span = li.querySelector('.task');
    const newText = prompt('Edit task:', span.textContent);
    if (newText !== null) {
        span.textContent = newText;
    }
}

function deleteTask(event) {
    const li = event.target.closest('li');
    taskList.removeChild(li);
}

selectOption.addEventListener('change', filterTasks);

function filterTasks() {
    const selectedValue = selectOption.value;
    const tasks = taskList.querySelectorAll('li');

    tasks.forEach((task) => {
        const isCompleted = task.querySelector('.checkbox').checked;

        if (selectedValue === 'all') {
            task.style.display = 'grid';
        } else if (selectedValue === 'completed' && isCompleted) {
            task.style.display = 'grid';
        } else if (selectedValue === 'uncompleted' && !isCompleted) {
            task.style.display = 'grid';
        } else {
            task.style.display = 'none';
        }
    });
}
