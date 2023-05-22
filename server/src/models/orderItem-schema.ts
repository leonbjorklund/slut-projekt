import { Schema } from "mongoose";

export const orderItemSchema = new Schema({
  //   _id: {  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  height: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
});
