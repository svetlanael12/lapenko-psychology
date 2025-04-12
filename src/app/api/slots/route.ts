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
    const slots = await AppointmentSlot.find(query);

    const dates = new Map<string, SlotDTO[]>();

    slots.forEach((slot) => {
      const key = new Date(slot.date).toLocaleDateString();

      const times = dates.get(key) || [];

      dates.set(new Date(slot.date).toLocaleDateString(), [slot, ...times]);
    });

    // console.log({ slots, dates });

    return NextResponse.json(Object.fromEntries(dates));
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
