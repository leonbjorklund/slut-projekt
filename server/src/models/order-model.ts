import { InferSchemaType, model, Schema, SchemaTypes } from "mongoose";

const addressSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, default: false },
  zipCode: { type: Number, default: false },
  city: { type: String, default: false },
  phoneNumber: { type: Number, default: false },
});

const orderItemSchema = new Schema({
  //   _id: {  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  height: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema({
  // userid?
  userId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  orderItems: { type: [orderItemSchema], required: true },
  deliveryAddress: { type: addressSchema, required: true },
  isShipped: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

export type Order = InferSchemaType<typeof orderSchema>;

export const OrderModel = model<Order>("Order", orderSchema);
