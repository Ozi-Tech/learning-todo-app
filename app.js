const input = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

// save todos function
function saveTodos() {
    const todos = [];
    //get all todos
    const todoItems = todoList.querySelectorAll('li');

    todoItems.forEach(li => {
    const text = li.querySelector('span').textContent;
    const completed = li.classList.contains('completed');
    todos.push({text: text, completed: completed});
    });

    //save to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// load todos function
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
        try {
            const todos = JSON.parse(savedTodos);
            todos.forEach(todo => {
                // create new list item
                createTodoElement(todo.text, todo.completed);
            });
        } catch (error) {
            console.log('Invalid todos data in local storage! Starting again pls, don\'t stress me out.');
            localStorage.removeItem('todos');
        }
    }
}

//function to create todo elements
function createTodoElement(text, isCompleted = false) {
    // create new list item
    const li = document.createElement('li');

    // create a new span item
    const span = document.createElement('span');
    span.textContent = text;

    // create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    // add both span and button to the list item
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // check completion status
    if (isCompleted) {
        li.classList.add('completed');
    }

    // add list item to todo list
    todoList.prepend(li);
}

// Function to add a todo item
function addTodo() {
    const todoText = input.value.trim();

    // dont take empty input
    if (todoText === '') {
        alert('It\'s blank ma! Add a todo');
        return;
    }

    //create todo
    createTodoElement(todoText);

    //save to local storage
    saveTodos();

    // Clear the input
    input.value = '';
}

// Function to handle delete
function handleClick(event) {
    // check if the event involves clicking a delete button
    if (event.target.classList.contains('delete-btn')) {
        // get the parent li element
        const todoItem = event.target.parentElement;
        //remove the todo item
        todoList.removeChild(todoItem);
    } else if (event.target.tagName==='SPAN') {
        // toggle completed class on span
        event.target.parentElement.classList.toggle('completed');
    }
    saveTodos()     
}

// Add todo when button is clicked
addButton.addEventListener('click', addTodo);

// Add todo when Enter key is pressed
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Add event listener for delete buttons
todoList.addEventListener('click', handleClick);

// load todos when page loads
document.addEventListener('DOMContentLoaded', loadTodos);