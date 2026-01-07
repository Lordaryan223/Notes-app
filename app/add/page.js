"use client";
import { useRouter } from "next/navigation";

export default function AddNote() {
  const router = useRouter();

  const addNote = async e => {
    e.preventDefault();

    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: e.target.title.value,
        content: e.target.content.value,
      }),
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
      <form
        onSubmit={addNote}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Add Note</h1>

        <input
          name="title"
          placeholder="Title"
          className="border p-2 w-full mb-3"
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          className="border p-2 w-full mb-3 h-32"
          required
        ></textarea>

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}