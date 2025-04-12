import mongoose, { Schema, model, models } from "mongoose";

export interface IAppointmentSlot {
  date: Date;
  startTime: string; // Например, "09:00"
  endTime: string; // Например, "10:00"
  isBooked: boolean;
}

export type SlotDTO = IAppointmentSlot & {
  _id: string | number;
};

const AppointmentSlotSchema = new Schema<IAppointmentSlot>({
  date: {
    type: Date,
    required: [true, "Please provide a date."],
  },
  startTime: {
    type: String,
    required: [true, "Please provide a start time."],
  },
  endTime: {
    type: String,
    required: [true, "Please provide an end time."],
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const AppointmentSlot =
  models.AppointmentSlot ||
  model<IAppointmentSlot>("AppointmentSlot", AppointmentSlotSchema);

export default AppointmentSlot;
