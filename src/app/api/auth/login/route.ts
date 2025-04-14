import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    // Подключение к БД с обработкой ошибок
    await dbConnect().catch(err => {
      console.error("DB connection error:", err);
      throw new Error("Database connection failed");
    });

    // Проверка тела запроса
    if (!request.body) {
      return NextResponse.json(
        { message: "Request body is required" },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || !body.name || !body.password) {
      return NextResponse.json(
        { message: "Name and password are required" },
        { status: 400 }
      );
    }

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
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400, // 1 день в секундах
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}