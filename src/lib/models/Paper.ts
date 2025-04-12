import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPaper extends Document {
  html: string;
  title: string;
  description: string;
}

export interface ArticleDTO extends Document {
  id: string | number;
  title: string;
  description: string;
}

const PaperSchema: Schema = new Schema({
  html: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Paper: Model<IPaper> =
  mongoose.models.Paper || mongoose.model<IPaper>("Paper", PaperSchema);

export default Paper;
