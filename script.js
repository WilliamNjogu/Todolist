const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const newTaskInput = document.getElementById('newTask');
const selectOption = document.getElementById('selectOption');
const errorMessage = document.getElementById('errorMessage');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
             <input type="checkbox" class="checkbox">
             <span class="task">${taskText}</span>
             <button class="edit"><i class="fas fa-edit"></i></button>
             <button class="delete"><i class="fas fa-trash"></i></button>
        `;
        taskList.appendChild(li);
        newTaskInput.value = '';
        li.querySelector('.edit').addEventListener('click', editTask);
        li.querySelector('.delete').addEventListener('click', deleteTask);

        li.querySelector('.checkbox').addEventListener('change', (event) => {
            const span = event.target.closest('li').querySelector('.task');
            span.style.textDecoration = event.target.checked ? 'line-through' : 'none';
        });
        errorMessage.textContent = '';
    } else {
        errorMessage.textContent = 'Please enter a task before adding.';
    }
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
