import React, { useState } from "react";
import "./styles.css";

const App = () => {
	const [newItem, setNewItem] = useState(""); //Abbiamo una string vuota
	const [todos, setTodos] = useState([]);

	function handleSubmit(e) {
		e.preventDefault();

		setTodos((currentTodos) => {
			return [
				...currentTodos,
				{ id: crypto.randomUUID(), title: newItem, completed: false },
			];
		});

		setNewItem("");
	}

	function toggleTodo(id, completed) {
		setTodos((currentTodos) => {
			return currentTodos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, completed };
				}

				return todo;
			});
		});
	}

	function deleteTodo(id) {
		setTodos((currentTodos) => {
			return currentTodos.filter((todo) => todo.id !== id);
		});
	}

	return (
		<>
			{/*Ho usato un fragment per eludere react dal ritornare più componenti e non ho messo il div all'interno per evitare di avere un div inutile */}
			<form onSubmit={handleSubmit} className="new-item-form">
				<div className="form-row">
					<label htmlFor="item">New Item</label>
					<input
						value={newItem}
						onChange={(e) => setNewItem(e.target.value)} // Questo chiama la funzione setNewItem con il nuovo valore ottenuto dall'elemento di input. In React, setNewItem è una funzione che viene utilizzata per aggiornare lo stato newItem.
						type="text"
						id="item"
					/>
				</div>
				<button className="btn">Add</button>
			</form>
			<h1 className="header">Todo List</h1>
			<ul className="list">
				{todos.length === 0 && "No Todos"}
				{todos.map((todo) => {
					return (
						<li key={todo.id}>
							<label>
								<input
									type="checkbox"
									checked={todo.completed}
									onClick={(e) => toggleTodo(todo.id, e.target.checked)}
								/>
								{todo.title}
							</label>
							<button
								onClick={() => deleteTodo(todo.id)}
								className="btn btn-danger"
							>
								Delete
							</button>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default App;
