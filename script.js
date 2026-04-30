// Get DOM elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const totalTodos = document.getElementById('totalTodos');
const completedTodos = document.getElementById('completedTodos');
const clearBtn = document.getElementById('clearBtn');

// Load todos from localStorage on page load
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos on page load
renderTodos();

// Event listeners
addBtn.addEventListener('click', addTodo);
clearBtn.addEventListener('click', clearCompleted);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    todos.push(todo);
    saveTodos();
    renderTodos();
    
    todoInput.value = '';
    todoInput.focus();
}

function deleteTodo(id) {
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    if (todoItem) {
        todoItem.style.animation = 'fadeOut 0.4s ease-out forwards';
        setTimeout(() => {
            todos = todos.filter(todo => todo.id !== id);
            saveTodos();
            renderTodos();
        }, 400);
    }
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', todo.id);
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(todo.id));
        
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        todoList.appendChild(li);
    });
    
    updateStats();
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    
    totalTodos.textContent = `Total: ${total}`;
    completedTodos.textContent = `Completed: ${completed}`;
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function clearCompleted() {
    const completedCount = todos.filter(todo => todo.completed).length;
    
    if (completedCount === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}
