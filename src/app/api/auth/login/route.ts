import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();

  const { name, password } = body;
  const user = await User.findOne({ name });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
    expiresIn: "1Week",
  });

  const response = NextResponse.json({ message: "Logged in successfully" });
  response.headers.append(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 360000, // 1 hour
      path: "/",
    })
  );

  return response;
}
