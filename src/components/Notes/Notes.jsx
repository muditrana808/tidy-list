import { useState } from "react";
import VoiceInput from "../Voice/VoiceInput";

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

      {/* Voice input */}
      <VoiceInput
        onResult={(spokenText) =>
          setContent(prev => prev + " " + spokenText)
        }
      />

      {/* Title input */}
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      {/* Content input */}
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button onClick={handleAdd}>Add Note</button>

      {/* Notes list */}
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
