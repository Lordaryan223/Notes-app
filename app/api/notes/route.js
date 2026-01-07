export const runtime = "nodejs";

import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

// GET all notes
export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

// POST add note
export async function POST(req) {
  const { title, content } = await req.json();
  await connectDB();
  const note = await Note.create({ title, content });
  return NextResponse.json(note);
}

// PUT edit note
export async function PUT(req) {
  const { id, title, content } = await req.json();
  await connectDB();
  const updated = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
  return NextResponse.json(updated);
}

// DELETE note
export async function DELETE(req) {
  const { id } = await req.json();
  await connectDB();
  await Note.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}