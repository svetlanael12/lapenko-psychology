import { NextResponse } from "next/server";

import AppointmentSlot from "@/lib/models/AppointmentSlot";
import Request from "@/lib/models/Request";
import dbConnect from "@/lib/mongodb";
import { sendConfirmationEmail } from "@/lib/utils/sendEmail";

export async function GET() {
  await dbConnect();
  const requests = await Request.find({});
  const reverseRequests = [...requests].reverse();
  return NextResponse.json(reverseRequests);
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { phone, firstName, slotIdSelected } = await request.json();

    const slot =
      slotIdSelected && (await AppointmentSlot.findById(slotIdSelected));

    const date = slot
      ? `${new Date(slot.date).toLocaleDateString("ru-RU")} (${slot.startTime} - ${
          slot.endTime
        })`
      : "Не указано";

    // console.log({ date });
    const comment = `Желаемая дата и время: ${date}` as string;

    // 1. Создаем заявку
    const newRequest = await Request.create({
      phone,
      firstName,
      slotIdSelected,
      comment,
    });

    // 2. Если есть slotId, резервируем время
    if (slot) {
      await AppointmentSlot.findByIdAndUpdate(
        slotIdSelected,
        { isBooked: true },
        { new: true }
      );
    }

    // 3. Отправляем письмо с подтверждением
    await sendConfirmationEmail({
      firstName,
      phone,
      slot,
    });

    return NextResponse.json(
      { success: true, data: newRequest },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
