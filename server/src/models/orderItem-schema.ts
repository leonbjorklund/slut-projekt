import { Schema } from "mongoose";

export const orderItemSchema = new Schema({
  //   _id: {  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  email: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  //   category: {},
  quantity: { type: Number, required: true },
});

// export type OrderItem = InferSchemaType<typeof orderItemSchema>;
// export const OrderItemModel = model("Orderitem", orderItemSchema);
