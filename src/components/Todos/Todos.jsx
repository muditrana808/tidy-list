import { useState } from "react";

function Todos({ todos, addTodo, toggleTodo, deleteTodo }) {
  const [text, setText] = useState("");

  function handleAdd() {
    if (!text) return;
    addTodo(text);
    setText("");
  }

  return (
    <div>
      <h2>To-Dos</h2>

      <input
        placeholder="New task..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id, todo.completed)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
