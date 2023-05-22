import { Schema } from "mongoose";

export const addressSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, default: false },
  zipCode: { type: String, default: false },
  city: { type: String, default: false },
  phoneumber: { type: Number, default: false },
});

// export type Adress = InferSchemaType<typeof addressSchema>;
