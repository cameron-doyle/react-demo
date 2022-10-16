import React from 'react'

export default function Todo({ todo, toggleTodo }) {

	function handleTodoClick(){
		toggleTodo(todo.id);
	};
  return (
	<div>
		<label>
			{/* If a prop requires an input, you must have a handler function */}
			<input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
			{todo.name}
		</label>
	</div>
  )
}
