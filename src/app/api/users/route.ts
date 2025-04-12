import { NextResponse } from "next/server";

import User from "@/lib/models/User";

import dbConnect from "../../../lib/mongodb";

// Импортируйте вашу модель

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const user = new User(body);
  await user.save();
  return NextResponse.json(user, { status: 201 });
}
