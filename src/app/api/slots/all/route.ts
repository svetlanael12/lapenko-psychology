import { NextResponse } from "next/server";

// Находит все не забронированные слоты (isBooked: false) для указанной даты.
import AppointmentSlot from "@/lib/models/AppointmentSlot";
import dbConnect from "@/lib/mongodb";

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

    // Сортируем слоты:
    // 1. Сначала по дате (новые сначала)
    // 2. Затем по времени начала (раньше сначала)
    const sortedSlots = slots.sort((a, b) => {
      // Сравнение дат
      const dateCompare =
        new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateCompare !== 0) return dateCompare;

      // Если даты одинаковые, сравниваем startTime
      const timeToMinutes = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
      };

      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });

    return NextResponse.json({ success: true, slots: sortedSlots });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
