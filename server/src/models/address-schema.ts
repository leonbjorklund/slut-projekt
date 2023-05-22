import { Schema } from "mongoose";

export const addressSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, default: false },
  zipCode: { type: Number, default: false },
  city: { type: String, default: false },
  phoneNumber: { type: Number, default: false },
});
