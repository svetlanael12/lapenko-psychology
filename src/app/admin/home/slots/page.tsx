import React from "react";

import { SlotDTO } from "@/lib/models/AppointmentSlot";

import { SlotsContent } from "./components/SlotsContent";
export const dynamic = "force-dynamic"; // Отключает статическую генерацию
/**
 * Страница с отображением всех слотов времени в админке
 */
const SlotsAll = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/slots`); // Убедитесь, что URL правильный
  const slots: Record<string, SlotDTO[]> = await response.json(); // Преобразуем ответ в JSON
  // console.log({ slots });
  if (!slots) {
    return <React.Fragment />;
  }

  // const dates = new Map<string, SlotDTO[]>();

  // slots.forEach((slot) => {
  //   const key = new Date(slot.date).toLocaleDateString();

  //   const times = dates.get(key) || [];

  //   dates.set(new Date(slot.date).toLocaleDateString(), [slot, ...times]);
  // });

  return <SlotsContent slots={slots} />;
};

export default SlotsAll;
