import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState("dark");
  const [editId, setEditId] = useState(null);

  // Load saved notes once so the app keeps the collection after a refresh.
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("my-notes");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist every note change back to localStorage.
  useEffect(() => {
    localStorage.setItem("my-notes", JSON.stringify(notes));
  }, [notes]);

  // The submit button handles both create and update flows.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editId ? { ...note, title, content } : note,
        ),
      );
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleDateString(),
      };
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
  };

  // Load the selected note into the form and move the user back to the top.
  const handleEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete a note and exit edit mode if that note is currently selected.
  const deleteNote = (id) => {
    if (editId === id) setEditId(null);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-zinc-50"}`}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="lg:flex">
        <NoteForm
          theme={theme}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          handleSubmit={handleSubmit}
          editId={editId}
        />
        <NoteList
          notes={notes}
          theme={theme}
          onDelete={deleteNote}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default App;
