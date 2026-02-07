import { useEffect, useState } from "react";
import Notes from "./components/Notes/Notes";
import Todos from "./components/Todos/Todos";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./services/firebase";
import Auth from "./components/Auth/Auth";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";

function App() {
  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);

  // 🔐 Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // 📝 Notes listener
  useEffect(() => {
    if (!user) return;  

    const unsub = onSnapshot(
      collection(db, "users", user.uid, "notes"),
      snapshot => {
        setNotes(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        );
      }
    );

    return () => unsub();
  }, [user]);

  // ✅ Todos listener
  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(
      collection(db, "users", user.uid, "todos"),
      snapshot => {
        setTodos(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        );
      }
    );

    return () => unsub();
  }, [user]);

  // ➕ Add note
  async function addNote(note) {
    if (!user) return;

    await addDoc(
      collection(db, "users", user.uid, "notes"),
      note
    );
  }

  // ❌ Delete note
  async function deleteNote(id) {
    if (!user) return;

    await deleteDoc(
      doc(db, "users", user.uid, "notes", id)
    );
  }

  // ➕ Add todo
  async function addTodo(text) {
    if (!user) return;

    await addDoc(
      collection(db, "users", user.uid, "todos"),
      {
        text,
        completed: false,
        createdAt: new Date()
      }
    );
  }

  // 🔁 Toggle todo
  async function toggleTodo(id, completed) {
    if (!user) return;

    await updateDoc(
      doc(db, "users", user.uid, "todos", id),
      { completed: !completed }
    );
  }

  // ❌ Delete todo
  async function deleteTodo(id) {
    if (!user) return;

    await deleteDoc(
      doc(db, "users", user.uid, "todos", id)
    );
  }

  

  return (
  <div>
    <h1>Tidy List</h1>

    <Auth user={user} />

    {user && (
      <>
        <Notes
          notes={notes}
          addNote={addNote}
          deleteNote={deleteNote}
        />

        <Todos
          todos={todos}
          addTodo={addTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </>
    )}
  </div>
);
}

export default App;
