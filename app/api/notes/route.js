import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

// GET all notes
export async function GET() {
    try {
      await connectDB();
      const notes = await Note.find();
      return NextResponse.json(notes);
    } catch (error) {
      console.error("MONGO ERROR:", error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }

// POST create note
export async function POST(req) {
  const { title, content } = await req.json();
  await connectDB();
  const note = await Note.create({ title, content });
  return NextResponse.json(note);
}

// DELETE note
export async function DELETE(req) {
  const { id } = await req.json();
  await connectDB();
  await Note.findByIdAndDelete(id);
  return NextResponse.json({ message: "Note deleted" });
}

