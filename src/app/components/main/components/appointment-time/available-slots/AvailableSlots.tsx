"use client";

import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";

import { SlotDTO } from "@/lib/models/AppointmentSlot";
import { Colors } from "@/types/colors";
import { RequestDTO } from "@/types/request";
import styled from "@emotion/styled";

interface AvailableSlotsProps {
  date: string;
}

const SlotsContainer = styled.ul`
  display: flex;
  gap: 5;
  cursor: pointer;
`;

const SlotItem = styled.li`
  padding: 5px;
  border: 1px solid ${Colors.Coffee};
  border-radius: 3px;

  &.selected {
    background-color: ${Colors.Coffee};
    color: ${Colors.Eggshell};
  }
`;

export const AvailableSlots: React.FC<AvailableSlotsProps> = ({ date }) => {
  const [slots, setSlots] = useState<SlotDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string | number>("");
  const { setFieldValue } = useFormikContext<RequestDTO>();

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/slots/all?date=${date}`);
        if (!response.ok) {
          throw new Error("Failed to fetch slots");
        }
        const data = await response.json();
        setSlots(data.slots);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [date]);

  // const handleBookSlot = async (slotId: string) => {
  //   try {
  //     const response = await fetch(`/api/slots/${slotId}/book`, {
  //       method: "PUT",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to book slot");
  //     }
  //     onSlotBooked(); // Notify to refresh the slots list
  //   } catch (error: any) {
  //     setError(error.message);
  //   }
  // };

  const onClickSlot = (id: string | number) => {
    setSelectedSlot(id);
    setFieldValue("slotIdSelected", String(id));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const selectDate = new Date(date).toLocaleDateString();

  return (
    <div>
      {slots.length === 0 ? (
        <p style={{ margin: "8px 0" }}>Нет свободного времени на эту дату.</p>
      ) : (
        <React.Fragment>
          <h3 style={{ margin: "8px 0" }}>Свободное время {selectDate}:</h3>
          <SlotsContainer>
            {slots.map((slot) => (
              <SlotItem
                key={slot._id}
                onClick={() => onClickSlot(slot._id)}
                className={
                  String(slot._id) === String(selectedSlot) ? "selected" : ""
                }
              >
                {slot.startTime} - {slot.endTime}
              </SlotItem>
            ))}
          </SlotsContainer>
        </React.Fragment>
      )}
    </div>
  );
};
