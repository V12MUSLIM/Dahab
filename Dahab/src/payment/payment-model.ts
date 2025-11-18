import mongoose, { Schema, Document } from "mongoose";

export interface IPayment {
    userId: string;
    amount: number;
    currency: string;
    status: "pending" | "succeeded" | "failed";
    method: string;
    transactionId: string;
    createdAt: Date;
    updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
    {
        userId: { type: String, ref: "User", required: true },
        amount: { type: Number, required: true },
        currency: { type: String, default: "usd" },
        status: {
            type: String,
            enum: ["pending", "succeeded", "failed"],
            default: "pending",
        },
        method: { type: String, default: "stripe" },
        transactionId: { type: String, required: true },
    },
    { timestamps: true }
);

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);