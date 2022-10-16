import React, {useState, useRef, useEffect} from 'react';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
import { isCompositeComponent } from 'react-dom/test-utils';


const LOCAL_STORAGE_KEY = 'todoApp.todos';


function App() {
	// Use state returns an array
	/* Object destructing */
	const [todos, setTodos] = useState([]);
	const todoNameRef = useRef();

	useEffect(() => {
		console.log("Loading data")
		const t_data = localStorage.getItem(LOCAL_STORAGE_KEY);
		const storedTodos = JSON.parse(t_data);
		console.log("Data: " + t_data)
		//! JSON returns an empty array, check length instead of tutorials method
		if (Array.isArray(storedTodos) && storedTodos.length > 0) { 
			setTodos(storedTodos);
			console.log("Loading done!")
		}else{
			console.warn("Loading failed!")
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	function toggleTodo(id){
		//When modifying a state variable, always make a copy, modify the copy, then override.
		const newTodos = [...todos];
		const todo = newTodos.find(todo => todo.id === id); //This is short hand for the code below
		/* const todo = newTodos.find((todo) => {
			if(todo.id === id)
			return todo.id;
		}); */
		todo.complete = !todo.complete;
		setTodos(newTodos)
	}

	function handleAddTodo(e) {
		let name = todoNameRef.current.value;
		name = name.trim();
		if (name === '')
			return;

		setTodos(prevTodos => {
			return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
		});
		todoNameRef.current.value = null;
	}

	function handleClearTodos(e){
		const newTodos = todos.filter(todo => !todo.complete);
		setTodos(newTodos);
	}

	return (
	<> {/* Fragments allow for a jsx return values to have multiple elements */}
	{/* This is a component */}
	<TodoList todoList={todos} toggleTodo={toggleTodo}/> {/* Passing data/functions like this to a component is called a prop, it allows the component to access the data/function as an input */}
	<input ref={todoNameRef} type="text"/>
	<button onClick={handleAddTodo}>Add Todo</button>
	<button onClick={handleClearTodos}>Clear Completed Todos</button>
	<div>{todos.filter(todo => !todo.complete).length} left to do</div>
	</>
	);
}

export default App;
