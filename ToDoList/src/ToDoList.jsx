import React, { useState, useEffect } from 'react';
import styles from './TodoList.module.css';

function TodoList() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [input, setInput] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('medium');
    const [category, setCategory] = useState('personal');
    const [filter, setFilter] = useState('all');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (e) => {
        e.preventDefault();
        if (input.trim() !== '') {
            setTodos([...todos, {
                text: input,
                completed: false,
                dueDate,
                priority,
                category,
                id: Date.now()
            }]);
            setInput('');
            setDueDate('');
            setPriority('medium');
            setCategory('personal');
        }
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high': return styles.highPriority;
            case 'low': return styles.lowPriority;
            default: return styles.mediumPriority;
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return todo.category === filter;
    });

    return (
        <div className={`${styles.todoListContainer} ${darkMode ? styles.darkMode : ''}`}>
            <div className={styles.todoList}>
                <div className={styles.header}>
                    <h1>To Do List</h1>
                    <button onClick={() => setDarkMode(!darkMode)} className={styles.modeToggle}>
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
                <form onSubmit={addTodo} className={styles.todoForm}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter a new todo"
                        className={styles.todoInput}
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className={styles.dateInput}
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className={styles.prioritySelect}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={styles.categorySelect}
                    >
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="shopping">Shopping</option>
                        <option value="other">Other</option>
                    </select>
                    <button type="submit" className={styles.addButton}>Add</button>
                </form>
                <div className={styles.filters}>
                    <button onClick={() => setFilter('all')} className={filter === 'all' ? styles.activeFilter : ''}>All</button>
                    <button onClick={() => setFilter('active')} className={filter === 'active' ? styles.activeFilter : ''}>Active</button>
                    <button onClick={() => setFilter('completed')} className={filter === 'completed' ? styles.activeFilter : ''}>Completed</button>
                    <button onClick={() => setFilter('personal')} className={filter === 'personal' ? styles.activeFilter : ''}>Personal</button>
                    <button onClick={() => setFilter('work')} className={filter === 'work' ? styles.activeFilter : ''}>Work</button>
                    <button onClick={() => setFilter('shopping')} className={filter === 'shopping' ? styles.activeFilter : ''}>Shopping</button>
                    <button onClick={() => setFilter('other')} className={filter === 'other' ? styles.activeFilter : ''}>Other</button>
                </div>
                <ul className={styles.todoItems}>
                    {filteredTodos.map((todo) => (
                        <li key={todo.id} className={`${styles.todoItem} ${getPriorityClass(todo.priority)}`}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleComplete(todo.id)}
                                className={styles.checkbox}
                            />
                            <span className={todo.completed ? styles.completed : ''}>
                                {todo.text}
                            </span>
                            <span className={styles.category}>{todo.category}</span>
                            <span className={styles.dueDate}>
                                {todo.dueDate && `Due: ${new Date(todo.dueDate).toLocaleDateString()}`}
                            </span>
                            <button onClick={() => removeTodo(todo.id)} className={styles.removeButton}>×</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;