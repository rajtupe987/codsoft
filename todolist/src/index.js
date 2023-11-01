// Get elements
const todoInput = document.getElementById('todo-input');
const dueDateInput = document.getElementById('due-date');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// Load existing to-do items from local storage
const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
updateTodoList();

// Event listener for adding a new to-do
addButton.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    const dueDate = dueDateInput.value;
    if (todoText && dueDate) {
        storedTodos.push({
            text: todoText,
            dueDate: dueDate,
            createdAt: new Date().toLocaleString(),
            completed: false,
        });
        updateLocalStorage();
        updateTodoList();
        todoInput.value = '';
        dueDateInput.value = '';
    }
});

// Event listener for deleting or marking as completed
todoList.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('delete-button')) {
        const index = target.getAttribute('data-index');
        storedTodos.splice(index, 1);
        updateLocalStorage();
    } else if (target.classList.contains('complete-button')) {
        const index = target.getAttribute('data-index');
        storedTodos[index].completed = true;
        updateLocalStorage();
    }
    updateTodoList();
});

// Function to update local storage with current to-do items
function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(storedTodos));
}

// Function to update the displayed to-do list
function updateTodoList() {
    todoList.innerHTML = '';
    storedTodos.forEach((todo, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${todo.text}</span>
            <span class="due-date">Due: ${todo.dueDate}</span>
            <span class="created-at">Created: ${todo.createdAt}</span>
            <button class="delete-button" data-index="${index}">Delete</button>
            <button class="complete-button" data-index="${index}" ${
                todo.completed ? 'disabled' : ''
            }>Complete</button>
        `;
        listItem.classList.toggle('completed', todo.completed);
        todoList.appendChild(listItem);
    });
}
