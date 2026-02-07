import { useState } from "react";

function Notes({ notes, addNote, deleteNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleAdd() {
    if (!title || !content) return;

    addNote({
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    setTitle("");
    setContent("");
  }

  return (
    <div>
      <h2>Notes</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button onClick={handleAdd}>Add Note</button>

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
