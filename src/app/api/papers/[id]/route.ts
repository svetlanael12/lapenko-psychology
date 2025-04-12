import { NextRequest, NextResponse } from "next/server";

import Paper from "@/lib/models/Paper";
import dbConnect from "@/lib/mongodb";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params; // Получаем ID из параметров
  const paper = await Paper.findById(id); // Находим документ по ID

  if (!paper) {
    return NextResponse.json({ message: "Paper not found" }, { status: 404 });
  }

  return NextResponse.json(paper);
}

// Обработчик PUT запроса (обновление документа)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params; // Получаем ID из параметров
  const body = await request.json(); // Получаем тело запроса

  // Обновляем документ
  const updatedPaper = await Paper.findByIdAndUpdate(id, body, { new: true });

  if (!updatedPaper) {
    return NextResponse.json({ message: "Paper not found" }, { status: 404 });
  }

  return NextResponse.json(updatedPaper);
}

// Обработчик DELETE запроса (удаление документа)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params; // Получаем ID из параметров

  // Удаляем документ
  const deletedPaper = await Paper.findByIdAndDelete(id);

  if (!deletedPaper) {
    return NextResponse.json({ message: "Paper not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Paper deleted successfully" });
}
