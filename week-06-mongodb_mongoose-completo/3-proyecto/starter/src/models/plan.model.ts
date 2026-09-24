import { Schema, model, Document } from 'mongoose';

export interface IPlan extends Document {
  name: string;
  description?: string;
  monthlyPrice: number;
  benefits: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const planSchema = new Schema<IPlan>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    monthlyPrice: { type: Number, required: true, min: 0 },
    benefits: { type: [String], default: [] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Plan = model<IPlan>('Plan', planSchema);
