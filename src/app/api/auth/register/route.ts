import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  
  const { name, password } = body;

  // Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = new User({ name, password: hashedPassword });
  await user.save();

  return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}