import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form/Form';
import TodoList from './components/TodoList/TodoList';


function App() {

    const [inputText, setInputText] = useState('');
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState('all'); // filter Todos
    const [filteredTodos, setFilteredTodos] = useState([]);

    // first fetch todos from Local Storage once the app runs
    useEffect(() => {
        getLocalTodos();
    },[]);

    useEffect(() => {
        // filter todos by all, completed..
        handleFilteredTodos();
        saveLocalTodos();
    }, [todos, status]);



    const handleFilteredTodos = () => {
        switch (status) {

            case 'completed':
                setFilteredTodos(todos.filter(todo => todo.completed === true));
                break;

            case 'uncompleted':
                setFilteredTodos(todos.filter(todo => todo.completed === false));
                break;

            default:
                setFilteredTodos(todos);
                break;
        }
    };

    // save to local storage
    const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // check if there is anything in LS
    const getLocalTodos = () => {
        if (localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify([]));
        } else {
            let todos = JSON.parse(localStorage.getItem('todos'));
            setTodos(todos);
        }
    };


    return (
        <div className="App">
            <header>
                <h1>Todo List</h1>
            </header>

            <Form inputText={inputText}
                  todos={todos}
                  setTodos={setTodos}
                  setInputText={setInputText}
                  setStatus={setStatus}

            />

            <TodoList setTodos={setTodos}
                      todos={todos}
                      filteredTodos={filteredTodos}
            />
        </div>
    );
}

export default App;
