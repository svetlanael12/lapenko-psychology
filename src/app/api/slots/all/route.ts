// Находит все не забронированные слоты (isBooked: false) для указанной даты.
import AppointmentSlot from "@/lib/models/AppointmentSlot";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    if (!date) {
      return NextResponse.json(
        { success: false, error: "Date is required" },
        { status: 400 }
      );
    }

    const slots = await AppointmentSlot.find({
      date: new Date(date),
      isBooked: false,
    });

    return NextResponse.json({ success: true, slots });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
