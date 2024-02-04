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
				{todos.map((todo) => {
					return (
						<li key={todo.id}>
							<label>
								<input type="checkbox" checked={todo.completed} />
								{todo.title}
							</label>
							<button className="btn btn-danger">Delete</button>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default App;
