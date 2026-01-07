
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
  
    if (!res.ok) {
      console.error("API Error");
      return;
    }
  
    const data = await res.json();
    setNotes(data);
  };

  const deleteNote = async id => {
    await fetch("/api/notes", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return  (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notes App</h1>
  
        <Link
          href="/add"
          className="text-blue-600 underline font-medium"
        >
          ➕ Add New Note
        </Link>
      </div>
  
      {notes.length === 0 && (
        <p className="text-gray-500">No notes yet.</p>
      )}
  
      {notes.map(note => (
        <div
          key={note._id}
          className="border rounded p-4 mb-4 shadow-sm"
        >
          <h2 className="font-semibold text-xl">{note.title}</h2>
          <p className="mt-2">{note.content}</p>
  
          <button
            onClick={() => deleteNote(note._id)}
            className="mt-3 text-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}