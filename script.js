// Todo App functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    
    // Array to store todos
    let todos = [];
    
    // Add todo function
    function addTodo() {
        const todoText = todoInput.value.trim();
        
        if (todoText !== '') {
            // Create new todo object
            const todo = {
                id: Date.now(),
                text: todoText,
                completed: false
            };
            
            // Add to array
            todos.push(todo);
            
            // Clear input
            todoInput.value = '';
            
            // Render todos
            renderTodos();
        }
    }
    
    // Delete todo function
    function deleteTodo(id) {
        // Filter out the todo with the given id
        todos = todos.filter(todo => todo.id !== id);
        
        // Render todos
        renderTodos();
    }
    
    // Toggle todo completion status
    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return {...todo, completed: !todo.completed};
            }
            return todo;
        });
        
        // Render todos
        renderTodos();
    }
    
    // Render todos function
    function renderTodos() {
        // Clear the list
        todoList.innerHTML = '';
        
        // Add each todo to the list
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-success' : ''}`;
            
            // Add click event to toggle completion
            li.addEventListener('click', () => toggleTodo(todo.id));
            
            // Todo text with strike-through if completed
            const todoText = document.createElement('span');
            todoText.textContent = todo.text;
            if (todo.completed) {
                todoText.style.textDecoration = 'line-through';
                todoText.style.color = '#6c757d';
            }
            
            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the li click event
                deleteTodo(todo.id);
            });
            
            // Append elements
            li.appendChild(todoText);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }
    
    // Event listeners
    addTodoBtn.addEventListener('click', addTodo);
    
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // Initial render
    renderTodos();
});
