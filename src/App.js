import { useState } from "react";
import Notes from "./components/Notes/Notes";
import Todos from "./components/Todos/Todos";

function App() {
  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);

  function addNote(note) {
    setNotes(prev => [note, ...prev]);
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(n => n.id !== id));
  }

  return (
    <div>
      <h1>Tidy List</h1>

      <Notes
        notes={notes}
        addNote={addNote}
        deleteNote={deleteNote}
      />

      <Todos
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
}

export default App;
