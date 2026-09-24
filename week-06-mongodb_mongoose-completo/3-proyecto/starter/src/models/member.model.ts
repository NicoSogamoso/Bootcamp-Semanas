import { Schema, model, Document, Types } from 'mongoose';

export type MembershipType = 'regular' | 'vip' | 'honorario';

export interface IMember extends Document {
  fullName: string;
  membershipType: MembershipType;
  monthlyFee: number;
  active: boolean;
  joinedAt: Date;
  plan: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const memberSchema = new Schema<IMember>(
  {
    fullName: { type: String, required: true, trim: true },
    membershipType: {
      type: String,
      enum: ['regular', 'vip', 'honorario'],
      required: true,
      default: 'regular',
    },
    monthlyFee: { type: Number, required: true, min: 0 },
    active: { type: Boolean, default: true },
    joinedAt: { type: Date, required: true },
    plan: {
      type: Schema.Types.ObjectId,
      ref: 'Plan',
      required: true,
    },
  },
  { timestamps: true }
);

export const Member = model<IMember>('Member', memberSchema);
