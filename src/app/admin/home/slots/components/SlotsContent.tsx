"use client";
import { observer } from "mobx-react-lite";

import { DefaultButton } from "@/components/buttons/default/DefaultButton";
import { ContainerContent } from "@/components/containers/content/ContainerContent";
import { SlotDTO } from "@/lib/models/AppointmentSlot";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { AuthCheck } from "@/app/admin/auth-check/AuthCheck";

export type SlotsContentProps = {
  slots: Record<string, SlotDTO[]>;
};

export const SlotsContent = observer((props: SlotsContentProps) => {
  const { slots } = props;
  const [slotsAll, setSlotsAll] = useState(slots);
  const router = useRouter();
  return (
    <AuthCheck>
      <ContainerContent>
        <div
          style={{
            marginBottom: "8px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link href="/admin/home"> На главную (администрирование)</Link>

          <DefaultButton
            onClick={() => {
              router.push("/admin/home/slots/create");
            }}
          >
            Добавить время
          </DefaultButton>
        </div>

        <div>
          {Array.from(Object.keys(slotsAll)).map((date, index) => {
            const array = slotsAll[date];

            if (!array) {
              return;
            }

            // console.log({ date });
            return (
              <div key={index}>
                <b>{date}</b>

                {Array.from(array).map((slot) => {
                  return (
                    <li
                      key={slot._id}
                      style={{
                        listStyleType: "none",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {slot.startTime} - {slot.endTime} (
                      {slot.isBooked ? "Забронировано" : "Свободно"})
                      <div>
                        {slot.isBooked && (
                          <DefaultButton
                            onClick={() => {
                              fetch(`/api/slots/${slot._id}/edit/false`, {
                                method: "PUT",
                              }).then(async () => {
                                const res = await fetch(
                                  `${process.env.NEXT_PUBLIC_API_URL}/api/slots`
                                );
                                const slots: Record<string, SlotDTO[]> =
                                  await res.json();

                                setSlotsAll(slots);
                              });
                            }}
                            style={{
                              padding: "5px",
                              fontSize: "14px",
                              marginRight: "8px",
                            }}
                          >
                            открыть для записи
                          </DefaultButton>
                        )}

                        <DefaultButton
                          onClick={() => {
                            fetch(`/api/slots/${slot._id}/delete`, {
                              method: "DELETE",
                            }).then(async () => {
                              const res = await fetch(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/slots`
                              );
                              const slots: Record<string, SlotDTO[]> =
                                await res.json();

                              setSlotsAll(slots);
                            });
                          }}
                          style={{
                            padding: "5px",
                            fontSize: "14px",
                            background: "red",
                          }}
                        >
                          удалить
                        </DefaultButton>
                      </div>
                    </li>
                  );
                })}
                <br />
              </div>
            );
          })}
        </div>
      </ContainerContent>
    </AuthCheck>
  );
});
