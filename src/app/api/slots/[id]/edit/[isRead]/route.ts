import AppointmentSlot from "@/lib/models/AppointmentSlot";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; isRead: boolean }> }
) {
  await dbConnect();

  try {
    const { id, isRead } = await params;
    const slot = await AppointmentSlot.findByIdAndUpdate(
      id,
      { isBooked: isRead },
      { new: true }
    );

    if (!slot) {
      return NextResponse.json(
        { success: false, error: "Slot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, slot });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
