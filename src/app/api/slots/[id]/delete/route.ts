import { NextRequest, NextResponse } from "next/server";

import AppointmentSlot from "@/lib/models/AppointmentSlot";
import dbConnect from "@/lib/mongodb";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await params; // Directly destructure the id from params
    const slot = await AppointmentSlot.findByIdAndDelete(id);

    if (!slot) {
      return NextResponse.json(
        { success: false, error: "Slot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
