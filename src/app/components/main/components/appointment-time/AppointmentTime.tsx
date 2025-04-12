"use client";
import { observer } from "mobx-react-lite";
import { useState } from "react";

import { DateInput } from "@/components/inputs/date/DateInput";

import { AvailableSlots } from "./available-slots/AvailableSlots";

export const AppointmentTime = observer(() => {
  const [selectedDate, setSelectedDate] = useState("");
  // const [slotsRefetch, setSlotsRefetch] = useState(false);

  return (
    <div>
      {/* <h1>Book an Appointment</h1> */}
      <div>
        {/* <label htmlFor="date">Select a Date:</label> */}
        <DateInput
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          fullWidth
        />
      </div>
      {selectedDate && <AvailableSlots date={selectedDate} />}
    </div>
  );
});
