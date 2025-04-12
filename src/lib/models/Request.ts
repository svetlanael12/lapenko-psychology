import mongoose from "mongoose";

export type RequestType = {
  phone: string;
  firstName: string;
  slotIdSelected?: string;
  comment?: string;
  createdAt: Date;
  _id: string;
};

const RequestSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  firstName: { type: String, required: true },
  slotIdSelected: { type: String },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Request ||
  mongoose.model("Request", RequestSchema);
