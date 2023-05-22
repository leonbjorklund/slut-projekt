import bcrypt from "bcrypt";
import { InferSchemaType, Schema, model } from "mongoose";

const saltRounds = 10;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("User", userSchema);
