import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model('User', userSchema);
