import React from 'react'
import Todo from './Todo'

//Use the props as an ovbject param (names must match)
export default function TodoList({ todoList, toggleTodo }) {
  return (
	/* Map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map */
	todoList.map(todo => {
		/* Key is unique and used to tell react how to handle changes to the list*/
		return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo}/>
	})
  )
}
