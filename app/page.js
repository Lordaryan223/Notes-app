"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
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

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Notes App
          </h1>

          <Link
            href="/add"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            ➕ Add Note
          </Link>
        </div>

        {notes.length === 0 && <p>No notes yet.</p>}

        {notes.map(note => (
          <div
            key={note._id}
            className="bg-white rounded-xl p-5 mb-4 shadow hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p className="mt-2">{note.content}</p>

            <div className="flex gap-4 mt-4">
              <Link
                href={`/edit/${note._id}`}
                className="text-blue-600 text-sm"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteNote(note._id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}