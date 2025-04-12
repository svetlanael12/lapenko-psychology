import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  //@ts-ignore
  const token = request.cookies.get("token")?.value;
  // console.log(request.cookies);
  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    // Проверяем токен
    jwt.verify(token, process.env.JWT_SECRET || "");
    return NextResponse.json({ isAuthenticated: true });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
