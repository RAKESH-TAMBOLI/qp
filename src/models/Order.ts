import mongoose, { Document, Schema, Types } from "mongoose";

// Define the interface for OrderItem fields
export interface IOrderItem {
  groceryItemId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

// Define the interface for Order fields
export interface IOrder {
  userId: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: "Pending" | "Completed" | "Cancelled";
}

// Extend the IOrder interface to include Mongoose Document properties
export interface IOrderModel extends IOrder, Document {}

// Create the Order Schema
const OrderSchema: Schema = new Schema<IOrderModel>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        groceryItemId: { type: mongoose.Schema.Types.ObjectId, ref: "GroceryItem", required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" },
  },
  { timestamps: true }
);

// Export the Order model
export default mongoose.model<IOrderModel>("Order", OrderSchema);
