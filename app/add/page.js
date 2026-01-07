"use client";

export default function AddNote() {
  const addNote = async e => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;

    await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });

    e.target.reset();
    alert("Note added successfully");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Note</h1>

      <form onSubmit={addNote}>
        <input
          name="title"
          placeholder="Title"
          className="border p-2 w-full mb-3"
          required
        />

        <textarea
          name="content"
          placeholder="Write your note..."
          className="border p-2 w-full mb-3"
          required
        ></textarea>

        <button className="bg-black text-white px-4 py-2 rounded">
          Save Note
        </button>
      </form>
    </div>
  );
}