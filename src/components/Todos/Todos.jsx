import { useState } from "react";

function Todos({ todos, setTodos }) {
  const [text, setText] = useState("");

  function addTodo() {
    if (!text) return;

    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date()
      }
    ]);

    setText("");
  }

  function toggleTodo(id) {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div>
      <h2>To-Dos</h2>

      <input
        placeholder="New task..."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
              onClick={() => toggleTodo(todo.id)}
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
