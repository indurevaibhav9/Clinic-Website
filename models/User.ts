import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "ADMIN" | "NORMAL_USER";
  phone_no: string;
  emailVerified: boolean;
  verifyOtp?: string;
  verifyOtpExpiry?: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "NORMAL_USER"],
    default: "NORMAL_USER",
  },
  phone_no: { type: String, required: true},
  emailVerified: { type: Boolean, default: false },
  verifyOtp: { type: String },
  verifyOtpExpiry: { type: Date },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
