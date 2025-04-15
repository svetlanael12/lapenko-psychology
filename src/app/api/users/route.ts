import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import User from "@/lib/models/User";

import dbConnect from "../../../lib/mongodb";

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Количество раундов хеширования
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Импортируйте вашу модель

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  // убрала, чтобы не было никаких уязвимостей
  // await dbConnect();
  // const body = await request.json();
  // const hashedPassword = await hashPassword(body.password);
  // const user = new User({
  //   name: body.name,
  //   password: hashedPassword,
  // });
  // await user.save();
  // return NextResponse.json(user, { status: 201 });
}
