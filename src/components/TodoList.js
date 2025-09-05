// Todo List Component
export function TodoList() {
    return {
        // State
        todos: [],
        newTodo: '',
        searchQuery: '',
        
        // Methods
        addTodo() {
            if (this.newTodo.trim()) {
                this.todos.push({
                    id: Date.now(),
                    text: this.newTodo,
                    completed: false,
                    createdAt: new Date().toISOString()
                });
                this.newTodo = '';
            }
        },
        
        removeTodo(id) {
            this.todos = this.todos.filter(todo => todo.id !== id);
        },
        
        toggleTodo(id) {
            const todo = this.todos.find(todo => todo.id === id);
            if (todo) todo.completed = !todo.completed;
        },
        
        clearCompleted() {
            this.todos = this.todos.filter(todo => !todo.completed);
        },
        
        clearAll() {
            this.todos = [];
        },
        
        // Computed properties (getters)
        get completedTodos() {
            return this.todos.filter(todo => todo.completed);
        },
        
        get pendingTodos() {
            return this.todos.filter(todo => !todo.completed);
        },
        
        get hasTodos() {
            return this.todos.length > 0;
        },
        
        get hasCompletedTodos() {
            return this.completedTodos.length > 0;
        },
        
        get filteredTodos() {
            if (!this.searchQuery.trim()) {
                return this.todos;
            }
            
            const query = this.searchQuery.toLowerCase().trim();
            return this.todos.filter(todo => 
                todo.text.toLowerCase().includes(query)
            );
        },
        
        get hasSearchResults() {
            return this.filteredTodos.length > 0;
        },
        
        get searchResultCount() {
            return this.filteredTodos.length;
        },
        
        // Lifecycle methods
        init() {
            console.log('TodoList component initialized');
            
            // Load todos from localStorage
            const savedTodos = localStorage.getItem('todoList');
            if (savedTodos) {
                try {
                    this.todos = JSON.parse(savedTodos);
                } catch (e) {
                    console.error('Error loading todos:', e);
                    // If there's an error, start with default todos
                    this.todos = [
                        { id: 1, text: 'Learn Alpine.js', completed: false, createdAt: new Date().toISOString() },
                        { id: 2, text: 'Build dynamic components', completed: false, createdAt: new Date().toISOString() }
                    ];
                }
            } else {
                // If no saved todos, start with default ones
                this.todos = [
                    { id: 1, text: 'Learn Alpine.js', completed: false, createdAt: new Date().toISOString() },
                    { id: 2, text: 'Build dynamic components', completed: false, createdAt: new Date().toISOString() }
                ];
            }
            
            // Watch for changes to todos and save to localStorage
            this.$watch('todos', (newTodos) => {
                localStorage.setItem('todoList', JSON.stringify(newTodos));
            }, { deep: true });
        }
    }
}

