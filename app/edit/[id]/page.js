"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditNote() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/api/notes")
      .then(res => res.json())
      .then(data => {
        const note = data.find(n => n._id === id);
        if (note) {
          setTitle(note.title);
          setContent(note.content);
        }
      });
  }, [id]);

  const updateNote = async e => {
    e.preventDefault();

    await fetch("/api/notes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, content }),
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
      <form
        onSubmit={updateNote}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Edit Note</h1>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="border p-2 w-full mb-3 h-32"
          required
        ></textarea>

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}