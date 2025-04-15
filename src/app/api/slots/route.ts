import { NextResponse } from "next/server";

import AppointmentSlot, { SlotDTO } from "@/lib/models/AppointmentSlot";
import dbConnect from "@/lib/mongodb";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const newSlot = await AppointmentSlot.create(body);

    return NextResponse.json({ success: true, slot: newSlot }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    let query = {};
    if (date) {
      query = { date: new Date(date) };
    }
    const slots = await AppointmentSlot.find(query).sort({ date: -1 });

    const dates = new Map<string, SlotDTO[]>();

    slots.forEach((slot) => {
      const key = new Date(slot.date).toLocaleDateString("ru-RU");

      const times = dates.get(key) || [];

      dates.set(new Date(slot.date).toLocaleDateString("ru-RU"), [slot, ...times]);
    });

    // Сортируем каждый массив временных слотов по startTime
    dates.forEach((times, date) => {
      dates.set(
        date,
        times.sort((a, b) => {
          // Преобразуем время в минуты для сравнения (например, "9:00" -> 540)
          const timeToMinutes = (timeStr: string) => {
            const [hours, minutes] = timeStr.split(":").map(Number);
            return hours * 60 + minutes;
          };

          return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
        })
      );
    });

    // Сортируем сами даты (от новых к старым)
    const sortedEntries = Array.from(dates.entries()).sort(
      ([dateA], [dateB]) => {
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      }
    );

    // console.log({ slots, dates });

    return NextResponse.json(Object.fromEntries(sortedEntries));
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
